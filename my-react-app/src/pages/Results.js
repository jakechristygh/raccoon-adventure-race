import { useEffect, useState } from "react";
import OverallTable from "../components/OverallTable";
import GenderTable from "../components/GenderTable";
import AgeGroupTable from "../components/AgeGroupTable";
import "./Results.css";

function ResultsPage() {
  const [results, setResults] = useState([]);
  const [view, setView] = useState("overall");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/results/")
      .then((res) => res.json())
      .then(setResults);
  }, []);

  return (
    <div className="leaderboard">
      <h1 className="leaderboard h2">Race Results</h1>
      <div className="filters">
        <button onClick={() => setView("overall")}>Overall</button>
        <button onClick={() => setView("gender")}>Gender</button>
        <button onClick={() => setView("age_group")}>Age Group</button>
      </div>

      {view === "overall" && <OverallTable results={results} />}
      {view === "gender" && <GenderTable results={results} />}
      {view === "age_group" && <AgeGroupTable results={results} />}
    </div>
  );
}

export default ResultsPage;
