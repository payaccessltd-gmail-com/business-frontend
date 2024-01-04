import React from 'react'

export default function StandardModal() {
    return (
        <div className='flex flex-col items-center 2xl:w-[55%] w-[70%] gap-4'>

            <div className="w-full flex flex-col gap-6 items-center py-7 px-20 self-center bg-white rounded-[10px] border-[#D6D6D6] border">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className='flex flex-col items-start gap-6'>

                        <p className="text-[#000000] text-[16px] leading-normal font-[600]">
                            From
                        </p>
                        <p className="text-[#000000] text-center min-w-[92px] p-[10px] bg-[#BFEFFF33] text-[16px] font-[400] leading-normal">
                            Goodness Daniel's Oil & gas
                        </p>
                    </div>
                    <div className="bg-[#D6F5FF33] rounded p-[10px] gap-[11px] flex flex-col items-end">
                        <div className="flex flex-row items-center gap-9">
                            <p className="text-[#0C394B] text-[16px] font-[700] leading-normal">Send on</p>
                            <p className="text-[#0C394B] text-[16px] font-[400] leading-normal">2nd May 2023</p>
                        </div>
                        <div className="flex flex-row items-center gap-9">
                            <p className="text-[#0C394B] text-[16px] font-[700] leading-normal">Due date</p>
                            <p className="text-[#0C394B] text-[16px] font-[400] leading-normal">27th May 2023</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <div className='flex flex-col items-start gap-6 self-start'>

                        <p className="text-[#000000] text-[16px] leading-normal font-[600]">
                            To
                        </p>
                        <p className="text-[#000000] text-center min-w-[92px] p-[10px] bg-[#BFEFFF33] text-[16px] font-[400] leading-normal">
                            Faith Oluwatobi12@gmail.com
                        </p>
                    </div>

                </div>


            </div>

            {/* ---------------------------------Second Modal------------------ */}


            <div className="w-full flex flex-col items-center py-20 px-[24px] self-center bg-white rounded-[10px] border-[#D6D6D6] border">
                <div className="flex flex-row items-center justify-between w-full">
                    <p className="text-[#555555] text-[16px] leading-normal font-[600]">
                        Description
                    </p>
                    <p className="text-[#555555] text-[16px] leading-normal font-[600]">
                        Amount and Quantity
                    </p>

                </div>
                <div className="flex flex-row items-start justify-between w-full pt-4 pb-9 border-b border-dashed border-[#999999]">
                    <p className="text-[#115570] text-[16px] leading-normal font-[400] w-[289px] text-start">
                        Receive payments from your clients using our invoice.
                    </p>
                    <p className="text-[#0C394B] text-[20px] leading-[22px] font-[600]">
                        NGN 500,000.00*3
                    </p>
                </div>



                <div className="w-full border-b border-dashed border-[#999999] pt-8 pb-6 flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center w-full gap-4">
                        <div className="flex flex-row items-center justify-between w-full">
                            <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                                Subtotal
                            </p>
                            <p className="text-[#0C394B] text-[20px] leading-normal font-[700]">
                                NGN 500,000.00
                            </p>
                        </div>

                    </div>
                    <div className="flex flex-col items-center w-full gap-4">
                        <div className="flex flex-row items-center justify-between w-full">
                            <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                                Tax
                            </p>
                            <p className="text-[#D92D20] text-[20px] leading-normal font-[700]">
                                -NGN 500,000.00
                            </p>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full">
                            <p className="text-[#115570] text-[16px] leading-normal font-[400]">
                                Discount
                            </p>
                            <p className="text-[#25AF36] text-[20px] leading-normal font-[400]">
                                +NGN 500,000.00
                            </p>
                        </div>
                    </div>
                </div>










                <div className="flex flex-row items-start justify-between w-full pt-6">
                    <p className="text-[#555555] text-[16px] leading-normal font-[600] w-[289px] text-start">
                        Total
                    </p>
                    <p className="text-[#555555] text-[20px] leading-normal font-[600]">
                        NGN 150,000.00
                    </p>
                </div>
            </div>
        </div>
    )
}
