import express from "express";
import bodyParser from "body-parser";

import routes from "./routes/api.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/api", routes);

app.listen(PORT, () => console.log("server is running..."));
