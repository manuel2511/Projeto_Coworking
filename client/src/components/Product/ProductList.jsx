import React, { useEffect, useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllProducts } from "../../services/productService";
import editImage from '../../assets/img/edit.png'; // Importação da imagem de edição
import './productList.css';  // Importação do css

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        alert("Erro ao buscar produtos");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <NavBar />
      <main id="main" className="main">
        <div className="">
          <h1>Listar Produtos</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Movimentação</li>
              <li className="breadcrumb-item active">Listar Produtos</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}
        <div className='product-table-container'>
          <table className='product-table-content'>
            <thead>
              <tr>
                <th className="col-id">ID</th>
                <th className="col-name">Nome</th>
                <th className="col-observation">Observação</th>
                <th className="col-photo">Foto</th>
                <th className="col-rate">Taxa</th>
                <th className="col-edit">Editar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="col-id">{product.id}</td>
                  <td className="col-name">{product.name}</td>
                  <td className="col-observation">{product.observation}</td>
                  <td className="col-photo">
                    <img src={product.photo} alt={product.name} width="50"/>
                  </td>
                  <td className="col-rate">{product.hourlyRate}</td>
                  {/* Botão para fazer a edição dos produtos */}
                  <td>
                    <button className="product-edit-button" /*onClick={() => handleEdit(product.id)}*/ >
                      <img src={editImage}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductList;
