import { Router } from "express";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import UserModel from "../models/UsersModel.js";
import PetsModel from "../models/PetsModel.js";
const mocksRouter = Router();
let users = [];
let totalPets = [];
const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const generatePets = () => {
  return {
    id: faker.database.mongodbObjectId(),
    pet_name: faker.animal.petName(),
    age: faker.date.birthdate(),
    type: faker.animal.type(),
  };
};
const generateUser = () => {
  let pets = [];
  let numberOfPets = faker.number.int({ min: 1, max: 5 });
  for (let i = 0; i < numberOfPets; i++) {
    pets.push(generatePets());
    totalPets.push(generatePets());
  }

  const password = "coder123";
  return {
    id: faker.database.mongodbObjectId(),
    first_name: faker.person.firstName(),
    email: faker.internet.email(),
    password: createHash(password),
    role: faker.helpers.arrayElement(["user", "admin"]),
    pets,
  };
};
mocksRouter.get("/mockingusers", async (req, res) => {
  try {
    for (let i = 0; i < 50; i++) {
      users.push(generateUser());
    }
    res.send({ status: "success", payload: users });
  } catch (error) {
    console.log(error.message);
  }
});
mocksRouter.post("/generateData", async (req, res) => {
  const { userNumber, petsNumber } = req.body;
  let newUsers = [];
  try {
    for (let i = 0; i < userNumber; i++) {
      await UserModel.create(users[i]);
    }
    for (let i = 0; i < petsNumber; i++) {
      await PetsModel.create(totalPets[i]);
    }
    res.send({ status: "success", payload: "Datos insertados con éxito" });
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
