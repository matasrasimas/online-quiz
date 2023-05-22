# QuizHub

## Description

Welcome to QuizHub, the fun and engaging quiz platform! We have designed our platform to be user-friendly and easy to navigate so that everyone can enjoy learning through our quizzes.

## Installation

Follow these steps for installation:

1. Pull the project to your local git repository. We recommend using VS Code which we used for the development of this project.

2. Configure the config.php file to your liking. It's located in online_quiz/public/php. There you can choose the name for the database and login info.

3. Start a local server, we recommend using XAMPP (https://www.apachefriends.org/download.html). Start the Apache and MySQL modules.

4. After launching XAMPP and starting the modules, visit http://localhost/phpmyadmin/ and create a database. The database should be the same name as the one written in config.php file (const DB_NAME = 'dbName';)

5. Press the SQL tab on the navigation bar and paste the code which is located in the "online_quiz/public/php/SqlDump.sql" file.

6. Now open a terminal outside of your IDE (powershell, cmd, etc.) inside the terminal navigate to the public folder of your local repository. Once there input this line "php -S localhost:8000"

7. Open the terminal in your IDE and run the following commands in the online_quiz folder - npm install react-scripts --save and npm start.

8. Enjoy!

## How to Use the Project

QuizHub is designed to be a robust and flexible quiz platform. After installation, you can access the platform via your local server. To create a quiz, navigate to the 'Create Quiz' section. You can then input your questions, answers, and correct answers. When you're ready, you can publish the quiz for others to take.

This project offers a comprehensive insight into development using a variety of technologies including PHP, React, and MySQL among others. It can be an excellent resource for learning about full-stack development. Exploring the codebase can provide understanding about how to structure a large scale project, handle database operations, and create an interactive front-end.

This project can be used as a basis for your own personal projects. Feel free to modify and expand upon it to suit your needs.

## Credits

| Name               | Contribution |
| ------------------ | ------------ |
| Aurimas Gasparas   | Developer    |
| Matas Asačiovas    | Developer    |
| Jurgis Andziulis   | Developer    |
| Tomas Jasulevičius | Developer    |
| Matas Rašimas      | Developer    |
