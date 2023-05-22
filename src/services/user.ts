import { UserDB } from '../database/datasouce';
import { User } from '../models/user'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

export const UserService = {
  create: async (name: string, email: string, password: string): Promise<User> => {
    const repo = UserDB.getRepository(User)
    const user = new User();
    user.name = name
    user.email = email
    const psw = await hashPassword(password)
    user.password = psw
    console.log(user)
    return await repo.save(user)
  },

  findUserByEmail: async (email: string): Promise<User | null> => {
    const repo = UserDB.getRepository(User)
    return await repo.findOne({
      where: { email }
    });
  }
}

async function hashPassword(password: string): Promise<string> {
  const saltRound = Number(process.env.SALT_ROUND)
  const salt = await bcrypt.genSalt(saltRound)
  return await bcrypt.hash(password, salt)
}