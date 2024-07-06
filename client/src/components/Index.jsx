import React from "react";
import Header from "./Body/Header";
import NavBar from "./Body/NavBar";
import Footer from "./Body/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
function Index() {
  return (
    <>
      <body className="">
        <Header />
        <NavBar />
        <main id="main" className="main d-flex justify-content-center align-items-center" style={{height: '76vh'}}>
          <div className="pagetitle text-center ">
           <img src="assets/img/LogoCs.svg" className="logo" alt="" />
          </div>
          {/* <!-- End Page Title --> */}
        </main>
        <Footer />
      </body>
    </>
  );
}

export default Index;
