import Fastify from "fastify";
import { connectToDB } from "./utils/database.js";
import userRouter from "./routes/auth/users.js";
import authenticateToken from "./middleware/authenticateToken.js";
import exerciseRouter from "./routes/exercise.js";
import filtersRouter from "./routes/filters.js";
import VariantModel from "./models/Variant.js";
import programRouter from "./routes/program/program.js";
import sessionRouter from "./routes/program/session/session.js";

const fastify = Fastify({ logger: true });

await connectToDB();

fastify.register(filtersRouter, { prefix: "/filters" });
fastify.register(userRouter, { prefix: "/users" });
fastify.register(exerciseRouter, { prefix: "/exercises" });
fastify.register(programRouter, { prefix: "/program" });
fastify.register(sessionRouter, { prefix: "/program/session" });

fastify.post("/create", async (request, reply) => {
  try {
    const { variantName, description, imageUrl } = request.body;
    const variant = new VariantModel({
      variantName,
      description,
      imageUrl,
    });
    await variant.save();
    reply.code(201).send(variant);
  } catch (error) {
    fastify.log.error(error);
    reply.code(500).send({ message: "Failed to create variant" });
  }
});

try {
  await fastify.listen({ port: 3000, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
