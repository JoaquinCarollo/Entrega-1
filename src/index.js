import express from "express";
import { connect } from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import mocksRouter from "./routes/mocks.router.js";
import { swaggerOptions } from "./utils/swagger.js";
dotenv.config();
const app = express();
app.set("PORT", 3000);
const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("Conexión éxitosa");
  } catch (error) {
    console.log(error.message);
  }
};
connectDB();
const specs = swaggerJsDoc(swaggerOptions);
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});
app.use("/api/mocks", mocksRouter);

app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
