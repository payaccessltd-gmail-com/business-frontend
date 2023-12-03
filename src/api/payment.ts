import { baseUrl } from "./baseUrl";


export const getMerchantDetailGuest = async ({ invoiceNumber, merchantCode }: any) => {

    const response = await fetch(`${baseUrl}/api/v1/invoice/get-invoice-details-for-guest/${invoiceNumber}/${merchantCode}`, {
        method: "GET",
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    return data;
};



export const payWithCard = async ({

    orderRef,
    merchantCode,
    redirectUrl,
    currencyCode,
    amount,
    terminalCode,
    channel,
    cardDetails,
    customerId,

}: API.InitiatePayment) => {
    const newData = {
        orderRef,
        merchantCode,
        redirectUrl,
        currencyCode,
        amount,
        terminalCode,
        channel,
        cardDetails,
        customerId,
    };
    return await fetch(`${baseUrl}/api/v1/transactions/debit-card`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic NDUyNUtMUDQ6c2tfbGl2ZV93aXp6b2Rhanl6Y21wbTV4ZGdnZm9xZzFsd2RydnVkZW0wcXYxNW9j`,
        },
        body: JSON.stringify(newData),
    });
};
export const authorizePayment = async ({
    orderRef,
    merchantCode,
    otp

}: any) => {
    const newData = {
        orderRef,
        merchantCode,
        otp

    };
    return await fetch(`${baseUrl}/api/v1/transactions/authenticate-card-payment-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic NDUyNUtMUDQ6c2tfbGl2ZV93aXp6b2Rhanl6Y21wbTV4ZGdnZm9xZzFsd2RydnVkZW0wcXYxNW9j`,
        },
        body: JSON.stringify(newData),
    });
};