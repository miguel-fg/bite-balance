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
  validateSessionToken,
  invalidateSession,
} from "../services/session";

export async function register(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
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
        email,
        hashedPassword,
        salt,
      },
    });

    const sessionToken = generateSessionToken();

    const session = await createSession(sessionToken, newUser.id);

    res.status(201).json({
      message: "Registration successful",
      user: { id: newUser.id, email: newUser.email },
      session: { token: session.id, expires: session.expiresAt },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, email: user.email },
      session: { token: session.id, expires: session.expiresAt },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req: Request, res: Response) { }
