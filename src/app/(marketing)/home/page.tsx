"use client"

import GetStarted from "./components/get-started"
import Solution from "./components/solution"
import Offer from "./components/offer"
import React from "react"
import SME from "./components/SME"
import PaymentManagement from "./components/payment-management"
import SmartWay from "./components/smart-way"
import Join from "./components/join"
import JoinWidget from "./components/join-widget"
import SubFooter from "./components/sub-footer"
import Footer from "./components/footer"

const page = () => {
  return (
    <div className="">
      <GetStarted />
      <Solution />
      <Offer />
      <SME />
      <PaymentManagement />
      <SmartWay />
      <Join />
      <JoinWidget />
      <Footer />
      <SubFooter />
    </div>
  )
}

export default page
