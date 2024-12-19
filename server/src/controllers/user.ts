import { Request, Response } from "express";

export async function getProfile(req: Request, res: Response): Promise<void> {
  const user = req.user;

  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { id, username, email, dateOfBirth, weight, height, gender } = user;
  res.status(200).json({
    user: {
      id,
      username,
      email,
      dateOfBirth,
      weight,
      height,
      gender,
    },
  });
}

export async function updateProfile(
  req: Request,
  res: Response,
): Promise<void> {
  //TODO
}
