import express, { Request, Response, NextFunction } from "express";
import * as exphbs from "express-handlebars";
import * as path from "path";
import hbsHelpers from "handlebars-helpers";

import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established successfully");
    const app = express();
    const handlebars = exphbs.create({
      extname: "hbs",
      defaultLayout: "main",
      helpers: {
        ...hbsHelpers(),
        ...hbsHelpers(),
        includes: function (array: any, value: any) {
          return array.includes(value);
        },
      },
    });

    app.engine("hbs", handlebars.engine);
    app.use(express.static(path.join(__dirname, "public")));

    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "views"));

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));
    app.use("/api/auth", authRoutes);
    app.use("/api", productRoutes);
    app.use("/api", categoryRoutes);

    app.get("/", (req, res) => {
      res.json("Established connection!");
    });
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ error: "Something went wrong!" });
    });

    const port = process.env.PORT;

    app.use(express.urlencoded({ extended: true }));

    app.use("/", productRoutes);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error initializing application:", error);
  }
};

startServer();
