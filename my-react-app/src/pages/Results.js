import { useEffect, useState } from "react";
import OverallTable from "../components/OverallTable";
import GenderTable from "../components/GenderTable";
import AgeGroupTable from "../components/AgeGroupTable";
import "./Results.css";
import Footer from "../components/Footer";

function ResultsPage() {
  const [results, setResults] = useState([]);
  const [view, setView] = useState("overall");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch(`${process.env.REACT_APP_API_URL}/racers`)
    fetch(`https://1n250bbi5b.execute-api.us-east-2.amazonaws.com/racers`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch results");
        }
        return res.json();
      })
      .then(data => {
        console.log("RESULTS PAGE RENDERED");

        // Default sort by finalSeconds
        const sorted = [...data].sort(
          (a, b) => a.finalSeconds - b.finalSeconds
        );
        setResults(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="leaderboard">Loading results...</p>;
  if (error) return <p className="leaderboard error">{error}</p>;

  return (
    <div>
      <div className="leaderboard">
        <h1 className="leaderboard h2">Race Results</h1>

        <div className="filters">
          <button
            className={view === "overall" ? "active" : ""}
            onClick={() => setView("overall")}
          >
            Overall
          </button>
          <button
            className={view === "gender" ? "active" : ""}
            onClick={() => setView("gender")}
          >
            Gender
          </button>
          <button
            className={view === "age_group" ? "active" : ""}
            onClick={() => setView("age_group")}
          >
            Age Group
          </button>
        </div>

        {view === "overall" && <OverallTable results={results} />}
        {view === "gender" && <GenderTable results={results} />}
        {view === "age_group" && <AgeGroupTable results={results} />}
      </div>

      <Footer />
    </div>
  );
}

export default ResultsPage;
