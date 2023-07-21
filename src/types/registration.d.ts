declare namespace API {
  type MerchantRegistrationDTO = {
    country: string
    firstName: string
    lastName: string
    emailAddress: string
    password: string
    businessName: string
    businessType: string
    businessCategory: string
    isSoftwareDeveloper: string
  }

  type MerchantBioDataDTO = {
    emailAddress: string
    firstName: string
    lastName: string
    gender: "MALE" | "FEMALE" | "OTHERS"
    dateOfBirth: string
    identificationDocument: string
    identificationNumber: string
    identificationDocumentPath: string
  }

  type MerchantAccountDataDTO = {
    merchantId: number
    businessBvn: string
    businessBankName: string
    businessAccountNumber: string
    businessAccountName: string
  }

  type MerchantBusinessDataDTO = {
    merchantId: number
    businessDescription: string
    businessEmail: string
    primaryMobile: string
    supportContact: string
    businessCity: string
    businessState: string
    businessWebsite: string
    businessLogo: string
    businessCertificate: string
  }
}
