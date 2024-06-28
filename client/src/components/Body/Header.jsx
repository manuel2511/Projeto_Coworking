import React from "react";



const Header = () => {
  return (
    <>
      <header id="header" class="header fixed-top d-flex align-items-center">
        <div class="d-flex align-items-center justify-content-between">
          <a href="/" class="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span class="d-none d-lg-flex">COWORKING SPACE</span>
          </a>
          <i class="bi bi-list toggle-sidebar-btn"></i>
        </div>
        {/* <!-- End Logo --> */}

        <nav class="header-nav ms-auto">
          <ul class="d-flex align-items-center">

            <li class="nav-item dropdown pe-3">
              <a
                class="nav-link nav-profile d-flex align-items-center pe-0"
                href="/"
                data-bs-toggle="dropdown"
              >
                <img
                  //assets/img/profile-img.jpg" passar a foto por referencia da imagem  
                  src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" 
                  alt="Foto do Usuario"
                  class="rounded-circle"
                />
                <span class="d-none d-md-block dropdown-toggle ps-2">
                  Admin
                </span>
              </a>

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                  <h6>Administrador</h6>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <a
                    class="dropdown-item d-flex align-items-center"
                    href="/"
                  >
                    <i class="bi bi-person"></i>
                    <span>Meu perfil</span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <a
                    class="dropdown-item d-flex align-items-center"
                    href="/"
                  >
                    <i class="bi bi-gear"></i>
                    <span>Configurações</span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <a
                    class="dropdown-item d-flex align-items-center"
                    href="/"
                  >
                    <i class="bi bi-question-circle"></i>
                    <span>Ajuda?</span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <a class="dropdown-item d-flex align-items-center" href="/login">
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Logof</span>
                  </a>
                </li>
              </ul>
              {/* <!-- End Profile Dropdown Items --> */}
            </li>
            {/* <!-- End Profile Nav --> */}
          </ul>
        </nav>
        {/* <!-- End Icons Navigation --> */}
      </header>
    </>
  );
};

export default Header;
