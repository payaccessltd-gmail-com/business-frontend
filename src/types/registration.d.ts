declare namespace API {
  type StatusReponse = {
    statusCode?: string;
    message?: string;
    responseObject?: string;
  };

  type CreateAccountResponse = StatusReponse & {
    responseObject?: string;
  }
  type VerifyAccountResponse = StatusReponse & {
    responseObject: {
      firstName: string;
      lastName: string;
      emailAddress: string;
      userStatus: string;
      softwareDeveloper: boolean;
    }
  }

  type UserDTO = {
    firstName: string;
    lastName: string;
    emailAddress: string;
    businessName: string;
    password: string;
  };
  type UserOTP = {
    otp: string;
    verificationLink: string;
    emailAddress: string;
  };
  type ResendOTP = {
    emailAddress: string;
  };
  type ForgetPassword = {
    email: string;
  };
  type resetPasword = {
    password: string,
    newPassword: string
  };
  type OTP = {
    email: string;
    otp: string;

  };

  type MerchantRegistrationDTO = {
    country: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    businessName: string;
    businessType: string;
    businessCategory: string;
    isSoftwareDeveloper: string;
  };

  type MerchantBioDataDTO = {
    emailAddress: string;
    firstName: string;
    lastName: string;
    gender: "MALE" | "FEMALE" | "OTHERS" | string;
    dateOfBirth: string | unknown;
    identificationDocument: string;
    identificationNumber: string;
    identificationDocumentPath: string;
  };

  type MerchantAccountDataDTO = {
    emailAddress: string;
    businessBvn: string;
    businessBankName: string;
    businessAccountNumber: string;
    businessAccountName: string;
  };

  type MerchantBusinessDataDTO = {
    emailAddress: string;
    businessDescription: string;
    businessEmail: string;
    primaryMobile: string;
    supportContact: string;
    businessCity: string;
    businessState: string;
    businessWebsite: string;
    businessLogo: string;
    businessCertificate: string;
  };
}
