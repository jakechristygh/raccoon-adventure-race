import { formatSeconds } from "../utils/time";

function OverallTable({ results }) {
  console.log("OverallTable results:", results);

  const sorted = [...results].sort((a, b) => {
    const aPlace = a.results?.overallPlace ?? Infinity;
    const bPlace = b.results?.overallPlace ?? Infinity;
    return aPlace - bPlace;
  });

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
          <th>Final Time</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((r) => (
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
            <td>
              {r.results?.finalSeconds != null
                ? formatSeconds(r.results.finalSeconds)
                : "--"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OverallTable;
