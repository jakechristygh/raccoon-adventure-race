import React, { useEffect, useState } from "react";
import mockResults from "../data/mockResults";
import "./Results.css";


const timeToSeconds = (timeStr) => {
  const [h, m, s] = timeStr.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

const secondsToTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const calculateFinalTime = (sup_time, run_time, arrow_points) => {
  const totalSeconds = timeToSeconds(calculateTotalTime(sup_time, run_time));
  const pointsSeconds = arrow_points * 60; 
  const finalSeconds = Math.max(totalSeconds - pointsSeconds, 0);
  return secondsToTime(finalSeconds);
};

const calculateTotalTime = (sup_time, run_time) => {
   const totalSeconds = timeToSeconds(sup_time) + timeToSeconds(run_time);
  return secondsToTime(totalSeconds);
};

function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(mockResults);
  }, []);

  return (
    <div className="results-page">
      <h2>Race Results</h2>

      <table className="results-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age Group</th>
            <th>SUP</th>
            <th>Run</th>
            <th>Total Time</th>
            <th>Arrow Pts</th>
            <th>Final Time</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => {
            
            return (
              <tr key={r.id}>
                <td>{r.first_name} {r.last_name}</td>
                <td>{r.gender}</td>
                <td>{r.age_group}</td>
                <td>{r.sup_time}</td>
                <td>{r.run_time}</td>
                <td>{calculateTotalTime(r.sup_time, r.run_time)}</td>
                <td>{r.arrow_points}</td>
                <td>{calculateFinalTime(r.sup_time, r.run_time, r.arrow_points)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
