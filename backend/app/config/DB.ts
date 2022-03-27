import { Sequelize } from "sequelize";

const db = new Sequelize(
  `${process.env.DATA}`,
  `${process.env.USER}`,
  `${process.env.PASS}`,
  {
    host: "localhost",
    dialect: "mssql",
    // logging: false
  }
);

export default db;