import React, { useEffect, useState } from "react";
import "../admin/UpdateResults.css";

const API_BASE = "https://1n250bbi5b.execute-api.us-east-2.amazonaws.com";

function UpdateResult() {
  const [racers, setRacers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/racers`)
      .then((res) => res.json())
      .then(setRacers)
      .catch(() => setMessage("Failed to load racers"));
  }, []);

  const updateField = (racerId, field, value) => {
    setRacers((prev) =>
      prev.map((r) =>
        r.racerId === racerId
          ? {
              ...r,
              results: {
                ...r.results,
                [field]: value === "" ? "" : Number(value),
              },
            }
          : r
      )
    );
  };

  const deleteRacer = async (racerId) => {
  if (!window.confirm("Delete this racer?")) return;

  try {
    const res = await fetch(
      `${API_BASE}/racers/${racerId}`,
      { method: "DELETE" }
    );

    if (!res.ok) throw new Error();

    setRacers((prev) => prev.filter(r => r.racerId !== racerId));
    setMessage("Racer deleted");
  } catch {
    setMessage("Failed to delete racer");
  }
};


  const saveResults = async (racer) => {
    setMessage("");

    const payload = {
      racerId: racer.racerId,
      results: {
        supSeconds: racer.results?.supSeconds || 0,
        runSeconds: racer.results?.runSeconds || 0,
        arrowPoints: racer.results?.arrowPoints || 0,
      },
    };

    try {
      const res = await fetch(`${API_BASE}/updateRacer`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save");
      }

      setMessage(`✅ Saved results for ${racer.registration.firstName}`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error saving results");
    }
  };

  return (
    <div className="admin-page">
      <h2>Update Racer Results</h2>
      {message && <p className="admin-message">{message}</p>}

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SUP (sec)</th>
            <th>Run (sec)</th>
            <th>Arrows</th>
            <th>Save</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {racers.map((r) => (
            <tr key={r.racerId}>
              <td>
                {r.registration.firstName} {r.registration.lastName}
              </td>

              <td>
                <input
                  type="number"
                  value={r.results?.supSeconds ?? ""}
                  onChange={(e) =>
                    updateField(r.racerId, "supSeconds", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={r.results?.runSeconds ?? ""}
                  onChange={(e) =>
                    updateField(r.racerId, "runSeconds", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={r.results?.arrowPoints ?? ""}
                  onChange={(e) =>
                    updateField(r.racerId, "arrowPoints", e.target.value)
                  }
                />
              </td>

              <td>
                <button onClick={() => saveResults(r)}>Save</button>
              </td>

              <td>
                <button
                  className="danger"
                  onClick={() => deleteRacer(r.racerId)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpdateResult;