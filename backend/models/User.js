const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

/*
UserSchema.pre("save", ...)
A Mongoose middleware that runs before saving a user to the database.

this.isModified("password")
Checks if the password field was changed (e.g., during registration or password update).
If not, it skips hashing.

bcrypt.hash(this.password, 10)
Hashes the password using 10 salt rounds to make it secure before saving.
*/

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/*candidatePassword: The plain password entered by the user during login.

this.password: The hashed password stored in the database.

bcrypt.compare(...): Checks if the plain password matches the hashed one.*/

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
