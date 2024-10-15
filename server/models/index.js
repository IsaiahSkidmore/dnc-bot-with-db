import { Sequelize } from "sequelize";
import process from "process";
import configFile from "../config/config.json";
import User from "./user.js"; // Move this line to the top

const basename = path.basename(import.meta.url);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

// Read and import all model files
fs.readdirSync(new URL(".", import.meta.url).pathname)
.filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach(async (file) => {
    const model = await import(`./${file}`);
    db[model.default.name] = model.default(sequelize, Sequelize.DataTypes);
  });

// Add User model to db
db.User = User(sequelize, Sequelize.DataTypes); // Add this line
  
// Set up associations (relationships) between models
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;