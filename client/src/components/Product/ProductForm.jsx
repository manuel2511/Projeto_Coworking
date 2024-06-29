import React, { useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { createProduct } from "../../services/productService";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [observation, setObservation] = useState("");
  const [photo, setPhoto] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createProduct(name, observation, photo, hourlyRate);
      alert("Produto cadastrado com sucesso!");
      setName("");
      setObservation("");
      setPhoto("");
      setHourlyRate("");
    } catch (error) {
      alert("Erro ao cadastrar produto");
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
            <div>
              <label>Observação:</label>
              <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>Foto:</label>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>
            <div>
              <label>Valor por Hora:</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
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

export default ProductForm;
