const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      Required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      Required: true,
      unique: true,
      trimmed: true,
      match: [/^([a-zA-Z0-9-_\.]+)@([\da-z\.-]+)\.([a-z\.]{2,}$)/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Friends",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;

 