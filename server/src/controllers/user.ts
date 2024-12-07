import { Request, Response } from "express";

export async function getProfile(req: Request, res: Response): Promise<void> {
  const user = req.user;

  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { id, email } = user;
  res.status(200).json({ id, email });
}

export async function updateProfile(
  req: Request,
  res: Response,
): Promise<void> {
  //TODO
}
