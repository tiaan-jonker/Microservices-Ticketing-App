import mongoose from 'mongoose'
const { Schema } = mongoose

// Interface describing the props required to create new User

interface UserAttributes {
  name: string
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
  name: string
  email: string
  password: string
}

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
})
// For effective type checking, cannot use new User,
// instead call, with one extra step:
UserSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes)
}

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema)

export { User }
