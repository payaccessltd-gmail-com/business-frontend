declare namespace API {

    type GetMerchantSetting = {
        merchantId: string,
        token: string

    }
    type NotificationBody = {
        transactionNotificationByEmail: boolean,
        customerNotificationByEmail: boolean,
        transferNotificationByEmailForCredit: boolean,
        transferNotificationByEmailForDebit: boolean,
        merchantReceiveEarningsOption: string,
        enableNotificationForTransfer: boolean,
        enableNotificationForInvoicing: boolean,
        enableNotificationForPaymentLink: boolean,
        enableNotificationForSettlement: boolean,
        merchantId: string,
        token: string,
    }
}
