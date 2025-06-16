export interface ILogin {
  username: string
  password: string
}

export interface IReqUser {
  id?: string
  role?: string
}

export interface IAdmin {
  email: string
  password: string
  phoneNumber?: string
}
