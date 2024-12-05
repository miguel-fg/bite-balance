import { Request, Response, NextFunction } from "express";
import { validateSessionToken } from "../services/session";

export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction,
) {}
