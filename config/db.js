import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "micro_crm",
  "postgres",
  "fazi5566",
  {
    host: "localhost",
    dialect: "postgres",
    logging: false
  }
);

export default sequelize;
