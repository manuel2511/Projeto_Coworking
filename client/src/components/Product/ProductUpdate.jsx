import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getProductById, updateProduct } from "../../services/productService";
import './productUpdate.css';  // Importação do CSS

const ProductUpdate = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data);
      } catch (error) {
        alert("Erro ao carregar o produto");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(productId, product);
      alert("Produto atualizado com sucesso!");
      navigate('/listaProduto');
    } catch (error) {
      alert("Erro ao atualizar o produto");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setProduct({ ...product, photo: file });
  };

  if (!product) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <NavBar />
      <main id="main" className="main">
        <div className="breadcrumb-container">
          <h1>Produto {product.id}</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Movimentação</li>
              <li className="breadcrumb-item active">Editar Produto</li>
            </ol>
          </nav>
        </div>
        <div className="update-form-container">
          <form onSubmit={handleFormSubmit} className="update-form-grid">
            <div>
              <div className="update-form-group">
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                />
                <label>Nome:</label>
              </div>
              <div className="update-form-group">
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                />
                <label>Descrição:</label>
              </div>
              <div className="update-form-group">
                <input
                  type="text"
                  name="location"
                  value={product.location}
                  onChange={handleInputChange}
                />
                <label>Localização:</label>
              </div>
              <div className="update-form-group">
                <input
                  type="number"
                  name="capacity"
                  value={product.capacity}
                  onChange={handleInputChange}
                />
                <label>Capacidade:</label>
              </div>
              <div className="update-form-group">
                <input
                  type="number"
                  name="hourlyRate"
                  value={product.hourlyRate}
                  onChange={handleInputChange}
                />
                <label>Valor por hora:</label>
              </div>
            </div>
            <div className="update-preview-group">
              <div className="update-preview-container">
                {product.photo && typeof product.photo !== "string" ? (
                  <img
                    className="update-preview-image"
                    src={URL.createObjectURL(product.photo)}
                    alt="Preview"
                  />
                ) : (
                  <div className="update-preview-placeholder">
                    <i className="bx bxs-cloud-upload icon"></i>
                    <p>Selecione uma imagem</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                onChange={handlePhotoChange}
                accept="image/*"
              />
            </div>
            <button className="update-form-button" type="submit">Atualizar Produto</button>
            <a href='/listaProduto' className='product-list-button'>Cancelar</a>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductUpdate;