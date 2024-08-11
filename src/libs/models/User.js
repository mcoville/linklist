import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: Date,
  },
});

export const User = models?.User || model("User", UserSchema);
