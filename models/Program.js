import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const ProgramSchema = new Schema(
  {
    programName: {
      type: String,
      required: [true, "Program name is required"],
    },
    numberOfWeeks: {
      type: Number,
      required: [true, "Number of weeks is required"],
      min: [1, "Number of weeks must be at least 1"],
      max: [21, "Number of weeks cannot exceed 21"],
    },
  },
  { timestamps: true }
);

const ProgramModel = models.Program || model("Program", ProgramSchema);

export default ProgramModel;
