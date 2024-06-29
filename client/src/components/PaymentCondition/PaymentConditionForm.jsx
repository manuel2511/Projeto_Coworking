import React, { useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { createPaymentCondition } from "../../services/paymentConditionService";

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
      alert("Erro ao cadastrar condição de pagamento");
    }
  };

  return (
    <>
      <body className="">
        <Header />
        <NavBar />
        <main id="main" className="main">
          <div class="">
            <h1>Formas de Pagamentos</h1>
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li class="breadcrumb-item">Cadastros</li>
                <li class="breadcrumb-item active">Condição de Pagamento</li>
              </ol>
            </nav>
          </div>
          {/* <!-- End Page Title --> */}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </main>
        <Footer />
      </body>
    </>
  );
};

export default PaymentConditionForm;
