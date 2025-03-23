import express from "express";
import { connect } from "mongoose";
import mocksRouter from "./routes/mocks.router.js";

const app = express();
app.set("PORT", 3000);
const connectDB = async () => {
  try {
    await connect(
      "mongodb+srv://Cluster0:54321@cluster0.f1rcl.mongodb.net/PrimeraEntrega"
    );
    console.log("Conexión éxitosa");
  } catch (error) {
    console.log(error.message);
  }
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});
app.use("/api/mocks", mocksRouter);

app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
