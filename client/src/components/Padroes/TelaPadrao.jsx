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
          <div class="">
            <h1>Form Layouts</h1>
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li class="breadcrumb-item">Forms</li>
                <li class="breadcrumb-item active">Layouts</li>
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
