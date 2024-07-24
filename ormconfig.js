require("dotenv").config();

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  entities: ["src/**/entities/*.{ts,js}"],
  migrations: ["src/**/migrations/*.{ts,js}"],

  synchronize: false,
  logging: false,
  seeds: ["src/seeds/**/*.ts"],
  factories: ["src/factories/**/*.ts"],
};
