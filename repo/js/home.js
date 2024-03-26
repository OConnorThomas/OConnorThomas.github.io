let logOutBtn = document.getElementById("logOutBtn");
let welcomeUser = document.getElementById("userName");
let userName = localStorage.getItem("userName");

welcomeUser.innerHTML = userName;

logOutBtn.addEventListener("click", function () {
  localStorage.setItem("_LOGGEDIN", false);
  window.location.href = "test.html";
});
