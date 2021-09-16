import "dotenv/config";
import App from "./app";
import { IndexRoute } from "@modules/index";
import { validateEnv } from "@core/utils";
import { UsersRoute } from "@modules/users";
import { AuthRoute } from "@modules/auth";
import { ProfileRoute } from "@modules/profile";
import { PostsRoute } from "@modules/posts";

validateEnv();

const routes = [
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProfileRoute(),
  new PostsRoute(),
];
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
