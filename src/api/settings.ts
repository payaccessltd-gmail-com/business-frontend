import { baseUrl } from "./baseUrl";






export const getMerchantSetting = async ({ merchantId, token }: API.GetMerchantSetting) => {

    const response = await fetch(`${baseUrl}/api/v1/settings/get-merchant-settings/${merchantId}`, {
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





export const updateNotification = async ({
    transactionNotificationByEmail,
    customerNotificationByEmail,
    transferNotificationByEmailForCredit,
    transferNotificationByEmailForDebit,
    merchantReceiveEarningsOption,
    enableNotificationForTransfer,
    enableNotificationForInvoicing,
    enableNotificationForPaymentLink,
    enableNotificationForSettlement,
    merchantId, 
    token
}: API.NotificationBody) => {
    const newData = {
        transactionNotificationByEmail,
        customerNotificationByEmail,
        transferNotificationByEmailForCredit,
        transferNotificationByEmailForDebit,
        merchantReceiveEarningsOption,
        enableNotificationForTransfer,
        enableNotificationForInvoicing,
        enableNotificationForPaymentLink,
        enableNotificationForSettlement,
        merchantId,
    };
    return await fetch(`${baseUrl}/api/v1/settings/update-merchant-notifications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
    });
};