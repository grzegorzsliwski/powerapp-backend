import jwt from "jsonwebtoken";

export default async function generateToken(
  user,
  tokenType = "access",
  expiresIn = "1h"
) {
  const secret =
    tokenType === "refresh"
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET;

  if (!secret) {
    throw new Error(`Missing secret for ${tokenType} token`);
  }

  const payload = { id: user._id, email: user.email, type: tokenType };
  return jwt.sign(payload, secret, { expiresIn });
}
