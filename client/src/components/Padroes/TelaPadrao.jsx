import React, { useEffect }  from "react";
import Header from "./Body/Header";
import NavBar from "./Body/NavBar";
import Footer from "./Body/Footer";
function FormPadrao() {
  return (
    <>
      <body className="">
        <Header />
        <NavBar />
        <main id="main" className="main">
          <div className="">
            <h1>Form Layouts</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">Forms</li>
                <li className="breadcrumb-item active">Layouts</li>
              </ol>
            </nav>
          </div>
          {/* <!-- End Page Title --> */}
        </main>
        <Footer />
      </body>
    </>
  );
}

export default FormPadrao;
