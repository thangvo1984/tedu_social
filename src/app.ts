import express from "express";
import { Route } from "core/interfaces";
import mongoose from "mongoose";

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.initializeRoutes(routes);
    this.connectToDatabase();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private connectToDatabase() {
    try {
      const connectString = process.env.MONGODB_URI;
      console.log("connectString======", connectString);
      console.log("process.env======", process.env);

      if (!connectString) {
        console.log("Connection string is invalid");
        return;
      }

      // const connectString =
      //   "mongodb+srv://thangvc:thang123456789@cluster0.nlnwi.mongodb.net/tedu_social?retryWrites=true&w=majority";

      mongoose.connect(connectString);
      console.log("Database connected");
    } catch (error) {
      console.log("Connect to database error", error);
    }
  }
}

export default App;
