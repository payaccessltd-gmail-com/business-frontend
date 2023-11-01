declare namespace API {
  type LoginDTO = {
    username: string
    password: string
  }
  type LoginResponse = {
    subject?: string
    merchantList?: {
      id: any
      businessName: string,
      merchantCode: string
    }[]
    token?: string
  }
}

