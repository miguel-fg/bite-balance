import { Request, Response } from "express";
import {
  generateSessionToken,
  createSession,
  validateSessionToken,
  invalidateSession,
} from "../services/session";

export async function login(req: Request, res: Response) {}

export async function logout(req: Request, res: Response) {}
