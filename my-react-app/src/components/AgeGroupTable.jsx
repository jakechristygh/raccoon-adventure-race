import { formatSeconds } from "../utils/time";

function AgeGroupTable({ results }) {
  const groups = {};

  results.forEach((r) => {
    if (!r.age_group_label) return;
    groups[r.age_group_label] ??= [];
    groups[r.age_group_label].push(r);
  });

  return (
    <>
      {Object.entries(groups).map(([label, group]) => (
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
            <tbody>
              {group
                .sort((a, b) => a.age_group_place - b.age_group_place)
                .map((r) => (
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
        </div>
      ))}
    </>
  );
}

export default AgeGroupTable;
