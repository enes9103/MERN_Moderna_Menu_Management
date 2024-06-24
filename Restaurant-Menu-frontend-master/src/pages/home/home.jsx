import React from "react";
import Logo from "../../asset/logo-without-bg.png";
import PurchasingPlans from "../../components/PurchasingPlans";
import FAQAccordion from "../../components/FAQAccordion";
import FAQ from "../../components/FAQ";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Hello Friends</h1>
      <h2>
        Welcome to Moderna Menu Management Panel and QRCode Generator
        Application
      </h2>
      <img src={Logo} alt="Logo" width={400} />
      <PurchasingPlans />
      <FAQAccordion />
    </div>
  );
}

export default Home;
