export const createMerchant = async (merchantRegBody: API.MerchantRegistrationDTO) => {
  return await fetch("https://137.184.47.182:8081/payaccess/api/v1/merchant/new-merchant-signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
    body: JSON.stringify(merchantRegBody),
  })
}

export const updateMerchantBioData = async (merchantRegBody: API.MerchantBioDataDTO) => {
  return await fetch("https://137.184.47.182:8081/payaccess/api/v1/merchant/update-merchant-bio-data", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(merchantRegBody),
  })
}

export const updateMerchantBusinessData = async (merchantRegBody: API.MerchantBusinessDataDTO) => {
  return await fetch("https://137.184.47.182:8081/payaccess/api/v1/merchant/update-merchant-business-data", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
    body: JSON.stringify(merchantRegBody),
  })
}

export const updateBusinessBankData = async (merchantRegBody: API.MerchantAccountDataDTO) => {
  return await fetch(
    "https://137.184.47.182:8081/payaccess/api/v1/merchant/update-merchant-business-bank-account-data",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify(merchantRegBody),
    }
  )
}
