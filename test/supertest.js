import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:3000");

describe("Test del proyecto", () => {
  describe("Test de usuarios", () => {
    it("El endpoint GET /api/mocks/mockingusers debe generar 50 usuarios como si fuera una base de datos de Mongo", async () => {
      const response = await requester.get("/api/mocks/mockingusers");
      
      expect(response.status).to.equal(200);
      expect(response.body.payload.length).to.equal(50);
      expect(response.body.payload).to.be.an("array");
      response.body.payload.forEach(user => {
        expect(user).to.have.property("_id");
      })
    }).timeout(10000);
    it("El endpoint GET /api/mocks/users debe traer a todos los usuarios de la base de datos de Mongo", async () => {
      const response = await requester.get("/api/mocks/users");
      expect(response.status).to.equal(200);
      expect(response.body.payload).to.be.an("array");
      response.body.payload.forEach(user => {
        expect(user).to.have.property("role");
      })
    });
    it("El endpoint GET /api/mocks/pets debe traer a todos las mascotas de la base de datos de Mongo", async () => {
      const response = await requester.get("/api/mocks/pets");
      expect(response.status).to.equal(200);
      expect(response.body.payload).to.be.an("array");
      response.body.payload.forEach(pet => {
        expect(pet).to.have.property("pet_name");
      })
    });
    it("El endpoint POST /api/mocks/generateData debe crear e insertar usuarios y mascotas a la base de datos de Mongo", async () => {
      const quantity = {
        userNumber: 3,
        petsNumber: 2,
      };
      const response = await requester
        .post("/api/mocks/generateData")
        .send(quantity);
      expect(response.status).to.equal(200);
      expect(response.body.payload).to.equal(
        `Se insertaron ${quantity.userNumber} usuarios y ${quantity.petsNumber} mascotas con éxito`
      );
    });
  });
});
