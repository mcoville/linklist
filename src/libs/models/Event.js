import { model, models, Schema } from "mongoose";

const EventScheme = new Schema(
  {
    type: String, // click or view
    page: String, // profile name
    uri: String, // link or page uri
  },
  { timestamps: true }
);

export const Event = models?.Event || model("Event", EventScheme);
