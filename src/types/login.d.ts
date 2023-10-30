declare namespace API {
  type LoginDTO = {
    username: string
    password: string
  }
  type LoginResponse = {
    subject?: string
    token?: string
  }
}

