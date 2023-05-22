<?php
// Allow requests from any origin (port) to access the data returned by PHP script
header('Access-Control-Allow-Origin: *');

// Include file with database configurations
include 'config.php';

// Connect to database
$conn = new mysqli(config::DB_HOST, config::DB_USER, config::DB_PASS, config::DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user attributes from POST request
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

// Insert user into users
// prepare the query
$stmt = $conn->prepare("INSERT INTO users (name, password, email) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $password, $email);

// Execute the query
$stmt->execute();

// Close the statement and connection
$stmt->close();
$conn->close();
