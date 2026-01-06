import { formatSeconds } from "../utils/time";

function GenderTable({ results }) {
  const males = results
    .filter((r) => r.gender === "Male")
    .sort((a, b) => a.gender_place - b.gender_place);

  const females = results
    .filter((r) => r.gender === "Female")
    .sort((a, b) => a.gender_place - b.gender_place);

  return (
    <>
      <h3 className="label">Male</h3>
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
          {males.map((r) => (
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

      <h3 className="label">Female</h3>
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
          {females.map((r) => (
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
    </>
  );
}

export default GenderTable;
