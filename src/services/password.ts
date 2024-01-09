import dotenv from 'dotenv'
import { User } from '../models/user'
import bcrypt from 'bcrypt'
import { JWTService } from './jwt'

dotenv.config()

export const PasswordService = {
  hashPassword: async (password: string): Promise<string> => {
    const saltRound = Number(process.env.SALT_ROUND)
    const salt = await bcrypt.genSalt(saltRound)
    return await bcrypt.hash(password, salt)
  },

  validatePassword: async (password: string, user: User): Promise<string> => {
    try {
      const isValid = await bcrypt.compare(password, String(user.password))
      if (isValid) {
        return JWTService.generateToken(String(user.id), String(user.name))
      }
      return ''
    } catch (error) {
      console.log('Error validating password:', error)
      throw new Error('Failed to validate password')
    }
  }
}
