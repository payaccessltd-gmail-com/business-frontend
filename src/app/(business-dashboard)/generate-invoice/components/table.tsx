import React from 'react'

const InvoiceTable = ({ data }: any) => {
    const heading = ["Amount", "Customer Name", "Invoice No.", "Status", "Date"]
    const demoData: any[] = [
        {
            id: 0,
            amount: 500,
            cname: "Faith Oluchi",
            InvoiceNo: "Pay00001",
            status: "pending",
            Date: "may 29th, 2:40pm"

        }
    ]
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-row items-center justify-between rounded-[8px] p-[10px] h-[58px] w-full bg-[#0C394B] mb-[24px]'>
                {
                    heading.map((value, id) => {
                        return <p key={id} className='text-[#FFFFFF] text-[16px] font-[600] leading-[20px] text-center w-[20%] font-raleway'>{value}</p>
                    })

                }
            </div>
            <div className='flex flex-col items-center gap-6'>
                {demoData.map(() => {
                    return <div className='p-[10px] border-b border-b-[#BAE5F44F] flex flex-row items-center w-full'>

                    </div>
                })}
            </div>

        </div>
    )
}

export default InvoiceTable