const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    issuename: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "InActive"],
    },
    type: {
      type: String,
      enum: ["Bug", "UI Development", "Error", "Code Burst"],
    },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issues", issueSchema);
