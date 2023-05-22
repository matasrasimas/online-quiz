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

// Get main quiz attributes from POST request
$user_id = $_POST['fk_user'];
$user_score = $_POST['score'];
$quizID = $_POST['fk_quizID'];

// Insert quiz into quizzes table
// prepare the query
$sql = "UPDATE scores SET score=$user_score WHERE fk_quizID=$quizID AND fk_user=$user_id";

// Execute the SQL statement
if ($conn->query($sql) === TRUE) {
  echo "Record updated successfully";
} else {
  echo "Error updating record: " . $conn->error;
}

// Close the database connection
$conn->close();
?>