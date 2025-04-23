import { Router } from "express";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import UserModel from "../models/UsersModel.js";
import PetsModel from "../models/PetsModel.js";
const mocksRouter = Router();
const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const generatePets = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    pet_name: faker.animal.petName(),
    age: faker.date.birthdate(),
    type: faker.animal.type(),
  };
};
const generateUser = (numberOfPets) => {
  let pets = [];
  for (let i = 0; i < numberOfPets; i++) {
    pets.push(generatePets());
  }
  const password = "coder123";
  return {
    _id: faker.database.mongodbObjectId(),
    first_name: faker.person.firstName(),
    email: faker.internet.email(),
    password: createHash(password),
    role: faker.helpers.arrayElement(["user", "admin"]),
    pets,
  };
};
mocksRouter.get("/mockingusers", async (req, res) => {
  let users = [];
  try {
    users = [];
    for (let i = 0; i < 50; i++) {
      users.push(generateUser(0));
    }
    res.send({ status: "success", payload: users });
  } catch (error) {
    console.log(error.message);
  }
});
mocksRouter.post("/generateData", async (req, res) => {
  let users = [];
  const { userNumber, petsNumber } = req.body;
  try {
    users = [];
    for (let i = 0; i < userNumber; i++) {
      users.push(generateUser(petsNumber));
      await UserModel.create(users[i]);
    }
    for (let i = 0; i < users.length; i++) {
      await PetsModel.insertMany(users[i].pets);
    }
    res.send({
      status: "success",
      payload: `Se insertaron ${userNumber} usuarios y ${petsNumber} mascotas con éxito`,
    });
  } catch (error) {
    console.log(error.message);
  }
});
mocksRouter.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();

    res.send({ status: "success", payload: users });
  } catch (error) {
    console.log(error.message);
  }
});
mocksRouter.get("/pets", async (req, res) => {
  try {
    const pets = await PetsModel.find();
    res.send({ status: "success", payload: pets });
  } catch (error) {
    console.log(error.message);
  }
});
export default mocksRouter;
