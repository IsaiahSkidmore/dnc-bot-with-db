import Sequelize from "sequelize";
import "dotenv/config";

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true, 
            rejectUnauthorized: false, 
          },
        },
      })
    : new Sequelize(
        process.env.DB_NAME,      
        process.env.DB_USER,
        process.env.DB_PASS, 
        {
          host: process.env.DB_HOST || "localhost",  
          port: process.env.DB_PORT || 5432,
          dialect: "postgres",
        }
      );

export default sequelize;
