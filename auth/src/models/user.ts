import mongoose from 'mongoose'
const { Schema } = mongoose
import { PasswordManager } from './../utils/passwordHash'

// Interface describing the props required to create new User

interface UserAttributes {
  email: string
  password: string
}

// Interface describing the props that a User Model has
// basically letting TS know that there is going to be a
// build function available on user model

interface UserModel extends mongoose.Model<UserDocument> {
  build(attributes: UserAttributes): UserDocument
}

// Interface describing the props that a User Document has
// that is a single user has

interface UserDocument extends mongoose.Document {
  email: string
  password: string
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    // user returns password and __v; undesirable
    // _id is unusual, chang eit to just id
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
  }
)

// using function to get access to 'this'
UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManager.toHash(this.get('password'))
    this.set('password', hashed)
  }
  // call after all async work is done
  done()
})

// For effective type checking, cannot use new User,
// instead call, with one extra step:
UserSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes)
}

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema)

export { User }
