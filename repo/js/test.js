let usertarget = document.getElementById("userName");
let accounttype = document.getElementById("account")
let userName = localStorage.getItem("userName");

function get_logged_in() {
  return localStorage.getItem("_LOGGEDIN");
}

function updateContent() {
  if (get_logged_in()) {
    usertarget.textContent = userName;
    accounttype.insertAdjacentHTML("afterend", "<a href=\"account.html\"><img src=\"repo/images/Generic-Profile-Image.png\"alt=\"Settings button\" height=\"60\"/></a>");
  } else {
    accounttype.insertAdjacentHTML("afterend", "<div class=\"white-borders\"><ul><li><a href=\"signup.html\" class=\"shadowed-text\">Signup</a></li></ul></div>");
  }
}

// Call the function to update content initially
updateContent();