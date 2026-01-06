import { formatSeconds } from "../utils/time";

function OverallTable({ results }) {
  const sorted = [...results].sort(
    (a, b) => a.overall_place - b.overall_place
  );

  return (
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>Overall</th>
          <th>Name</th>
          <th>Category</th>
          <th>SUP</th>
          <th>Run</th>
          <th>Arrows</th>
          <th>Final Seconds</th>
          <th>Final Time</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((r) => (
          <tr key={r.id}>
            <td>{r.overall_place}</td>
            <td>{r.first_name} {r.last_name}</td>
            <td>{r.gender} {r.age_group}</td>
            <td>{r.sup_seconds}</td>
            <td>{r.run_seconds}</td>
            <td>{r.arrow_points}</td>
            <td>{r.final_seconds}</td>
            <td>{formatSeconds(r.final_seconds)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OverallTable;