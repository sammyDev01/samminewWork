import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
  {
    queueNumber: {type: Number, required: true},
    userData: {type: mongoose.Schema.Types.ObjectId, ref: "user",required: true},
    doctorData: {type: mongoose.Schema.Types.ObjectId,ref: "doctor",required: true},
    status: {type: String, enum: ["waiting", "in-consultation", "completed",  "cancelled"],default: "waiting"},
    queueDate: {type: String, required: true},
    attendedAt: {type: Date, default: null},
    completedAt: { type: Date, default: null}}
);

const QueueModel = mongoose.models.queue || mongoose.model('queue', queueSchema)
export default QueueModel

// const Queue = mongoose.model("Queue", queueSchema);

// export default Queue;