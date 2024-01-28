<?php
require_once 'config_session.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $result = false;
  $_SESSION['_LOGGEDIN'] = false;
  $_SESSION["user_username"] = "";

  session_id(session_create_id());
  $_SESSION["last_regeneration"] = time();

  header("Location: ../../account.php?logout=success");
  exit(); // Ensure that no other code is executed after the redirect
} else {
  header("Location: ../../index.php");
  die();
}