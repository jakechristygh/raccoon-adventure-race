import { formatSeconds } from "../utils/time";

function AgeGroupTable({ results }) {
  const groups = {};

  results.forEach((r) => {
    const label = r.registration.ageGroupLabel;
    if (!label) return;

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(r);
  });

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
      {Object.entries(groups).map(([label, group]) => {
        const sorted = [...group].sort(
          (a, b) =>
            (a.results?.ageGroupPlace ?? Infinity) -
            (b.results?.ageGroupPlace ?? Infinity)
        );

        return (
          <div key={label}>
            <h3 className="label">{label}</h3>
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
              <tbody>{sorted.map(renderRow)}</tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}

export default AgeGroupTable;
