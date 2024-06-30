import React, { useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { createProduct } from "../../services/productService";
import './productForm.css';  // Importação do css

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
      <Header />
      <NavBar />
      <main id="main" className="main">
        <div className="">
          <h1>Produtos</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Cadastro</li>
              <li className="breadcrumb-item active">Produtos</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}
        <div className="product-form-container">
          <form onSubmit={handleSubmit}>
            <div className="product-form-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Nome:</label>
            </div>
            <div className="product-form-group">
              <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              ></textarea>
              <label>Observação:</label>
            </div>
            <div className="product-form-group">
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
              <label>Foto:</label>
            </div>
            <div className="product-form-group">
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                required
              />
              <label>Valor por Hora:</label>
            </div>
            <button className="product-form-button" type="submit">Cadastrar</button>
          </form>
        </div>      
      </main>
      <Footer />
    </>
  );
};

export default ProductForm;
