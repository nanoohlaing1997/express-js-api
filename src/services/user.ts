import { UserDB } from '../database/datasouce'
import { User } from '../models/user'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { PasswordService } from './password'

dotenv.config()

export const UserService = {
  create: async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    const repo = UserDB.getRepository(User)
    const user = new User()
    user.name = name
    user.email = email
    const psw = await PasswordService.hashPassword(password)
    user.password = psw
    return await repo.save(user)
  },

  findUserByEmail: async (email: string): Promise<User | null> => {
    const repo = UserDB.getRepository(User)
    return await repo.findOne({
      where: { email }
    })
  },

  findUserByName: async (name: string): Promise<User | null> => {
    const repo = UserDB.getRepository(User)
    return await repo.findOne({
      where: { name }
    })
  },

  findUsers: async (): Promise<User[] | null> => {
    const repo = UserDB.getRepository(User)
    const users = await repo.find({
      select: ['id', 'name', 'email']
    })
    return users
  }
}
