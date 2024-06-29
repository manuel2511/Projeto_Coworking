import React, { useEffect, useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllProducts } from "../../services/productService";

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
      <body className="">
        <Header />
        <NavBar />
        <main id="main" className="main">
          <div className="">
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
          <div>
            <h2>Produtos</h2>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  {product.name} - {product.observation} - {product.photo} -{" "}
                  {product.hourlyRate}
                </li>
              ))}
            </ul>
          </div>
        </main>
        <Footer />
      </body>
    </>
  );
};

export default ProductList;
