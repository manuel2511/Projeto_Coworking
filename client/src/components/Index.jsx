import React, { useEffect }  from "react";
import Header from "./Body/Header";
import NavBar from "./Body/NavBar";
import Footer from "./Body/Footer";
function Index() {
  return (
    <>
      <body className="">
        <Header />
        <NavBar />
        <main id="main" className="main d-flex justify-content-center align-items-center" style={{height: '76vh'}}>
          <div class="pagetitle text-center ">
           <img src="assets/img/apple-touch-icon.png" className="" alt="" />
          </div>
          {/* <!-- End Page Title --> */}
        </main>
        <Footer />
      </body>
    </>
  );
}

export default Index;
