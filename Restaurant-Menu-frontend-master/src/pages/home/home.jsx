import React from "react";
import Logo from "../../asset/logo-without-bg.png";
import PurchasingPlans from "../../components/PurchasingPlans";
import FAQAccordion from "../../components/FAQAccordion";
import FAQ from "../../components/FAQ";

function Home() {
  const questions = [
    {
      id: 1,
      question: "Popular Articles",
      answer:
        "Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.",
    },
    {
      id: 2,
      question: "Fix problems & request removals",
      answer:
        "Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.",
    },
    {
      id: 3,
      question: "Browse the web",
      answer:
        "Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.",
    },
    {
      id: 4,
      question: "Search on your phone or tablet",
      answer:
        "Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.",
    },
  ];

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

      <FAQ data={questions} />
    </div>
  );
}

export default Home;
