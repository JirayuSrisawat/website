class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<header>
      <div class="nav-container" style="z-index: 5;">
        <div class="navbar">
          <div class="logo"><a href="/">Jirayu!</a></div>
          <span onclick="handleNavbar();" class="bar"><i class="fas fa-bars"></i></span>
          <nav style="top: -760px;">
            <ul>
              <li onclick='navValue("home")'>Home</li>
              <li onclick='navValue("projects")'>Projects</li>
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
    this.innerHTML = `<footer id="#footer" style="display: fixed;">
      <div class="footer">&copy; Jirayu! | 2023 - ${new Date().getFullYear()}</div>
      <div class="timer"></div>
    </footer>`;
  }
}

customElements.define("navbar-component", Navbar);
customElements.define("footer-component", Footer);

window.onload = function () {
  updatePage();
  updateTime();
  TimerInterval();
};

/* Navbar */
let open = false;
let page = localStorage.getItem("page") || "home";
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
    ? (nav.style.top = "50px")
    : (nav.style.top = "-760px");
  open ? handleClose() : handleOpen();

  open = !open;
}

function navValue(value) {
  localStorage.setItem("page", value);
  page = value;
  updatePage();
}

function updatePage() {
  if (page === "home") {
    document.querySelector("#projects").style.display = "none";
    document.querySelector("#home").style.display = "block";
  }

  if (page === "projects") {
    document.querySelector("#home").style.display = "none";
    document.querySelector("#projects").style.display = "block";
  }
}

function updateTime() {
  let date = new Date();
  document.querySelector(".timer").innerText = `${
    date.getHours() < 10 ? "0" : ""
  }${date.getHours()}:${
    date.getMinutes() < 10 ? "0" : ""
  }${date.getMinutes()}:${
    date.getSeconds() < 10 ? "0" : ""
  }${date.getSeconds()}`;
}

function formatString(str) {
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}

function TimerInterval() {
  setInterval(() => updateTime(), 1000);
}

let hidEle = document.querySelectorAll(".hidden");
let obs = new IntersectionObserver((entries) => {
  entries.map((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.classList.add("show");
    } else entry.classList.remove("show");
  });
});

hidEle.forEach((el) => obs.observe(el));
