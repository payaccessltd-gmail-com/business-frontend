import { baseUrl, token } from "./baseUrl";

export const updateAboutBusiness = async (
  updateAboutBusiness: API.UpdateAboutBusinessDTO,
) => {
  return await fetch(`${baseUrl}/api/v1/merchant/update-about-business`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateAboutBusiness),
  });
};

export const updateMerchantLocation = async (
  updateMerchantLocation: API.UpdateLocationDTO,
) => {
  return await fetch(`${baseUrl}/api/v1/merchant/update-merchant-county`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateMerchantLocation),
  });
};

export const updateMerchantBioData = async ({
  emailAddress,
  gender,
  dateOfBirth,
  identificationDocument,
  identificationDocumentPath,
  merchantId,
  identificationNumber,
}: API.UpdateMerchantBioDataDTO) => {
  let formdata = new FormData();
  formdata.append("emailAddress", emailAddress);
  formdata.append("gender", gender);
  formdata.append("dateOfBirth", dateOfBirth);
  formdata.append("identificationDocument", identificationDocument);
  formdata.append("identificationNumber", identificationNumber);
  formdata.append("merchantId", merchantId);
  formdata.append(
    "identificationDocumentPath",
    identificationDocumentPath,
    identificationDocumentPath.name,
  );

  return await fetch(`${baseUrl}/api/v1/merchant/update-merchant-bio-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  });
};

export const updateMerchantBusinessData = async ({
  businessDescription,
  businessEmail,
  primaryMobile,
  supportContact,
  businessCity,
  businessState,
  businessWebsite,
  businessLogoFile,
  merchantId,
}: API.UpdateMerchantBusinessDataDTO) => {
  let formdata = new FormData();
  formdata.append("businessDescription", businessDescription);
  formdata.append("businessEmail", businessEmail);
  formdata.append("primaryMobile", primaryMobile);
  formdata.append("supportContact", supportContact);
  formdata.append("businessCity", businessCity);
  formdata.append("businessState", businessState);
  formdata.append("businessWebsite", businessWebsite);
  formdata.append("businessLogoFile", businessLogoFile, businessLogoFile.name);
  formdata.append("merchantId", merchantId);

  return await fetch(
    `${baseUrl}/api/v1/merchant/update-merchant-business-data`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    },
  );
};

export const updateMerchantBusinessBankAccountData = async (
  merchantBuinessBankAccountData: API.UpdateMerchantBankAccountDataDTO,
) => {
  return await fetch(
    `${baseUrl}/api/v1/merchant/update-merchant-business-bank-account-data`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(merchantBuinessBankAccountData),
    },
  );
};
