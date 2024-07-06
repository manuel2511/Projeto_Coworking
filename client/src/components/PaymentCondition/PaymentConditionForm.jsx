import React, { useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { createPaymentCondition } from "../../services/paymentConditionService";
import "./paymentConditions.css";

const PaymentConditionForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createPaymentCondition(name, description);
      alert("Condição de pagamento cadastrada com sucesso!");
      setName("");
      setDescription("");
    } catch (error) {
      alert("Já existe está condição de pagamento");
    }
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
      document.body.classList.toggle('toggle-sidebar', !isSidebarOpen);
    };

  return (
    <>
      <body className="">
        <Header onToggleSidebar={toggleSidebar} />
        <NavBar isOpen={isSidebarOpen} />
        <main id="main" className="main">
          <div className="breadcrumb-container">
            <h1>Formas de Pagamentos</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">Cadastros</li>
                <li className="breadcrumb-item active">Condição de Pagamento</li>
              </ol>
            </nav>
          </div>
          {/* <!-- End Page Title --> */}
          <div className="PaymentCondition-form-container">
          <form onSubmit={handleSubmit}>
            <div className="PaymentCondition-form-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Forma de pagamento</label>
            </div>
            <button className="PaymentCondition-form-button" type="submit">Cadastrar</button>
          </form>
        </div>      
      </main>
        <Footer />
      </body>
    </>
  );
};

export default PaymentConditionForm;
