// routes/program.routes.js
import ProgramModel from "../models/Program.js";

export default async function programRouter(fastify) {
  // Get all programs
  fastify.get("/list", async (request, reply) => {
    try {
      const programs = await ProgramModel.find().sort({ createdAt: -1 });
      return programs;
    } catch (error) {
      reply.code(500).send({ error: "Failed to fetch programs" });
    }
  });

  fastify.get("/:id", async (request, reply) => {
    try {
      const { id } = request?.params;
      const program = await ProgramModel.findById(id);

      if (!program) {
        return reply.code(404).send({ message: "Program not found." });
      }

      reply.code(200).send(program);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ message: "Failed to fetch program details." });
    }
  });

  // Create new program
  fastify.post("/create", async (request, reply) => {
    try {
      const program = new ProgramModel(request.body);
      await program.save();
      reply.code(201).send(program);
    } catch (error) {
      reply.code(400).send({ error: "Failed to create program" });
    }
  });

  // Update program
  fastify.put("/:id/update", async (request, reply) => {
    try {
      const program = await ProgramModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );
      if (!program) {
        return reply.code(404).send({ error: "Program not found" });
      }
      return program;
    } catch (error) {
      reply.code(400).send({ error: "Failed to update program" });
    }
  });

  // Delete program
  fastify.delete("/:id/delete", async (request, reply) => {
    try {
      const program = await ProgramModel.findByIdAndDelete(request.params.id);
      if (!program) {
        return reply.code(404).send({ error: "Program not found" });
      }
      return { message: "Program deleted successfully" };
    } catch (error) {
      reply.code(400).send({ error: "Failed to delete program" });
    }
  });

  // Duplicate program
  fastify.post("/:id/duplicate", async (request, reply) => {
    try {
      const program = await ProgramModel.findById(request.params.id);
      if (!program) {
        return reply.code(404).send({ error: "Program not found" });
      }

      const duplicatedProgram = new ProgramModel({
        programName: `${program.programName} (Copy)`,
        numberOfWeeks: program.numberOfWeeks,
      });
      await duplicatedProgram.save();
      reply.code(201).send(duplicatedProgram);
    } catch (error) {
      reply.code(400).send({ error: "Failed to duplicate program" });
    }
  });
}
