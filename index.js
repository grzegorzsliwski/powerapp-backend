import Fastify from "fastify";
import { connectToDB } from "./utils/database.js";
import userRouter from "./routes/auth/users.js";
import authenticateToken from "./middleware/authenticateToken.js";
import exerciseRouter from "./routes/exercise.js";
import fastifyCookie from "@fastify/cookie";

const fastify = Fastify({ logger: true });

await connectToDB();

fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET, // Used to sign cookies
  parseOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure only in production
    sameSite: "Strict",
    path: "/",
  },
});
fastify.register(userRouter, { prefix: "/users" });
fastify.register(exerciseRouter, { prefix: "/exercises" });

fastify.get("/", { preHandler: authenticateToken }, async (request, reply) => {
  const posts = [
    { email: "sliwskigrzegorz@gmail.com", title: "Post1" },
    { email: "grzegorzsliwski@gmail.com", title: "Post2" },
  ];
  reply.send(posts.filter((post) => post.email === request.user.email));
});

try {
  await fastify.listen({ port: 3000, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
