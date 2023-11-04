declare namespace API {
  interface UserDetailsResponse {
    statusCode: string;
    message: string;
    responseObject: ResponseObject;
  }

  interface ResponseObject {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    mobileNumber: string;
    userStatus: string;
    gender: string;
    dateOfBirth: string;
    primaryBusinessName: string;
    softwareDeveloper: boolean;
    identificationDocument: string;
    identificationNumber: string;
    identificationDocumentPath: string;
    primaryMerchantId: number;
  }
}
