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
  getMonitors();
  TimerInterval();
  LavalinkInterval();
};

/* Navbar */
let open = false;
let page = localStorage.getItem("page") || "home";
let monitors = [];
let monitors_ = [];
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

function updateMonitors() {
  let div = document.querySelector(".monitors");
  monitors.map((data) => {
    let ele = document.createElement("div");
    let h = document.createElement("p");
    ele.classList.add("monitor");
    h.classList.add("monitor-head");
    h.innerText = data.category;

    ele.appendChild(h);

    data.monitors.map((data) => {
      let t = document.createElement("p");

      t.innerText = `» ${data.name} [${data.status}] - ${data.response}ms (${data.uptime}%)`;
      t.style.color = data.status === "🟢" ? "#00ff0a" : "#ff001b";
      ele.appendChild(t);
    });

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

  updateLavalink();

  axios
    .get("http://t-us.odd.gay:25994/api/v1/stats/lavalink")
    .then((res) => {
      lavalinkStats = res.data;

      updateLavalink();
    })
    .catch((e) => console.error(e));
}

function getMonitors() {
  monitors = [
    {
      ID: "714459d68bd25689efae832813de4828",
      AgentID: "",
      Type: "Ping",
      Name: "France",
      Protocol: "",
      Port: "0",
      Target: "164.132.74.251",
      Keyword: "",
      Category: "Reverse proxy",
      Method: "",
      Timeout: "5",
      Check_Frequency: "1",
      Max_Redirects: "0",
      Fails_Before_Alert: "3",
      Failed_Locations_Before_Alert: "3",
      Alert_After: "0",
      Repeat_Times: "0",
      Repeat_Every: "0",
      Verify_SSL_Cert: false,
      Verify_SSL_Host: false,
      SSL_Expiration_Date: null,
      Domain_Expiration_Date: null,
      Notify_Contact_List: null,
      Public: true,
      Show_Target: false,
      Status: "Active",
      Add_Date: 1678315697,
      Last_Check: 1678359037,
      Last_Status_Change: 1678315714,
      Uptime_Status: "Online",
      Uptime_Stats: {
        Total: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        Year: {
          2023: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        },
        Month: {
          "2023-03": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
        Day: {
          "2023-03-09": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
      },
      Response_Time: {
        New_York: "86",
        San_Francisco: "134",
        London: "9",
        Dallas: "121",
      },
      Average_Response_Time: {
        New_York: "79",
        San_Francisco: "145",
        London: "6",
        Dallas: "113",
      },
      Report_Links: {
        Report_Link:
          "https://hetrixtools.com/report/uptime/714459d68bd25689efae832813de4828/",
        WhiteLabel_Report_Link:
          "https://status.jirayu.fun/report/uptime/714459d68bd25689efae832813de4828/",
        API_Report_Link:
          "https://api.hetrixtools.com/v1/845f8e2878d37bbb9e2d4d5e985e2977/uptime/report/714459d68bd25689efae832813de4828/",
      },
    },
    {
      ID: "0a971364c02fcbc96057c88f2c417ded",
      AgentID: "",
      Type: "Service",
      Name: "Client Server",
      Protocol: "",
      Port: "25994",
      Target: "172.104.196.108",
      Keyword: "",
      Category: "MV Core",
      Method: "",
      Timeout: "5",
      Check_Frequency: "1",
      Max_Redirects: "0",
      Fails_Before_Alert: "3",
      Failed_Locations_Before_Alert: "3",
      Alert_After: "0",
      Repeat_Times: "0",
      Repeat_Every: "0",
      Verify_SSL_Cert: false,
      Verify_SSL_Host: false,
      SSL_Expiration_Date: null,
      Domain_Expiration_Date: null,
      Notify_Contact_List: null,
      Public: true,
      Show_Target: false,
      Status: "Active",
      Add_Date: 1678315657,
      Last_Check: 1678359029,
      Last_Status_Change: 1678315705,
      Uptime_Status: "Online",
      Uptime_Stats: {
        Total: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        Year: {
          2023: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        },
        Month: {
          "2023-03": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
        Day: {
          "2023-03-09": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
      },
      Response_Time: {
        New_York: "36",
        San_Francisco: "27",
        London: "103",
        Dallas: "2",
      },
      Average_Response_Time: {
        New_York: "42",
        San_Francisco: "41",
        London: "107",
        Dallas: "15",
      },
      Report_Links: {
        Report_Link:
          "https://hetrixtools.com/report/uptime/0a971364c02fcbc96057c88f2c417ded/",
        WhiteLabel_Report_Link:
          "https://status.jirayu.fun/report/uptime/0a971364c02fcbc96057c88f2c417ded/",
        API_Report_Link:
          "https://api.hetrixtools.com/v1/845f8e2878d37bbb9e2d4d5e985e2977/uptime/report/0a971364c02fcbc96057c88f2c417ded/",
      },
    },
    {
      ID: "5044cd81ad70ebdc66332c0024ebf63c",
      AgentID: "",
      Type: "Service",
      Name: "API Server",
      Protocol: "",
      Port: "25994",
      Target: "172.104.196.108",
      Keyword: "",
      Category: "MV Core",
      Method: "",
      Timeout: "5",
      Check_Frequency: "1",
      Max_Redirects: "0",
      Fails_Before_Alert: "3",
      Failed_Locations_Before_Alert: "3",
      Alert_After: "0",
      Repeat_Times: "0",
      Repeat_Every: "0",
      Verify_SSL_Cert: false,
      Verify_SSL_Host: false,
      SSL_Expiration_Date: null,
      Domain_Expiration_Date: null,
      Notify_Contact_List: null,
      Public: true,
      Show_Target: false,
      Status: "Active",
      Add_Date: 1678315654,
      Last_Check: 1678358984,
      Last_Status_Change: 1678315658,
      Uptime_Status: "Online",
      Uptime_Stats: {
        Total: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        Year: {
          2023: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        },
        Month: {
          "2023-03": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
        Day: {
          "2023-03-09": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
      },
      Response_Time: {
        New_York: "42",
        San_Francisco: "35",
        London: "111",
        Dallas: "2",
      },
      Average_Response_Time: {
        New_York: "40",
        San_Francisco: "36",
        London: "109",
        Dallas: "11",
      },
      Report_Links: {
        Report_Link:
          "https://hetrixtools.com/report/uptime/5044cd81ad70ebdc66332c0024ebf63c/",
        WhiteLabel_Report_Link:
          "https://status.jirayu.fun/report/uptime/5044cd81ad70ebdc66332c0024ebf63c/",
        API_Report_Link:
          "https://api.hetrixtools.com/v1/845f8e2878d37bbb9e2d4d5e985e2977/uptime/report/5044cd81ad70ebdc66332c0024ebf63c/",
      },
    },
    {
      ID: "c992dd7693873e04d5494b4f6b2f51e4",
      AgentID: "",
      Type: "Service",
      Name: "Core 1",
      Protocol: "",
      Port: "25994",
      Target: "172.104.196.108",
      Keyword: "",
      Category: "MV Core",
      Method: "",
      Timeout: "5",
      Check_Frequency: "1",
      Max_Redirects: "0",
      Fails_Before_Alert: "3",
      Failed_Locations_Before_Alert: "3",
      Alert_After: "0",
      Repeat_Times: "0",
      Repeat_Every: "0",
      Verify_SSL_Cert: false,
      Verify_SSL_Host: false,
      SSL_Expiration_Date: null,
      Domain_Expiration_Date: null,
      Notify_Contact_List: null,
      Public: true,
      Show_Target: false,
      Status: "Active",
      Add_Date: 1678315649,
      Last_Check: 1678359034,
      Last_Status_Change: 1678315653,
      Uptime_Status: "Online",
      Uptime_Stats: {
        Total: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        Year: {
          2023: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        },
        Month: {
          "2023-03": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
        Day: {
          "2023-03-09": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
      },
      Response_Time: {
        New_York: "42",
        San_Francisco: "50",
        London: "107",
        Dallas: "2",
      },
      Average_Response_Time: {
        New_York: "41",
        San_Francisco: "41",
        London: "107",
        Dallas: "2",
      },
      Report_Links: {
        Report_Link:
          "https://hetrixtools.com/report/uptime/c992dd7693873e04d5494b4f6b2f51e4/",
        WhiteLabel_Report_Link:
          "https://status.jirayu.fun/report/uptime/c992dd7693873e04d5494b4f6b2f51e4/",
        API_Report_Link:
          "https://api.hetrixtools.com/v1/845f8e2878d37bbb9e2d4d5e985e2977/uptime/report/c992dd7693873e04d5494b4f6b2f51e4/",
      },
    },
    {
      ID: "4b1a3d279456e671ee50bc2f45ed3821",
      AgentID: "",
      Type: "Ping",
      Name: "Canada",
      Protocol: "",
      Port: "0",
      Target: "192.95.42.75",
      Keyword: "",
      Category: "Reverse proxy",
      Method: "",
      Timeout: "5",
      Check_Frequency: "1",
      Max_Redirects: "0",
      Fails_Before_Alert: "3",
      Failed_Locations_Before_Alert: "3",
      Alert_After: "0",
      Repeat_Times: "0",
      Repeat_Every: "0",
      Verify_SSL_Cert: false,
      Verify_SSL_Host: false,
      SSL_Expiration_Date: null,
      Domain_Expiration_Date: null,
      Notify_Contact_List: null,
      Public: true,
      Show_Target: false,
      Status: "Active",
      Add_Date: 1678315693,
      Last_Check: 1678359040,
      Last_Status_Change: 1678315715,
      Uptime_Status: "Online",
      Uptime_Stats: {
        Total: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        Year: {
          2023: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        },
        Month: {
          "2023-03": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
        Day: {
          "2023-03-09": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
      },
      Response_Time: {
        New_York: "9",
        San_Francisco: "80",
        London: "76",
        Dallas: "48",
      },
      Average_Response_Time: {
        New_York: "11",
        San_Francisco: "75",
        London: "80",
        Dallas: "42",
      },
      Report_Links: {
        Report_Link:
          "https://hetrixtools.com/report/uptime/4b1a3d279456e671ee50bc2f45ed3821/",
        WhiteLabel_Report_Link:
          "https://status.jirayu.fun/report/uptime/4b1a3d279456e671ee50bc2f45ed3821/",
        API_Report_Link:
          "https://api.hetrixtools.com/v1/845f8e2878d37bbb9e2d4d5e985e2977/uptime/report/4b1a3d279456e671ee50bc2f45ed3821/",
      },
    },
    {
      ID: "52c573e69b9e47b05e049a4768dd44b7",
      AgentID: "",
      Type: "Ping",
      Name: "Server 1",
      Protocol: "",
      Port: "587",
      Target: "smtp.gmail.com",
      Keyword: "",
      Category: "Mail server",
      Method: "",
      Timeout: "5",
      Check_Frequency: "1",
      Max_Redirects: "0",
      Fails_Before_Alert: "3",
      Failed_Locations_Before_Alert: "3",
      Alert_After: "0",
      Repeat_Times: "0",
      Repeat_Every: "0",
      Verify_SSL_Cert: false,
      Verify_SSL_Host: false,
      SSL_Expiration_Date: null,
      Domain_Expiration_Date: "2023-08-12",
      Notify_Contact_List: null,
      Public: true,
      Show_Target: false,
      Status: "Active",
      Add_Date: 1678315703,
      Last_Check: 1678359030,
      Last_Status_Change: 1678315719,
      Uptime_Status: "Online",
      Uptime_Stats: {
        Total: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        Year: {
          2023: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        },
        Month: {
          "2023-03": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
        Day: {
          "2023-03-09": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
      },
      Response_Time: {
        New_York: "15",
        San_Francisco: "32",
        London: "62",
        Dallas: "17",
      },
      Average_Response_Time: {
        New_York: "27",
        San_Francisco: "32",
        London: "47",
        Dallas: "32",
      },
      Report_Links: {
        Report_Link:
          "https://hetrixtools.com/report/uptime/52c573e69b9e47b05e049a4768dd44b7/",
        WhiteLabel_Report_Link:
          "https://status.jirayu.fun/report/uptime/52c573e69b9e47b05e049a4768dd44b7/",
        API_Report_Link:
          "https://api.hetrixtools.com/v1/845f8e2878d37bbb9e2d4d5e985e2977/uptime/report/52c573e69b9e47b05e049a4768dd44b7/",
      },
    },
    {
      ID: "a1dabf6bc437f25330bc1e191e230ee4",
      AgentID: "",
      Type: "Service",
      Name: "UK - 01",
      Protocol: "",
      Port: "1273",
      Target: "uk-01.jirayu.fun",
      Keyword: "",
      Category: "Lavalinks",
      Method: "",
      Timeout: "5",
      Check_Frequency: "1",
      Max_Redirects: "0",
      Fails_Before_Alert: "3",
      Failed_Locations_Before_Alert: "3",
      Alert_After: "0",
      Repeat_Times: "0",
      Repeat_Every: "0",
      Verify_SSL_Cert: false,
      Verify_SSL_Host: false,
      SSL_Expiration_Date: null,
      Domain_Expiration_Date: "2023-08-24",
      Notify_Contact_List: { Name: "WH", Emails: [""] },
      Public: true,
      Show_Target: false,
      Status: "Active",
      Add_Date: 1678315670,
      Last_Check: 1678359037,
      Last_Status_Change: 1678315717,
      Uptime_Status: "Online",
      Uptime_Stats: {
        Total: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        Year: {
          2023: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        },
        Month: {
          "2023-03": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
        Day: {
          "2023-03-09": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
      },
      Response_Time: {
        New_York: "164",
        San_Francisco: "212",
        London: "81",
        Dallas: "227",
      },
      Average_Response_Time: {
        New_York: "196",
        San_Francisco: "285",
        London: "102",
        Dallas: "235",
      },
      Report_Links: {
        Report_Link:
          "https://hetrixtools.com/report/uptime/a1dabf6bc437f25330bc1e191e230ee4/",
        WhiteLabel_Report_Link:
          "https://status.jirayu.fun/report/uptime/a1dabf6bc437f25330bc1e191e230ee4/",
        API_Report_Link:
          "https://api.hetrixtools.com/v1/845f8e2878d37bbb9e2d4d5e985e2977/uptime/report/a1dabf6bc437f25330bc1e191e230ee4/",
      },
    },
    {
      ID: "d4ff4ecbabe1815351c82cd304c264f2",
      AgentID: "",
      Type: "Service",
      Name: "UK - 02",
      Protocol: "",
      Port: "1404",
      Target: "uk-02.jirayu.fun",
      Keyword: "",
      Category: "Lavalinks",
      Method: "",
      Timeout: "5",
      Check_Frequency: "1",
      Max_Redirects: "0",
      Fails_Before_Alert: "3",
      Failed_Locations_Before_Alert: "3",
      Alert_After: "0",
      Repeat_Times: "0",
      Repeat_Every: "0",
      Verify_SSL_Cert: false,
      Verify_SSL_Host: false,
      SSL_Expiration_Date: null,
      Domain_Expiration_Date: "2023-08-24",
      Notify_Contact_List: { Name: "WH", Emails: [""] },
      Public: true,
      Show_Target: false,
      Status: "Active",
      Add_Date: 1678315662,
      Last_Check: 1678359040,
      Last_Status_Change: 1678315720,
      Uptime_Status: "Online",
      Uptime_Stats: {
        Total: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        Year: {
          2023: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        },
        Month: {
          "2023-03": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
        Day: {
          "2023-03-09": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
      },
      Response_Time: {
        New_York: "160",
        San_Francisco: "219",
        London: "104",
        Dallas: "211",
      },
      Average_Response_Time: {
        New_York: "181",
        San_Francisco: "250",
        London: "99",
        Dallas: "221",
      },
      Report_Links: {
        Report_Link:
          "https://hetrixtools.com/report/uptime/d4ff4ecbabe1815351c82cd304c264f2/",
        WhiteLabel_Report_Link:
          "https://status.jirayu.fun/report/uptime/d4ff4ecbabe1815351c82cd304c264f2/",
        API_Report_Link:
          "https://api.hetrixtools.com/v1/845f8e2878d37bbb9e2d4d5e985e2977/uptime/report/d4ff4ecbabe1815351c82cd304c264f2/",
      },
    },
    {
      ID: "7db7314270cdefeb23305c32af4bffaf",
      AgentID: "",
      Type: "Service",
      Name: "UK - 03",
      Protocol: "",
      Port: "2269",
      Target: "uk-03.jirayu.fun",
      Keyword: "",
      Category: "Lavalinks",
      Method: "",
      Timeout: "5",
      Check_Frequency: "1",
      Max_Redirects: "0",
      Fails_Before_Alert: "3",
      Failed_Locations_Before_Alert: "3",
      Alert_After: "0",
      Repeat_Times: "0",
      Repeat_Every: "0",
      Verify_SSL_Cert: false,
      Verify_SSL_Host: false,
      SSL_Expiration_Date: null,
      Domain_Expiration_Date: "2023-08-24",
      Notify_Contact_List: { Name: "WH", Emails: [""] },
      Public: true,
      Show_Target: false,
      Status: "Active",
      Add_Date: 1678315666,
      Last_Check: 1678358983,
      Last_Status_Change: 1678315723,
      Uptime_Status: "Online",
      Uptime_Stats: {
        Total: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        Year: {
          2023: { Uptime: "100.0000", Uptime_Incl_Maintenance: "100.0000" },
        },
        Month: {
          "2023-03": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
        Day: {
          "2023-03-09": {
            Uptime: "100.0000",
            Uptime_Incl_Maintenance: "100.0000",
          },
        },
      },
      Response_Time: {
        New_York: "154",
        San_Francisco: "190",
        London: "92",
        Dallas: "230",
      },
      Average_Response_Time: {
        New_York: "200",
        San_Francisco: "277",
        London: "102",
        Dallas: "226",
      },
      Report_Links: {
        Report_Link:
          "https://hetrixtools.com/report/uptime/7db7314270cdefeb23305c32af4bffaf/",
        WhiteLabel_Report_Link:
          "https://status.jirayu.fun/report/uptime/7db7314270cdefeb23305c32af4bffaf/",
        API_Report_Link:
          "https://api.hetrixtools.com/v1/845f8e2878d37bbb9e2d4d5e985e2977/uptime/report/7db7314270cdefeb23305c32af4bffaf/",
      },
    },
  ];

  monitors_ = [...new Set(monitors.map((data) => formatString(data.Category)))];
  monitors = monitors_.map((c) => {
    let getMonitors = monitors
      .filter((x) => formatString(x.Category.toLowerCase()) === c)
      .map((monitor) => {
        return {
          name: monitor.Name,
          response:
            monitor.Response_Time.London || monitor.Response_Time.New_York,
          uptime: monitor.Uptime_Stats.Total.Uptime,
          status:
            monitor.Status === "Online"
              ? "🟢"
              : monitor.Uptime_Status === "Online"
              ? "🟢"
              : "🔴",
        };
      });

    return {
      category: formatString(c),
      monitors: getMonitors,
    };
  });

  monitors.sort(function (a, b) {
    if (a.category < b.category) {
      return -1;
    }
    if (a.category > b.category) {
      return 1;
    }
    return 0;
  });

  updateMonitors();
}

function formatString(str) {
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}

function TimerInterval() {
  setInterval(() => updateTime(), 1000);
}

function LavalinkInterval() {
  setInterval(() => {
    getLavalinkStats();
  }, 60000);
}