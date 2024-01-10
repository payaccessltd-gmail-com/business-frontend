import { baseUrl } from "./baseUrl";



export const createTerminaRequest = async ({
    merchantId,
    terminalType,
    terminalBrand,
    quantity,
    token

}: any) => {
    const newData = {
        merchantId,
        terminalType,
        terminalBrand,
        quantity,
    };
    return await fetch(`${baseUrl}/api/v1/terminal/create-terminal-request`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
    });
};



export const getTerminalRequests = async ({ currentPageNumber, rowCount, token }: any) => {
    const response = await fetch(`${baseUrl}/api/v1/terminal/get-terminal-requests/${rowCount}/${currentPageNumber}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    return data;
};
