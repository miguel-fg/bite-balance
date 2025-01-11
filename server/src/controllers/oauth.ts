import { Request, Response } from "express";
import prisma from "../services/prisma";
import { GitHub, Google } from "arctic";
import { generateState, generateCodeVerifier } from "arctic";
import { OAuth2RequestError, ArcticFetchError } from "arctic";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from "../config";
import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
} from "../services/session";

const github = new GitHub(
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  "http://localhost:3000/api/oauth/github/callback",
);

const google = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/oauth/google/callback",
);

export function redirectGitHub(req: Request, res: Response) {
  const isProd = process.env.NODE_ENV === "production";

  const state = generateState();

  const scopes = ["user:email"];
  const url = github.createAuthorizationURL(state, scopes);

  const cookieOptions = [
    `state=${state}`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Max-Age=${60 * 10}`,
    `Path=/`,
    isProd ? `Secure` : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookieOptions);

  res.redirect(url.href);
}

export async function validateGitHubAuthCode(req: Request, res: Response) {
  interface GitHubUserProfile {
    login: string;
    id: number;
    avatar_url: string;
    email?: string;
  }

  interface GitHubEmail {
    email: string;
    verified: boolean;
    primary: boolean;
    visibility: string | null;
  }

  const { code, state } = req.query;

  const savedState = req.cookies.state;

  if (!savedState || savedState !== state) {
    res.status(400).json({ message: "Invalid or missing state" });
    return;
  }

  try {
    const tokens = await github.validateAuthorizationCode(String(code));
    const accessToken = tokens.accessToken();

    const userResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userProfile = (await userResponse.json()) as GitHubUserProfile;

    if (!userProfile.email) {
      const emailResponse = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const emails = (await emailResponse.json()) as GitHubEmail[];
      userProfile.email = emails.find((email) => email.primary)?.email;
    }

    let user = await prisma.user.findUnique({
      where: { email: userProfile.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userProfile.email,
          username: userProfile.login,
          provider: "github",
          providerId: String(userProfile.id),
        },
      });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);

    setSessionTokenCookie(res, sessionToken, session.expiresAt);

    res.redirect("http://localhost:5173/dashboard");
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      res.status(400).json({ message: "Invalid authorization code" });
    } else if (error instanceof ArcticFetchError) {
      res.status(500).json({ message: "Error fetching data from GitHub" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
    res.redirect("http://localhost:5173");
  }
}

export function redirectGoogle(req: Request, res: Response) {
  const isProd = process.env.NODE_ENV === "production";

  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const scopes = ["email", "profile"];
  const url = google.createAuthorizationURL(state, codeVerifier, scopes);

  const stateCookie = [
    `state=${state}`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Max-Age=${60 * 10}`,
    `Path=/`,
    isProd ? `Secure` : "",
  ]
    .filter(Boolean)
    .join("; ");

  const codeVerifierCookie = [
    `codeVerifier=${codeVerifier}`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Max-Age=${60 * 10}`,
    `Path=/`,
    isProd ? `Secure` : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", [stateCookie, codeVerifierCookie]);

  res.redirect(url.href);
}

export async function validateGoogleAuthCode(req: Request, res: Response) {
  interface GoogleUserProfile {
    id: string;
    email: string;
    name: string;
    picture: string;
  }

  const { code, state } = req.query;

  const savedState = req.cookies.state;
  const codeVerifier = req.cookies.codeVerifier;

  console.log("Saved state: ", savedState);
  console.log("Code verifier: ", codeVerifier);

  if (!codeVerifier || !savedState) {
    res.status(400).json({ message: "No code verifier or state" });
    return;
  }

  if (state !== savedState) {
    res.status(400).json({ message: "Invalid state" });
    return;
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      String(code),
      codeVerifier,
    );
    const accessToken = tokens.accessToken();

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const userProfile = (await userResponse.json()) as GoogleUserProfile;

    let user = await prisma.user.findUnique({
      where: { email: userProfile.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userProfile.email,
          username: userProfile.name,
          provider: "google",
          providerId: userProfile.id,
        },
      });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);

    setSessionTokenCookie(res, sessionToken, session.expiresAt);

    res.redirect("http://localhost:5173/dashboard");
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      res.status(400).json({ message: "Invalid authorization code" });
    } else if (error instanceof ArcticFetchError) {
      res.status(500).json({ message: "Error fetching data from Google" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
    res.redirect("http://localhost:5173");
  }
}
