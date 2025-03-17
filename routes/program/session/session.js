import SessionModel from "../../../models/Session.js";

export default async function sessionRouter(fastify) {
  // Get all programs
  fastify.get("/list", async (request, reply) => {
    try {
      const sessions = await SessionModel.find().sort({ createdAt: -1 });
      return sessions;
    } catch (error) {
      reply.code(500).send({ error: "Failed to fetch sessions" });
    }
  });
}
