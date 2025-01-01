import ExerciseModel from "../../models/Exercises.js";

export default async function exerciseRoutes(fastify, opts) {
  fastify.get("/exercises", async (request, reply) => {
    try {
      const exercises = await ExerciseModel.find(
        {},
        "exerciseName imageUrl primaryMuscleGroup"
      ).populate("primaryMuscleGroup", "muscleGroupName");
      reply.code(200).send(exercises);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ message: "Failed to fetch exercises." });
    }
  });

  fastify.get("/exercises/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      const exercise = await ExerciseModel.findById(id)
        .populate("equipmentType", "equipmentName")
        .populate("primaryMuscleGroup", "muscleGroupName")
        .populate("secondaryMuscleGroups", "muscleGroupName");

      if (!exercise) {
        return reply.code(404).send({ message: "Exercise not found." });
      }

      reply.code(200).send(exercise);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ message: "Failed to fetch exercise details." });
    }
  });
}
