import { Request, Response } from "express";
import prisma from "../services/prisma";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";

import {
  generateSessionToken,
  createSession,
  invalidateSession,
  setSessionTokenCookie,
  deleteSessionTokenCookie,
} from "../services/session";

export async function register(req: Request, res: Response): Promise<void> {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(400)
      .json({ message: "Username, email, and password are required" });
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(400).json({ message: "Email is already in use" });
      return;
    }

    const rawSalt = crypto.getRandomValues(new Uint8Array(16));
    const salt = encodeBase32LowerCaseNoPadding(rawSalt);

    const saltedPassword = password + salt;

    const hashedPwdBytes = sha256(new TextEncoder().encode(saltedPassword));

    const hashedPassword = encodeHexLowerCase(hashedPwdBytes);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
        salt,
      },
    });

    const sessionToken = generateSessionToken();

    const session = await createSession(sessionToken, newUser.id);
    setSessionTokenCookie(res, sessionToken, session.expiresAt);

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        dateOfBirth: newUser.dateOfBirth,
        weight: newUser.weight,
        height: newUser.height,
        gender: newUser.gender,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ message: "Email and password are required" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const saltedPassword = password + user.salt;
    const hashedPwdBytes = sha256(new TextEncoder().encode(saltedPassword));
    const hashedPassword = encodeHexLowerCase(hashedPwdBytes);

    if (hashedPassword !== user.hashedPassword) {
      res.status(401).json({ message: "Password is incorrect" });
      return;
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    setSessionTokenCookie(res, sessionToken, session.expiresAt);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        weight: user.weight,
        height: user.height,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function logout(req: Request, res: Response) {
  const sessionToken = req.cookies.session;

  if (!sessionToken) {
    res.status(400).json({ message: "No session token found" });
    return;
  }

  try {
    await invalidateSession(sessionToken);
    deleteSessionTokenCookie(res);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
}
