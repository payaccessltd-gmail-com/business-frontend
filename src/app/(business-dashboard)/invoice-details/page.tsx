"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LuChevronLeft, LuTrendingDown, LuCornerLeftUp, LuCopy } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { ScrollArea } from "components/ui/scroll-area";
import { Button } from "components/ui/button";
import Image from "next/image";
import logo from "assets/img/invoice/default.png"
import { useToast } from "components/ui/use-toast";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query"
import { deleteInvoice } from "api/invoice";
import { useMutation } from "@tanstack/react-query";
import { getInvoiceDetails } from "api/invoice";
import { baseImgUrl } from "api/baseUrl"
import DeletePopup from "./components/delete-popup";





let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""


if (
  typeof window !== "undefined" &&
  typeof window.localStorage !== "undefined"
) {
  token = window.localStorage.getItem("token") as any
  subject = window.localStorage.getItem("subject") as any
  merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
  merchantId = merchantList[0].id ? merchantList[0]?.id : null
}


export default function GenerateInvoice() {
  const [deleteId, setDeleteId] = useState<string | undefined | null>("")
  const [deletePopup, setPopup] = useState<boolean>(false)

  const searchParams = useSearchParams();
  const invoiceIdValue = searchParams?.get("id");

  const path = usePathname()


  const requestData = {
    token, merchantId, invoiceId: invoiceIdValue
  }


  const detailData: any = useQuery(['getMerchantSetting', requestData], () => getInvoiceDetails(requestData));

  // console.log(detailData?.data?.responseObject)
  const fillData = detailData?.data?.responseObject
  const sendDate = new Date(fillData?.createdAt).toDateString().split(" ");
  const dueDate = new Date(fillData?.dueDate).toDateString().split(" ");


  const { toast } = useToast();
  const route = useRouter();

  const [link, setLink] = useState("");
  const [link2, setLink2] = useState("");

  useEffect(() => {
    fillData?.referenceNumber ? setLink2(fillData?.referenceNumber) : ""
    path ? setLink(`http://137.184.47.182:3000${path}?id=${invoiceIdValue}`) : ""

  }, [fillData?.referenceNumber, path])

  const handleCopyToClipboard = () => {
    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = link;

    // Append the input element to the DOM (it doesn't need to be visible)
    document.body.appendChild(tempInput);

    // Select the text inside the input element
    tempInput.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);
    toast({
      variant: "default",
      title: "Copied",
      description: `${link}`,
      className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
    });
  };
  const handleCopyToClipboard2 = () => {
    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = link2;

    // Append the input element to the DOM (it doesn't need to be visible)
    document.body.appendChild(tempInput);

    // Select the text inside the input element
    tempInput.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);
    toast({
      variant: "default",
      title: "Copied",
      description: `${link}`,
      className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
    });
  };


  const deleteInvoiceMutation = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: async (data: any) => {
      const responseData: API.InvoiceStatusReponse =
        (await data.json()) as API.InvoiceStatusReponse;

      if (responseData?.statusCode === "1") {
        setPopup(false)
        toast({
          variant: "destructive",
          title: "",
          description: "Error Deleting Invoice",
        });
      }

      if (responseData?.statusCode === "0") {
        setPopup(false)
        toast({
          variant: "default",
          title: "",
          description: "Invoice Deleted",
          className:
            "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        });

        if (typeof window) {
          route.push(`/invoice`);
        }
      }
    },

    onError: (e) => {
      setPopup(false)
      console.log(e);
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      });
    },
  });

  const handleDelete = () => {
    const requestData = {
      token,
      merchantId,
      invoiceId: fillData?.id?.toString()
    }
    // console.log(typeof requestData.invoiceId)
    deleteInvoiceMutation.mutate(requestData as any);

  }



  return (
    <div className="fixed top-0 left-0 flex flex-col w-screen h-screen py-[85px] pr-[60px] pl-[100px] bg-[white]">
      <p
        onClick={() => {
          route.back();
        }}
        className="cursor-pointer absolute sm:left-[74px] left-[20px] top-[52px] flex flex-row items-center gap-[7px] text-[14px] font-[400] leading-[145%] text-[#000000]"
      >
        <LuChevronLeft className="text-[24px] text-[#000000]" />
        Back
      </p>
      <div className="mt-[40px] mb-[37px] flex flex-row items-center justify-between pr-10">
        <p className="text-[#000000] text-[20px] font-black">
          Invoice No: {`PAY${String(fillData?.id).padStart(8, '0')}`}
        </p>
        <p className="text-[#FFFFFF] text-center min-w-[92px] rounded p-[10px] bg-[#8E6115] text-[14px] font-[700] leading-normal">
          Pending
        </p>
      </div>
      <ScrollArea className="pr-10">
        <div className="flex flex-col w-full mt-[26px]">
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col items-start gap-4">
              <p className="text-[#000000] text-[14px] font-[700] leading-normal">Invoice sent to</p>
              <div className="flex flex-row items-center gap-[26px]">
                {
                  fillData?.businessLogo ?
                    <Image height={58} width={58} src={`http://137.184.47.182:8081/fileuploads/${fillData?.businessLogo}`} alt="business logo" />
                    :
                    <Image height={58} width={58} src={logo} alt="default" />
                }

                <p className="text-[#000000] text-center min-w-[92px] p-[10px] bg-[#BFEFFF33] text-[16px] font-[400] leading-normal">
                  Goodness Daniel's oli & gas
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-6">
              <div className="flex flex-row items-center gap-2">
                <Button
                  variant={"outline"}
                  className="min-h-[36px] gap-2 flex items-center font-[700] text-[#555555] bg-[#F6FDFF] border-[#D3EEF9] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                >
                  <FiEdit className="text-[20px] text-[#555555]" />
                  Edit
                </Button>
                <Button
                  variant={"outline"}
                  className="min-h-[36px] gap-2 flex items-center font-[700] text-[#555555] bg-[#F6FDFF] border-[#D3EEF9] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                >
                  <LuTrendingDown className="text-[20px] text-[#555555]" />
                  Mark as paid
                </Button>
                <Button
                  onClick={() => setPopup(true)}
                  variant={"outline"}
                  className="min-h-[36px] gap-2 flex items-center font-[700] text-[#555555] bg-[#F6FDFF] border-[#D3EEF9] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                >
                  <LuCornerLeftUp className="text-[20px] text-[#555555]" />
                  Delete
                </Button>
              </div>
              <div className="bg-[#D6F5FF33] rounded p-[10px] gap-[11px] flex flex-col items-end">
                <div className="flex flex-row items-center gap-9">
                  <p className="text-[#0C394B] text-[16px] font-[700] leading-normal">Send on</p>
                  <p className="text-[#0C394B] text-[16px] font-[400] leading-normal">{`${sendDate[2]} ${sendDate[1]} ${sendDate[3]}`}</p>
                </div>
                <div className="flex flex-row items-center gap-9">
                  <p className="text-[#0C394B] text-[16px] font-[700] leading-normal">Due date</p>
                  <p className="text-[#0C394B] text-[16px] font-[400] leading-normal">{`${dueDate[2]} ${dueDate[1]} ${dueDate[3]}`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-between w-full gap-[100px] my-[40px]">
            <div className="flex flex-col items-start gap-4 w-full">{/* //--------------invoice and reference links */}
              <div className="flex flex-col items-start gap-2 w-full">
                <label
                  htmlFor="link"
                  className="text-[16px] text-[#0C394B] font-[700] leading-normal"
                >
                  Invoice Link
                </label>
                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[71px] relative">
                  <input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    id="link"
                    type="text"
                    placeholder="Copy Link"
                    className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                  />
                  <LuCopy
                    onClick={handleCopyToClipboard}
                    className="absolute right-[23px] top-[19.75px] cursor-pointer text-[26px] text-[#49454F]"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <label
                  htmlFor="link2"
                  className="text-[16px] text-[#0C394B] font-[700] leading-normal"
                >
                  Reference
                </label>
                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[71px] relative">
                  <input
                    disabled
                    value={link2}
                    onChange={(e) => setLink2(e.target.value)}
                    id="link2"
                    type="text"
                    placeholder="Copy Link"
                    className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                  />
                  <LuCopy
                    onClick={handleCopyToClipboard2}
                    className="absolute right-[23px] top-[19.75px] cursor-pointer text-[26px] text-[#49454F]"
                  />
                </div>
              </div>
            </div>
            <div className="w-full bg-[#F2FBFE] rounded-[7px] px-4 py-5 flex flex-col items-start">
              <p className="text-[#0C394B] text-[20px] font-[700] leading-normal mb-2">Reminder</p>
              <p className="text-[#0C394B] text-[16px] font-[400] leading-normal mb-6">A mail has been sent to you
                <span className="text-[#0C394B] text-[16px] font-[700] leading-normal">
                  {" "}{fillData?.customerEmail}{" "}
                </span>
                {/* 20min ago. */}
              </p>
              <Button
                className="min-h-[48px] font-[700] hover:bg-[#1D8EBB] hover:opacity-[0.4] self-end"
              >
                Send another reminder
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center w-full">

            {/* ////--------------------payment description start------------ */}



            {/* ////--------------------payment description end------------ */}
            <div className="flex flex-col items-center w-full gap-4 border-b border-dashed border-[#999999] pb-6">
              <div className="flex flex-row items-center justify-between w-full">
                <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                  Description
                </p>
                <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                  Amount  and Quantity
                </p>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <p className="text-[#115570] text-[16px] leading-normal font-[400]">
                  Receive payments from your clients using our invoice.
                </p>
                <p className="text-[#0C394B] text-[20px] leading-[22px] font-[600]">
                  N 500,000.00 * 3
                </p>
              </div>
            </div>
            {/* ////--------------------subtotal and task------------ */}
            <div className="w-full border-b border-dashed border-[#999999] pt-8 pb-6 flex flex-col items-center gap-6">
              <div className="flex flex-col items-center w-full gap-4">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                    Subtotal
                  </p>
                  <p className="text-[#0C394B] text-[20px] leading-normal font-[700]">
                    NGN 150,000.00
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-[#115570] text-[16px] leading-normal font-[400]">
                    Discount
                  </p>
                  <p className="text-[#115570] text-[20px] leading-normal font-[400]">
                    -NGN 50.00
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center w-full gap-4">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                    Tax
                  </p>
                  <p className="text-[#0C394B] text-[20px] leading-normal font-[700]">
                    NGN 150,000.00
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-[#115570] text-[16px] leading-normal font-[400]">
                    Discount
                  </p>
                  <p className="text-[#115570] text-[20px] leading-normal font-[400]">
                    +NGN 00.00
                  </p>
                </div>
              </div>
            </div>
            {/* ////--------------------subtotal and task ending------------ */}
            <div className="flex flex-row items-center justify-between w-full mt-6">
              <p className="text-[#555555] text-[16px] leading-normal font-[700]">
                Grand Total
              </p>
              <p className="text-[#0C394B] text-[20px] leading-normal font-[700]">
                NGN 150,000.00
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
      {deletePopup ? <DeletePopup setPopup={setPopup} handleDelete={handleDelete} /> : ""}
    </div>
  );
}








