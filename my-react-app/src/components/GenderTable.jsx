import { formatSeconds } from "../utils/time";

function GenderTable({ results }) {
  const males = results
    .filter((r) => r.registration.gender === "Male")
    .sort(
      (a, b) =>
        (a.results?.genderPlace ?? Infinity) -
        (b.results?.genderPlace ?? Infinity)
    );

  const females = results
    .filter((r) => r.registration.gender === "Female")
    .sort(
      (a, b) =>
        (a.results?.genderPlace ?? Infinity) -
        (b.results?.genderPlace ?? Infinity)
    );

  const renderRow = (r) => (
    <tr key={r.racerId}>
      <td>{r.results?.overallPlace ?? "--"}</td>
      <td>
        {r.registration.firstName} {r.registration.lastName}
      </td>
      <td>
        {r.registration.gender} {r.registration.ageGroup}
      </td>
      <td>{r.results?.supSeconds ?? "--"}</td>
      <td>{r.results?.runSeconds ?? "--"}</td>
      <td>{r.results?.arrowPoints ?? "--"}</td>
      <td>{r.results?.finalSeconds ?? "--"}</td>
      <td>
        {r.results?.finalSeconds != null
          ? formatSeconds(r.results.finalSeconds)
          : "--"}
      </td>
    </tr>
  );

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
        <tbody>{males.map(renderRow)}</tbody>
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
        <tbody>{females.map(renderRow)}</tbody>
      </table>
    </>
  );
}

export default GenderTable;
