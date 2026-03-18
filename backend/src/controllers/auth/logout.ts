import type { Request, Response } from "express";

export async function logout(_req: Request, res: Response) {
  res.clearCookie("session_token");
  res.status(200).json({ message: "Logged out" });
}
