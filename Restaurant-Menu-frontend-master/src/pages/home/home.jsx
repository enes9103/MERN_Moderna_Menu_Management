import React from "react";
import Logo from "../../asset/logo-without-bg.png";

function Home() {
  return (
    <div>
      <h1>Hello Friends</h1>
      <h2>Welcome to Moderna Menu Management and QRCode Generator Application</h2>
      <img src={Logo} alt="Logo" width={400} />
    </div>
  );
}

export default Home;
