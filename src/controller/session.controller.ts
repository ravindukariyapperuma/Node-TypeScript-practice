import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, createAccessToken } from "../service/session.service";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }
  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = createAccessToken({
    user,
    session,
  });

  const refreshToken = sign(session, {
    expiresIn: config.get("refreshTokenTtl"),
  });
  // Create access token
  // Create refresh token
  // send refresh & access token back
}
