import { format } from "date-fns";

import { baseUrl } from "./baseUrl";

export const getMerchantByMerchantCode = async (
  merchantCode: string,
  token: string,
) => {
  return await fetch(
    `${baseUrl}/api/v1/merchant/get-merchant-details/${merchantCode}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateAboutBusiness),
    },
  );
};

export const updateAboutBusiness = async (
  updateAboutBusiness: API.UpdateAboutBusinessDTO,
  token: string,
) => {
  return await fetch(`${baseUrl}/api/v1/merchant/add-new-merchant-to-existing-user`, {
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
  token: string,
) => {
  return await fetch(`${baseUrl}/api/v1/merchant/update-merchant-country`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateMerchantLocation),
  });
};

export const updateMerchantBioData = async (
  {
    gender,
    emailAddress,
    dateOfBirth,
    identificationDocument,
    identificationDocumentPath,
    merchantId,
    identificationNumber,
  }: API.UpdateMerchantBioDataDTO,
  token: string,
) => {
  let formdata = new FormData();
  formdata.append("gender", gender);
  formdata.append("emailAddress", emailAddress);
  formdata.append("dateOfBirth", format(dateOfBirth, "yyyy-MM-dd"));
  formdata.append("identificationDocument", identificationDocument);
  formdata.append("identificationNumber", identificationNumber);

  if (merchantId) {
    formdata.append("merchantId", merchantId.toString());
  }

  if (identificationDocumentPath) {
    formdata.append(
      "identificationDocumentPath",
      identificationDocumentPath,
      identificationDocumentPath.name,
    );
  }

  return await fetch(`${baseUrl}/api/v1/merchant/update-merchant-bio-data`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  });
};

export const updateMerchantBusinessData = async (
  {
    businessDescription,
    businessEmail,
    primaryMobile,
    supportContact,
    businessCity,
    businessState,
    businessWebsite,
    businessLogoFile,
    merchantId,
  }: API.UpdateMerchantBusinessDataDTO,
  token: string,
) => {
  let formdata = new FormData();
  formdata.append("businessDescription", businessDescription);
  formdata.append("businessEmail", businessEmail);
  formdata.append("primaryMobile", primaryMobile);
  formdata.append("supportContact", supportContact);
  formdata.append("businessCity", businessCity);
  formdata.append("businessState", businessState);
  formdata.append("businessWebsite", businessWebsite);

  if (merchantId) {
    formdata.append("merchantId", merchantId.toString());
  }

  if (businessLogoFile) {
    formdata.append(
      "businessLogoFile",
      businessLogoFile,
      businessLogoFile.name,
    );
  } else {
    formdata.append(
      "businessLogoFile",
      new Blob(["", " ", "world"], { type: "text/plain" }),
    );
  }

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
  token: string,
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
