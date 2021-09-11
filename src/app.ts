import express from "express";
import { Route } from "@core/interfaces";
import mongoose from "mongoose";
import hpp from "hpp";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { Logger } from "@core/utils";

class App {
  public app: express.Application;
  public port: string | number;
  public production: boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.production = process.env.NODE_ENV == "production" ? true : false;
    this.initializeRoutes(routes);
    this.connectToDatabase();
    this.initializeMiddleware();
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`Server is listening on port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeMiddleware() {
    if (this.production) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(morgan("combined"));
      this.app.use(cors({ origin: "your domain", credentials: true }));
    } else {
      this.app.use(morgan("dev"));
      this.app.use(cors({ origin: true, credentials: true }));
    }
  }

  private connectToDatabase() {
    try {
      const connectString = process.env.MONGODB_URI;
      // console.log("connectString======", connectString);
      // console.log("process.env======", process.env);

      if (!connectString) {
        Logger.error("Connection string is invalid");
        return;
      }

      // const connectString =
      //   "mongodb+srv://thangvc:thang123456789@cluster0.nlnwi.mongodb.net/tedu_social?retryWrites=true&w=majority";

      mongoose.connect(connectString);
      Logger.info("Database connected");
    } catch (error) {
      Logger.error("Connect to database error", error);
    }
  }
}

export default App;
