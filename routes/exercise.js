import MuscleGroupModel from "../models/MuscleGroup.js";
import EquipmentModel from "../models/Equipment.js";
import ExerciseModel from "../models/Exercises.js";
import authenticateToken from "../middleware/authenticateToken.js";

export default async function exerciseRouter(fastify, opts) {
  fastify.get(
    "/list",
    { preHandler: authenticateToken },
    async (request, reply) => {
      try {
        const exercises = await ExerciseModel.find({})
          .populate("primaryMuscleGroup", "muscleGroupName")
          .populate("secondaryMuscleGroups", "muscleGroupName")
          .populate("equipmentType", "equipmentName");

        reply.code(200).send(exercises);
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ message: "Failed to fetch exercises." });
      }
    }
  );

  fastify.get(
    "/:id",
    { preHandler: authenticateToken },
    async (request, reply) => {
      try {
        const { id } = request?.params;
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
    }
  );
}
