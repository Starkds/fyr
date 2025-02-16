const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["User", "Tenant"],
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrpyt.genSalt(10);
    const hashpassword = await bcrpyt.hash(user.password, salt);

    user.password = hashpassword;

    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.ComparePassword = async function (userPassword) {
  try {
    const isMatchPassword = await bcrpyt.compare(userPassword, this.password);

    return isMatchPassword;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
