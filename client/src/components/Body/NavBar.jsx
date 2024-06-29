import React from "react";

const NavBar = () => {
  return (
    <>
      <aside id="sidebar" class="sidebar">
        <ul class="sidebar-nav" id="sidebar-nav">
          <li class="nav-item">
            <a class="nav-link collapsed" href="/">
              <i class="bi bi-grid"></i>
              <span>Dashboard</span>
            </a>
          </li>
          {/* <!-- End Dashboard Nav --> */}


          <li class="nav-item">
            <a
              class="nav-link collapsed"
              data-bs-target="#forms-nav"
              data-bs-toggle="collapse"
              href="/"
            >
              <i class="bi bi-journal-text"></i>
              <span>Cadastro</span>
              <i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="forms-nav"
              class="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a href="/">
                  <i class="bi bi-circle"></i>
                  <span>Produtos</span>
                </a>
              </li>
              <li>
                <a href="/cadastroPagamento">
                  <i class="bi bi-circle"></i>
                  <span>Condição de Pagamento</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <i class="bi bi-circle"></i>
                  <span>Reservas</span>
                </a>
              </li>
            </ul>
          </li>

          {/* <!-- End Forms Nav --> */}

          <li class="nav-item">
            <a
              class="nav-link collapsed"
              data-bs-target="#tables-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i class="bi bi-layout-text-window-reverse"></i>
              <span>Movimentações</span>
              <i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="tables-nav"
              class="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a href="/">
                  <i class="bi bi-circle"></i>
                  <span>Listagem de Reseras</span>
                </a>
              </li>
              <li>
                <a href="/listaPagamento">
                  <i class="bi bi-circle"></i>
                  <span>Listar Formas de Pagamento</span>
                </a>
              </li>
            </ul>
          </li>
          {/* <!-- End Tables Nav --> */}

          <li class="nav-item">
            <a
              class="nav-link collapsed"
              data-bs-target="#charts-nav"
              data-bs-toggle="collapse"
              href="/"
            >
              <i class="bi bi-file-earmark"></i>
              <span>Relatórios</span>
              <i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="charts-nav"
              class="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a href="/">
                  <i class="bi bi-circle"></i>
                  <span>Reservas</span>
                </a>
              </li>
            </ul>
          </li>
          {/* <!-- End Charts Nav --> */}

          {/* <!-- End Register Page Nav --> */}

          <li class="nav-item">
            <a class="nav-link collapsed" href="/login">
              <i class="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </a>
          </li>
          {/* <!-- End Login Page Nav --> */}
        </ul>
      </aside>
      {/* <!-- End Sidebar--> */}
    </>
  );
};

export default NavBar;
