import "dotenv/config";
import App from "./app";
import { IndexRoute } from "@modules/index";
import { validateEnv } from "@core/utils";

validateEnv();

const routes = [new IndexRoute()];
const app = new App(routes);

app.listen();

// import express, { Request, Response } from "express";
// import { IndexRoute } from "modules/index";

// const port = process.env.PORT || 5000;

// const app = express();

// app.get("/", (req: Request, res: Response) => {
//   res.send("API is running......");
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
