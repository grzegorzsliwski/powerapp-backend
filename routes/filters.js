import MuscleGroupModel from "../models/MuscleGroup.js";
import EquipmentModel from "../models/Equipment.js";
import AccessoryModel from "../models/Accessory.js";

export default async function filtersRouter(fastify, opts) {
  fastify.get(
    "/",
    // { preHandler: authenticateToken },
    async (request, reply) => {
      try {
        const muscleGroups = await MuscleGroupModel.find({});
        const equipment = await EquipmentModel.find({});
        const accessories = await AccessoryModel.find({});

        reply.code(200).send({
          muscleGroups: muscleGroups,
          equipment: equipment,
          accessories: accessories,
        });
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ message: "Failed to fetch filters." });
      }
    }
  );
}
