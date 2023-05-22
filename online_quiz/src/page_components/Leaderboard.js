import React from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";
import "../css/Leaderboard.css";
import "../css/NavBar.css";
import Loading from "./Loading";

function Leaderboard({ loggedUser }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const i = 0;

  const location = useLocation();
  const data = location.state;
  const ID = data.quiz.id;
  const word = "word";

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/php/fetch_leaderboard_data.php?quizID=" + ID)
      .then((response) => response.json())
      .then((json) => setScores(json))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Leaderboard">
      {loading ? (
        <div></div>
      ) : (
        <>
          <h1 className="leaderboard-h1">Scores for {data.quiz.name} quiz</h1>
          <div className="leaderboard-table">
            <table>
              <thead>
                <tr className="fc-dark">
                  <th>#</th>
                  <th>User Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((user, index) => (
                  <tr
                    className={`fc-dark ${
                      loggedUser && user.userName === loggedUser.name
                        ? "fw-bold"
                        : ""
                    }`}
                    key={user.id}
                  >
                    <td>{index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Leaderboard;
