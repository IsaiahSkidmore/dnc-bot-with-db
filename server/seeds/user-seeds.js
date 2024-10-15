import User from "../models/user.js";

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      {
        name: "Isaiah Skidmore",
        email: "skiddy@gmail.com",
        password: "password",
      },
      {
        name: "Kevin Parsons",
        email: "kpizzle@gmail.com",
        password: "password",
      },
    ],
    { individualHooks: true },
  );
};
