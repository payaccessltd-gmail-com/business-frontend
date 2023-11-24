import { baseUrl } from "./baseUrl";


// export const getTransactionWithSearch = async ({ currentPageNumber, merchantId, rowPerPage, token }: API.Pager, payload: API.TSearchRequest) => {
//     // console.log(merchantId)
//     const response = await fetch(`${baseUrl}/api/v1/invoice/get-invoices/${merchantId}/${rowPerPage}/${currentPageNumber}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const responseText = await response.text();
//     const data = JSON.parse(responseText);
//     return data;
//   };

  export const getAllTransaction = async ({ currentPageNumber, merchantId, rowPerPage, token }: API.Pager, searchQuery: API.TSearchRequest) => {
     console.log("searchQuery" + JSON.stringify(searchQuery))
    //  merchantId = '1'
    const response = await fetch(`${baseUrl}/api/v1/transactions/get-transactions-by-merchant-id/${merchantId}/${rowPerPage}/${currentPageNumber}`, {
      method: "POST",
      body: JSON.stringify(searchQuery),
      headers: {
        "Content-Type": "application/json",
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