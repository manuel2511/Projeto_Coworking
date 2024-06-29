import React, { useState, useEffect } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { createReservation } from "../../services/reservationService";
import { getAllProducts } from "../../services/productService";

const ReservationForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  const handleAddProduct = (productId, hoursReserved) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProducts([...selectedProducts, { ...product, hoursReserved }]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createReservation(selectedProducts, paymentMethod);
      alert("Reserva cadastrada com sucesso!");
      setSelectedProducts([]);
      setPaymentMethod("");
    } catch (error) {
      alert("Erro ao cadastrar reserva");
    }
  };

  return (
    <>
      <body className="">
        <Header />
        <NavBar />
        <main id="main" className="main">
          <div className="">
            <h1>Reservas</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">Cadastros</li>
                <li className="breadcrumb-item active">Reservas</li>
              </ol>
            </nav>
          </div>
          {/* <!-- End Page Title --> */}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Método de Pagamento:</label>
              <input
                type="text"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Produtos:</label>
              <ul>
                {products.map((product) => (
                  <li key={product.id}>
                    {product.name} - {product.hourlyRate} por hora
                    <input
                      type="number"
                      placeholder="Horas reservadas"
                      onBlur={(e) =>
                        handleAddProduct(product.id, parseInt(e.target.value))
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
            <button type="submit">Cadastrar Reserva</button>
          </form>
        </main>
        <Footer />
      </body>
    </>
  );
};

export default ReservationForm;
