import React, { useEffect, useState } from 'react';
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllPaymentConditions } from '../../services/paymentConditionService';
import editImage from '../../assets/img/edit.png';
import deleteImage from '../../assets/img/2lixeira.png';
import "./PaymentConditionList.css";

const PaymentConditionList = () => {
  const [paymentConditions, setPaymentConditions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPaymentConditions();
        setPaymentConditions(response.data);
      } catch (error) {
        alert('Erro ao buscar condições de pagamento');
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
          <div className="breadcrumb-container">
            <h1>Formas de Pagamentos</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">Movimentações</li>
                <li className="breadcrumb-item active">Formas de Pagamento</li>
              </ol>
            </nav>
          </div>
    
          {/* <!-- End Page Title --> */}
          <div className='paymentConditions-table-container'>
            <table className='paymentConditions-table-content'>
              <thead>
                <tr>
                  <th className="col-id">ID</th>
                  <th className="col-name">Forma de Pagamento</th>
                  <th className="col-edit">Editar</th>
                  <th className="col-delete">Deletar</th>
                </tr>
              </thead>
              <tbody>
                {paymentConditions.map((paymentConditions) => (
                  <tr key={paymentConditions.id}>
                    <td className="col-id">{paymentConditions.id}</td>
                    <td className="col-name">{paymentConditions.name}</td>
                    {/* Botão para editar e deletar os produtos */}
                    <td>
                      <button className="paymentConditions-edit-button" /*onClick={() => handleEdit(paymentConditions.id)}*/ >
                        <img src={editImage}/>
                      </button>
                    </td>
                    <td>
                      <button className="paymentConditions-delete-button" /*onClick={() => handleDelete(paymentConditions.id)}*/ >
                        <img src={deleteImage}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <Footer />
      </body>
    </>
  );
};

export default PaymentConditionList;


