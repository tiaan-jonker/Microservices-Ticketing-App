import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

export class PasswordManager {
  static async toHash(password: string) {
    const salt = randomBytes(16).toString('hex')
    const buf = (await scryptAsync(password, salt, 64)) as Buffer

    return `${buf.toString('hex')}.${salt}`
  }

  // stored password is both hex and salt added on
  static async compare(storedPassword: string, suppliedPassword: string) {
    // see period in toHash return
    const [hashedPassword, salt] = storedPassword.split('.')
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer

    return buf.toString('hex') === hashedPassword
  }
}
