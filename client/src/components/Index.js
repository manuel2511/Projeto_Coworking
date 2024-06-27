import React from "react";
import Header from "./Body/Header";
import NavBar from "./Body/NavBar";
import Footer from "./Body/Footer";
function Index() {
  return (
    <>
      <Header />
      <NavBar />
      <div class="pagetitle">
      <h1>Form Layouts</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item">Forms</li>
          <li class="breadcrumb-item active">Layouts</li>
        </ol>
      </nav>
    </div>
    {/* <!-- End Page Title --> */}
      <Footer />
    </>
  );
}

export default Index;
