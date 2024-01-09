import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secretKey = process.env.SECRET_KEY || 'noh'

export const JWTService = {
  generateToken: async (userId: string, username: string): Promise<string> => {
    const payload = {
      userId,
      username
    }

    try {
      const token = jwt.sign(payload, secretKey, { expiresIn: '24h' })
      return token
    } catch (error) {
      console.error('Error generating token:', error)
      throw new Error('Fail to generate token')
    }
  },

  validateToken: (token: string): boolean => {
    try {
      const validateToken = jwt.verify(token, secretKey)
      // console.log(validateToken)
      return true
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        // Handle invalid signature
        console.log('Invalid token signature')
      } else {
        // Handle other errors, if needed
        console.error('Error verifying token:', error)
      }
      return false
    }
  }
}
