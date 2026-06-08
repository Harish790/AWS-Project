// 🔐 Cognito Auth Check
const hash = window.location.hash;
if (hash.includes("id_token")) {
  const token = new URLSearchParams(hash.slice(1)).get("id_token");
  localStorage.setItem("token", token);
  history.replaceState(null, "", window.location.pathname);
} else if (!localStorage.getItem("token")) {
  window.location.href = "https://us-east-2hcni46ecv.auth.us-east-2.amazoncognito.com/login?client_id=j98ae55p06qf9r8lh59o1v7h9&response_type=token&scope=email+openid+profile&redirect_uri=https://harish790.github.io/AWS-Project/index11.html";
}

function showLoginUI() {
  document.getElementById("loginBtn").style.display = "block";
  document.getElementById("logoutBtn").style.display = "none";
  document.getElementById("uploadSection").style.display = "none";
}

function showUploadUI() {
  document.getElementById("loginBtn").style.display = "none";
  document.getElementById("logoutBtn").style.display = "block";
  document.getElementById("uploadSection").style.display = "block";
}

function loginWithCognito() {
  window.location.href = "https://us-east-2hcni46ecv.auth.us-east-2.amazoncognito.com/login?client_id=j98ae55p06qf9r8lh59o1v7h9&response_type=token&scope=email+openid+profile&redirect_uri=https://harish790.github.io/AWS-Project/index11.html";
}

function logout() {
  localStorage.removeItem("token");
  showLoginUI();
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", function() {
  if (localStorage.getItem("token")) {
    showUploadUI();
  } else {
    showLoginUI();
  }
});
