import * as myslqDriver from "mysql2"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
import { User } from '../models/user';

dotenv.config()

export const UserDB: DataSource = new DataSource({
  driver: myslqDriver,
  type: "mysql",
  host: process.env.DB_USER_MANAGEMENT_HOST,
  port: Number(process.env.DB_USER_MANAGEMENT_PORT),
  username: "root",
  password: "root",
  database: "user_management",
  // entities: [path.join(__dirname, "../models/*.{js, ts}")]
  entities: [User]
})

export const DBInit = (): void => {
  UserDB.initialize()
    .then(() => {
      console.log("UserManagement Datasource has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
    })
}