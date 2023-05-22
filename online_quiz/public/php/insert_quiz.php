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
$name = $_POST['name'];
$description = $_POST['description'];
$category = $_POST['category'];
$imageUrl = $_POST['imageUrl'];


// Get the JSON-encoded questions array from the POST data
$questions_json = $_POST['questions'];

// Decode the JSON string to a PHP array
$questions = json_decode($questions_json, true);


$user_id = $_POST['user-id'];

// Insert quiz into quizzes table
// prepare the query
$stmt = $conn->prepare("INSERT INTO quizzes (name, description, category, image_url, user_id) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssssi", $name, $description, $category, $imageUrl, $user_id);

// execute the query
$stmt->execute();

// get last inserted quiz ID
$quiz_id = $conn->insert_id;


// loop through each question and execute the query for each one
foreach ($questions as $question) {

    $question_text = $question['text'];
    // Prepare a query to insert a new question
    $stmt = $conn->prepare("INSERT INTO questions (name, quiz_id) VALUES (?, ?)");
    $stmt->bind_param("si", $question_text, $quiz_id);

    // execute the query
    $stmt->execute();

    // get last inserted question ID
    $question_id = $conn->insert_id;

    // prepare the query to insert answers of the current question
    $stmt = $conn->prepare("INSERT INTO answers (name, isCorrect, question_id) VALUES (?, ?, ?)");
    $stmt->bind_param("sii", $answer_text, $is_correct, $question_id);

    // loop through each answer of current question and instert it into database
    foreach ($question['answers'] as $answer) {

        $answer_text = $answer['text'];
        $is_correct = $answer['isCorrect'] ? 1 : 0;

        // execute the query
        $stmt->execute();
    }
}


// Close the statement and connection
$stmt->close();
$conn->close();
