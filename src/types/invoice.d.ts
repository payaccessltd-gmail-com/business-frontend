declare namespace API {
    type SimpleInvoice = {
        customerName: string,
        additionalCustomerEmailAddress: string,
        dueDate: string,
        amount: string,
        invoiceNote: string,
        businessLogo: File,
        token: string,
        subject: string,
        merchantId: string
    };
    type InvoiceStatusReponse = {
        statusCode?: string;
        message?: string;
        responseObject?: string;
    };

    type StandardInvoice = {
        customerName: string,
        additionalCustomerEmailAddress: string,
        dueDate: string,
        amount: number,
        invoiceNote: string,
        taxPercent: number,
        discountType: string,
        discountAmount: number,
        token: string,
        subject: string,
        merchantId: string
        invoiceBreakdownList: {
            invoiceItem: string,
            quantity: number,
            costPerUnit: number
        }[]

    };
}

