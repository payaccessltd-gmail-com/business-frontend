import { baseUrl } from "./baseUrl";


export const simpleInvoice = async ({
  customerName,
  additionalCustomerEmailAddress,
  dueDate,
  amount,
  invoiceNote,
  businessLogo,
  invoiceStatus,
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
  formdata.append("invoiceStatus", invoiceStatus);

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
  merchantId,
  invoiceStatus,
  shippingFee,
  customerEmail,
}: any) => {
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
    invoiceStatus,
    shippingFee,
    merchantId: merchantId,
    // customerEmail: subject,
    customerEmail
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
  // console.log(merchantId)
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


export const getInvoiceDetails = async ({ token, merchantId, invoiceId }: any) => {
  const response = await fetch(`${baseUrl}/api/v1/invoice/get-invoice-details/${invoiceId}/${merchantId}`, {
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
export const getInvoiceBreakdown = async ({ token, merchantId, invoiceId }: any) => {
  const response = await fetch(`${baseUrl}/api/v1/invoice/get-invoice-breakdown/${merchantId}/${invoiceId}`, {
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
export const deleteInvoice = async ({ token, merchantId, invoiceId }: any) => {
  return await fetch(`${baseUrl}/api/v1/invoice/delete-invoice/${invoiceId}/${merchantId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const markAsPaid = async ({ token, merchantId, invoiceId }: any) => {
  return await fetch(`${baseUrl}/api/v1/invoice/mark-invoice-paid/${invoiceId}/${merchantId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const sendReminder = async ({ token, merchantId, invoiceId }: any) => {
  return await fetch(`${baseUrl}/api/v1/invoice/resend-invoice-email/${invoiceId}/${merchantId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};


export const filterInvoices = async ({
  invoiceStatus,
  emailAddress,
  startDate,
  endDate,
  merchantId,
  token
}: any) => {
  const newData = {
    invoiceStatus,
    emailAddress,
    startDate,
    endDate,
    merchantId,
  };
  return await fetch(`${baseUrl}/api/v1/invoice/filter-invoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });
};