<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $password = $_POST["pwd"];

    try {

        require_once 'dbh.php';
        require_once 'login_model.php';
        require_once 'login_control.php';

        // Error Handlers:
        $errors = [];

        if (is_input_empty($username, $password)) {
            $errors["empty_input"] = "Fill in all fields!";
        }

        $result = get_user($pdo, $username);
        if (is_username_wrong($result)) {
            $errors["username_incorrect"] = "Username not found!";
        }
        if (!is_username_wrong($result) && is_password_wrong($password, $result["pwd"])) {
            $errors["incorrect_password"] = "Incorrect password!";
        }

        require_once 'config_session.php';

        if ($errors) {
            $_SESSION["errors_login"] = $errors;
            $_SESSION['_LOGGEDIN'] = false;
            header("Location: ../../account.php?login=failed");
            die();
        }

        $newSessionId = session_create_id();
        $sessionId = $newSessionId . "_" . $result["id"];
        session_id($sessionId);

        // For webpage-use
        $_SESSION["user_id"] = $result["id"];
        $_SESSION["user_username"] = htmlspecialchars($result["username"]);
        $_SESSION["user_firstName"] = htmlspecialchars($result["firstName"]);
        $_SESSION["user_lastName"] = htmlspecialchars($result["lastName"]);
        $_SESSION["user_email"] = htmlspecialchars($result["email"]);

        $_SESSION["last_regeneration"] = time();
        $_SESSION['_LOGGEDIN'] = true;
        header("Location: ../../index.php?login=success");
        $pdo = null;
        $stmt = null;
        exit(); // Ensure that no other code is executed after the redirect

    } catch (PDOException $e) {
        die("Login failed: " . $e->getMessage());
    }
} else {
    header("Location: ../../index.php");
    die();
}
