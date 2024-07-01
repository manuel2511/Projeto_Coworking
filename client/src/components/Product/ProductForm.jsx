import React, { useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { createProduct } from "../../services/productService";
import './productForm.css';  // Importação do css

const ProductForm = () => {
  const [name, setName] = useState("");
  const [observation, setObservation] = useState("");
  const [photo, setPhoto] = useState(null); // Para armazenar o arquivo de imagem
  const [hourlyRate, setHourlyRate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("observation", observation);
      formData.append("photo", photo); // Adiciona o arquivo de imagem ao FormData
      formData.append("hourlyRate", hourlyRate);

      await createProduct(formData);
      alert("Produto cadastrado com sucesso!");
      setName("");
      setObservation("");
      setPhoto(null); // Limpa o estado da foto após o envio
      setHourlyRate("");
    } catch (error) {
      alert("Erro ao cadastrar produto");
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file); // Define o arquivo selecionado como estado da foto
  };

  return (
    <>
      <Header />
      <NavBar />
      <main id="main" className="main">
        <div className="breadcrumb-container">
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
          <form onSubmit={handleSubmit} className="product-form-grid">
            {/* Lado esquerdo - campo de texto */}
            <div className="product-form-left">
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
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  required
                />
                <label>Valor por Hora:</label>
              </div>
            </div>
            {/* Lado direito - área da imagem */}
            <div className="product-form-right">
              <div className="product-preview-container">
                {photo ? (
                  <img
                    className="product-preview-image"
                    src={URL.createObjectURL(photo)}
                    alt="Preview"
                  />
                ) : (
                  <div className="product-preview-placeholder">
                    <i className="bx bxs-cloud-upload icon"></i>
                    <p>Selecione uma imagem</p>
                  </div>
                )}
              </div>
              <div className="product-form-group-image">
                <input
                  type="file" // Alterado para type="file"
                  onChange={handlePhotoChange} // Função para lidar com a seleção de arquivo
                  accept="image/*" // Aceitar apenas imagens
                />
              </div>
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
