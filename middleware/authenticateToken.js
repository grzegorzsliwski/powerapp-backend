import jwt from "jsonwebtoken";

export default async function authenticateToken(request, reply) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return reply.code(401).send({ status: "FAILED", message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    request.user = user;
  } catch (err) {
    return reply.code(403).send({ status: "FAILED", message: "Forbidden" });
  }
}
