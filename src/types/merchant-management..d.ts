declare namespace API {
  type UpdateAboutBusinessDTO = {
    businessCategory: string;
    businessType: string;
    softwareDeveloper: string;
    mobileNumber: string;
    merchantId: number;
  };

  type UpdateLocationDTO = {
    country: string;
    merchantId: number;
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

  interface Merchant {
    id: number;
    businessName: string;
    merchantCode: string;
  }

  type MerchantList = Array<Merchant>;
}
