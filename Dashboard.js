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

==watch ads start session==

  function watchAd() {
  const email = sessionStorage.getItem("email");
  if (!email) return;

  fetch("/user/watch-ad", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showToast("✅ Mining session started!");
        currentHashrate = data.hashrate; // from server
        btcPerSecond = data.btc_per_sec; // from server
        miningDuration = data.duration; // e.g., 120 sec

        startMiningCounter();
        startMiningSessionCountdown();
        fetchDashboardSummary(); // Refresh UI
      } else {
        showToast("❌ " + data.error);
      }
    })
    .catch(err => {
      console.error("Failed to start mining session", err);
      showToast("❌ Failed to start mining.");
    });
  }

let miningInterval = null;
let miningTimer = null;
let minedBTC = 0;

function startMiningCounter() {
  clearInterval(miningInterval);
  minedBTC = 0;

  miningInterval = setInterval(() => {
    minedBTC += btcPerSecond;
    document.getElementById("btc-counter").innerText = minedBTC.toFixed(8) + " BTC";
    document.getElementById("total-mined").innerText = minedBTC.toFixed(8) + " BTC";
  }, 1000);
}

function startMiningSessionCountdown() {
  clearTimeout(miningTimer);

  miningTimer = setTimeout(() => {
    stopMiningSession();
  }, miningDuration * 1000);
}

function stopMiningSession() {
  clearInterval(miningInterval);

  const email = sessionStorage.getItem("email");
  if (!email || !minedBTC) return;

  // Send mined BTC to backend
  fetch("/user/save-mined-btc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      mined_btc: minedBTC.toFixed(8)
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showToast("✅ Mined BTC saved to your wallet.");
        fetchDashboardSummary(); // Refresh values
      } else {
        showToast("⚠️ " + data.error);
      }
    })
    .catch(err => {
      console.error("Error saving mined BTC:", err);
      showToast("❌ Failed to save mined BTC.");
    });

  minedBTC = 0;
}

function fetchDashboardSummary() {
  fetchBTCCounter();
  fetchTotalHashrate();
  fetchTotalMined();
  fetchTotalWithdrawn();
  fetchActiveSessions();
  fetchNextWithdrawalDate();
  loadDashboardMessages();
  fetchMyRank();
  fetchMyBTC();
  fetchMyHashrate();
}

function watchAd() {
  const email = sessionStorage.getItem("email");

  if (!email) {
    showToast("❌ Session expired. Please log in.");
    return;
  }

  fetch("/user/watch-ad", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        showToast("✅ " + data.message);
        fetchMiningSettingsAndStartCounter(); // triggers mining
        loadRecentHashSessions(); // updates session list
        saveDashboardStateToBackend(); // save BTC/hashrate/etc
        refreshDashboardView(); // show updates
      } else if (data.error) {
        showToast("❌ " + data.error);
      }
    })
    .catch(err => {
      console.error(err);
      showToast("❌ Failed to log ad watch.");
    });
}

function submitWithdrawal() {
  const email = sessionStorage.getItem("email");
  const btc = parseFloat(document.getElementById("withdraw-btc").value);
  const wallet = document.getElementById("withdraw-wallet").value.trim();

  if (!email || isNaN(btc) || !wallet) {
    showToast("❌ Please fill in all fields correctly.");
    return;
  }

  // First, fetch the actual mined BTC from the database
  fetch("/user/get-total-mined", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      const totalMined = parseFloat(data.total_mined || 0);

      if (btc > totalMined) {
        showToast("⚠️ Insufficient BTC balance.");
        return;
      }

      // Proceed to submit withdrawal request
      fetch("/user/withdraw-now", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, btc, wallet })
      })
        .then(res => res.json())
        .then(result => {
          if (result.error) {
            showToast("❌ " + result.error);
          } else {
            showToast("✅ Withdrawal request submitted. Awaiting admin approval.");
            document.getElementById("withdraw-btc").value = "";
            document.getElementById("withdraw-wallet").value = "";
            closeWithdrawForm();
          }
        })
        .catch(() => {
          showToast("❌ Server error during withdrawal.");
        });

    })
    .catch(() => {
      showToast("❌ Could not verify BTC balance.");
    });
}

function loadWithdrawalHistory() {
  const email = sessionStorage.getItem("email");
  if (!email) return;

  fetch("/user/get-withdrawal-history", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("withdrawal-history-body");
      tbody.innerHTML = "";

      if (!data.history || data.history.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4'>No withdrawal history found.</td></tr>";
        return;
      }

      data.history.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.amount}</td>
          <td>${entry.wallet}</td>
          <td>${entry.status}</td>
          <td>${new Date(entry.date).toLocaleString()}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.error("❌ Failed to load withdrawal history:", err);
    });
}
