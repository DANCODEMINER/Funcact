function fetchBTCCounter() {
  const email = sessionStorage.getItem("email");
  if (!email) return;

  fetch("/user/btc-counter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("btc-counter").innerText = data.counter + " BTC";
    })
    .catch(() => console.error("Failed to fetch BTC counter"));
}

function fetchTotalHashrate() {
  const email = sessionStorage.getItem("email");
  if (!email) return;

  fetch("/user/total-hashrate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("total-hashrate").innerText = data.hashrate + " Th/s";
    })
    .catch(() => console.error("Failed to fetch total hashrate"));
}

function fetchTotalMined() {
  const email = sessionStorage.getItem("email");
  if (!email) return;

  fetch("/user/total-mined", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("total-mined").innerText = data.total_mined + " BTC";
    })
    .catch(() => console.error("Failed to fetch total mined"));
}

function fetchTotalWithdrawn() {
  const email = sessionStorage.getItem("email");
  if (!email) return;

  fetch("/user/total-withdrawn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("total-withdrawn").innerText = data.total_withdrawn + " BTC";
    })
    .catch(() => console.error("Failed to fetch total withdrawn"));
}

function fetchActiveSessions() {
  const email = sessionStorage.getItem("email");
  if (!email) return;

  fetch("/user/active-sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("active-sessions").innerText = data.count;
    })
    .catch(() => console.error("Failed to fetch active sessions"));
}

function fetchNextWithdrawalDate() {
  const email = sessionStorage.getItem("email");
  if (!email) return;

  fetch("/user/next-withdrawal-date", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("next-withdrawal-date").innerText = data.next_date;
    })
    .catch(() => console.error("Failed to fetch next withdrawal date"));
}

function loadDashboardMessages() {
  const email = sessionStorage.getItem("email");
  if (!email) return;

  fetch("/user/dashboard-messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("dashboard-messages");
      container.innerHTML = "";
      data.messages.forEach(msg => {
        container.innerHTML += `<p>${msg}</p>`;
      });
    })
    .catch(() => console.error("Failed to load dashboard messages"));
}

function fetchMyRank() {
  const email = sessionStorage.getItem("email");
  if (!email) return;

  fetch("/user/my-rank", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("my-rank").innerText = data.rank;
    })
    .catch(() => console.error("Failed to fetch my rank"));
}

function fetchMyBTC() {
  const email = sessionStorage.getItem("email");
  if (!email) return;

  fetch("/user/my-btc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("my-btc").innerText = data.btc + " BTC";
    })
    .catch(() => console.error("Failed to fetch my BTC"));
}

function fetchMyHashrate() {
  const email = sessionStorage.getItem("email");
  if (!email) return;

  fetch("/user/my-hashrate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("my-hashrate").innerText = data.hashrate;
    })
    .catch(() => console.error("Failed to fetch my hashrate"));
}
