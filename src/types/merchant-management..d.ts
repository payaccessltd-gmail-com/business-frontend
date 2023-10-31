declare namespace API {
  type UpdateAboutBusinessDTO = {
    businessCategory: string;
    businessType: string;
    softwareDeveloper: boolean;
    mobileNumber: string;
    merchantId: string;
  };

  type UpdateLocationDTO = {
    mobileNumber: string;
    country: string;
    merchantId: string;
  };

  type UpdateMerchantBioDataDTO = {
    emailAddress: string;
    gender: "MALE" | "FEMALE";
    dateOfBirth: string;
    identificationDocument: "DRIVERS_LICENCE" | "NATIONAL_ID" | "INTL_PASSPORT";
    identificationNumber: string;
    merchantId: string;
    identificationDocumentPath: File;
  };

  type UpdateMerchantBusinessDataDTO = {
    businessDescription: string;
    businessEmail: string;
    primaryMobile: string;
    supportContact: string;
    businessCity: string;
    businessState: string;
    businessWebsite: string;
    businessLogoFile: File;
    merchantId: string;
  };

  type UpdateMerchantBankAccountDataDTO = {
    merchantId: string;
    businessBvn: string;
    businessBankName: string;
    businessAccountNumber: string;
    businessAccountName: string;
  };
}
