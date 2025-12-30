<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);
    $entry = "$name,$email,\"$message\"\n";
    file_put_contents("contacts.csv", $entry, FILE_APPEND);
    echo "success";
}
?> 