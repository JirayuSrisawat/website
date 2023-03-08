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
              <li onclick='navValue("stats")'>Stats</li>
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
  getLavalinkStats();
  TimerInterval();
  LavalinkInterval();
};

/* Navbar */
let open = false;
let page = localStorage.getItem("page") || "home";
let lastData = JSON.parse(JSON.stringify(localStorage.getItem("data") || {}));
let lavalinkStats = [];
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
    document.querySelector("#stats").style.display = "none";
    document.querySelector("#home").style.display = "block";
  }

  if (page === "projects") {
    document.querySelector("#home").style.display = "none";
    document.querySelector("#stats").style.display = "none";
    document.querySelector("#projects").style.display = "block";
  }

  if (page === "stats") {
    document.querySelector("#home").style.display = "none";
    document.querySelector("#projects").style.display = "none";
    document.querySelector("#stats").style.display = "block";
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

function updateLavalink() {
  let div = document.querySelector(".lavalinks");

  lavalinkStats.map((data) => {
    let ele = document.createElement("div");
    let lh = document.createElement("p");
    let lp = document.createElement("p");
    let lpp = document.createElement("p");
    let lu = document.createElement("p");
    let m = document.createElement("p");
    let cc = document.createElement("p");
    let cs = document.createElement("p");
    let cl = document.createElement("p");

    lh.innerText = data.name;
    lp.innerText = `» Players : ${data.stats.players}`;
    lpp.innerText = `» PlayingPlayers : ${data.stats.playingPlayers}`;
    lu.innerText = `» Uptime : ${data.stats.uptime}`;
    m.innerText = `» Memory : ${(data.stats.memory.used / 1024 / 1024).toFixed(
      2
    )}MB`;
    cc.innerText = `» CPU Core${data.stats.cpu.cores > 1 ? "s" : ""} : ${
      data.stats.cpu.cores
    }`;
    cs.innerText = `» CPU System load : ${data.stats.cpu.systemLoad.toFixed(
      2
    )}%`;
    cl.innerText = `» CPU Lavalink load : ${data.stats.cpu.lavalinkLoad.toFixed(
      2
    )}%`;

    lh.classList.add("lavalink-head");
    ele.classList.add("lavalink");
    lh.style.color = data.status ? "#00ff0a" : "#ff001b";
    ele.appendChild(lh);
    ele.appendChild(lp);
    ele.appendChild(lpp);
    ele.appendChild(lu);
    ele.appendChild(m);
    ele.appendChild(cc);
    ele.appendChild(cs);
    ele.appendChild(cl);
    div.appendChild(ele);
  });
}

function getLavalinkStats() {
  lavalinkStats = [
    {
      name: "MV1",
      status: true,
      stats: {
        players: 0,
        playingPlayers: 0,
        uptime: "10 days, 8 hrs, 27mins, 51secs",
        memory: {
          free: 337470024,
          used: 547528120,
          allocated: 884998144,
          reservable: 2147483648,
        },
        cpu: {
          cores: 24,
          systemLoad: 0.08781114654228737,
          lavalinkLoad: 0.000047316223786812024,
        },
      },
    },
    {
      name: "MV2",
      status: true,
      stats: {
        players: 0,
        playingPlayers: 0,
        uptime: "10 days, 8 hrs, 27mins, 43secs",
        memory: {
          free: 326615608,
          used: 595082696,
          allocated: 921698304,
          reservable: 2147483648,
        },
        cpu: {
          cores: 24,
          systemLoad: 0.08111740424306423,
          lavalinkLoad: 0.0001906504995043087,
        },
      },
    },
    {
      name: "MV3",
      status: true,
      stats: {
        players: 0,
        playingPlayers: 0,
        uptime: "10 days, 8 hrs, 27mins, 25secs",
        memory: {
          free: 229123792,
          used: 594008368,
          allocated: 823132160,
          reservable: 2147483648,
        },
        cpu: {
          cores: 24,
          systemLoad: 0.08831908831908832,
          lavalinkLoad: 0.00009439661682525298,
        },
      },
    },
  ];

  axios
    .get("http://t-us.odd.gay:25994/api/v1/stats/lavalink")
    .then((res) => {
      lavalinkStats = res.data;

      updateLavalink();
    })
    .catch((e) => alert(e));
}

function TimerInterval() {
  setInterval(() => updateTime(), 1000);
}

function LavalinkInterval() {
  setInterval(() => {
    getLavalinkStats();
  }, 60000);
}
