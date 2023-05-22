<?php

// Allow requests from any origin (port) to access the data returned by PHP script
header('Access-Control-Allow-Origin: *');

// Include file with database server configurations
include 'config.php';


// Connect to the database
$conn = new mysqli(config::DB_HOST, config::DB_USER, config::DB_PASS, config::DB_NAME);
if ($conn->connect_errno) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to connect to database']);
    exit;
}

// Fetch data from database based on table name
$quizID = $_GET['quizID'];
$query = "SELECT scores.id AS id, users.name AS userName, scores.score AS score, quizzes.name AS quizName
            FROM scores 
            JOIN users ON scores.fk_user = users.id 
            JOIN quizzes ON scores.fk_quizID = quizzes.id
            WHERE quizzes.id = $quizID
            ORDER BY scores.score DESC;
            ";

// Execute the SQL query and fetch the results as an array of associative arrays
$result = $conn->query($query);

if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Invalid table']);
    exit;
}

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Close the database connection
$conn->close();


// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($data);