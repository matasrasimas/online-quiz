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

// Get quiz id from URL address (GET request)
$quizId = $_GET['quiz-id'];

// Select all questions with matching quiz_id
$stmt = $conn->prepare("SELECT * FROM questions WHERE quiz_id = ?");
$stmt->bind_param("i", $quizId);
$stmt->execute();

// Get result and store it in $questions variable
$result = $stmt->get_result();
$questions = $result->fetch_all(MYSQLI_ASSOC);


foreach ($questions as $question) {

    // Select all answers with matching question_id
    $stmt = $conn->prepare("SELECT * FROM answers WHERE question_id = ?");
    $stmt->bind_param("i", $question['id']);
    $stmt->execute();

    // Get result set and store it in $answers variable
    $result = $stmt->get_result();
    $answers = $result->fetch_all(MYSQLI_ASSOC);

    // Delete all answers with matching question_id
    $stmt = $conn->prepare("DELETE FROM answers WHERE id = ?");
    foreach ($answers as $answer) {
        $stmt->bind_param("i", $answer['id']);
        $stmt->execute();
    }

    // Delete a questions with matching quiz_id
    $stmt = $conn->prepare("DELETE FROM questions WHERE id = ?");
    $stmt->bind_param("i", $question['id']);
    $stmt->execute();
}

// Select all scores with matching quiz_id
$stmt = $conn->prepare("SELECT * FROM scores WHERE fk_quizID = ?");
$stmt->bind_param("i", $quizId);
$stmt->execute();

// Get result and store it in $scores variable
$result = $stmt->get_result();
$scores = $result->fetch_all(MYSQLI_ASSOC);


// delete all scores from leaderboard
$stmt = $conn->prepare("DELETE FROM scores WHERE id=?");
foreach ($scores as $score) {

    $stmt->bind_param("i", $score['id']);
    $stmt->execute();
}

// delete quiz
$stmt = $conn->prepare("DELETE FROM quizzes WHERE id = ?");
$stmt->bind_param("i", $quizId);
$stmt->execute();

// Close the statement and connection
$stmt->close();
$conn->close();
