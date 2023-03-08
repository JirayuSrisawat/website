class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<header>
      <div class="nav-container">
        <div class="navbar">
          <div class="logo"><a href="/">Jirayu!</a></div>
          <span onclick="handleNavbar();" class="bar"><i class="fas fa-bars"></i></span>
          <nav style="top: -760px; z-index: 5;">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="https://github.com/JirayuSrisawat">My GitHub</a></li>
              <li>
                <a href="https://github.com/SweetsNodes">Business GitHub</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>`;
  }
}

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<footer>&copy; Jirayu! | 2023 - ${new Date().getFullYear()}</footer>`;
  }
}

customElements.define("navbar-component", Navbar);
customElements.define("footer-component", Footer);

/* Navbar */
let open = false;
function handleNavbar() {
  const nav = document.querySelector("nav");
  const btn = document.querySelector(".bar i");

  let handleOpen = () => {
    btn.classList.add("fa-times");
    btn.classList.remove("fa-bars");
  };

  let handleClose = () => {
    btn.classList.add("fa-bars");
    btn.classList.remove("fa-times");
  };

  nav.style.top === "-760px"
    ? (nav.style.top = "-296px")
    : (nav.style.top = "-760px");
  open ? handleClose() : handleOpen();

  open = !open;
}
