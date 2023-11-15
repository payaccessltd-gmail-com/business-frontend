import { baseUrl } from "./baseUrl";




export const getMerchantKeys = async ({ merchantId, token }: API.GetMerchantSetting) => {

    const response = await fetch(`${baseUrl}/api/v1/developer/get-merchant-keys/${merchantId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    return data;
};


export const generateNewMerchantKeys = async ({
    apiMode,
    merchantId,
    token
}: any) => {
    const newData = {
        apiMode,
        merchantId,
    };
    return await fetch(`${baseUrl}/api/v1/developer/generate-new-merchant-keys`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
    });
};