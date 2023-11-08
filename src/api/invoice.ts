import { baseUrl } from "./baseUrl";


export const simpleInvoice = async ({
  customerName,
  additionalCustomerEmailAddress,
  dueDate,
  amount,
  invoiceNote,
  businessLogo,
  token,
  subject,
  merchantId
}: API.SimpleInvoice) => {
  let formdata = new FormData();
  formdata.append("customerName", customerName);
  formdata.append(
    "additionalCustomerEmailAddress",
    additionalCustomerEmailAddress,
  );
  formdata.append("dueDate", dueDate);
  formdata.append("amount", amount);
  formdata.append("invoiceNote", invoiceNote);
  formdata.append("businessLogo", businessLogo, businessLogo.name);
  formdata.append("merchantId", merchantId);
  formdata.append("customerEmail", subject);

  return await fetch(`${baseUrl}/api/v1/invoice/create-simple-invoice`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  });
};

export const standardInvoice = async ({
  customerName,
  additionalCustomerEmailAddress,
  dueDate,
  amount,
  invoiceNote,
  taxPercent,
  discountType,
  discountAmount,
  invoiceBreakdownList,
  token,
  subject,
  merchantId
}: API.StandardInvoice) => {
  const newData = {
    customerName,
    additionalCustomerEmailAddress,
    dueDate,
    amount,
    invoiceNote,
    taxPercent,
    discountType,
    discountAmount,
    invoiceBreakdownList,
    merchantId: merchantId,
    customerEmail: subject,
  };
  return await fetch(`${baseUrl}/api/v1/invoice/create-standard-invoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });
};

export const getAllInvoice = async ({ currentPageNumber, merchantId, rowPerPage, token }: API.GetAllInovice) => {

  const response = await fetch(`${baseUrl}/api/v1/invoice/get-invoices/${merchantId}/${rowPerPage}/${currentPageNumber}`, {
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
