import type { Request, Response } from "express";

export async function getSession(req: Request, res: Response) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({
    user: {
      id: user._id,
      username: user.username,
      timezone: user.timezone,
    },
  });
}
