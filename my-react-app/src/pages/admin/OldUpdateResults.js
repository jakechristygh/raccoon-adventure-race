import { useEffect, useState } from "react";
import "../admin/UpdateResults.css";

function UpdateResults() {
  const [racers, setRacers] = useState([]);
  const [selectedRacerId, setSelectedRacerId] = useState("");
  const [form, setForm] = useState({
    supSeconds: "",
    runSeconds: "",
    arrowPoints: "",
  });

  useEffect(() => {
    fetch("https://1n250bbi5b.execute-api.us-east-2.amazonaws.com/racers")
      .then((res) => res.json())
      .then(setRacers)
      .catch((err) => console.error("Failed to load racers", err));
  }, []);

  const selectedRacer = racers.find(
    (r) => r.racerId === Number(selectedRacerId)
  );

  // Prefill form when racer changes
  useEffect(() => {
    if (!selectedRacer) return;

    setForm({
      supSeconds: selectedRacer.results?.supSeconds ?? "",
      runSeconds: selectedRacer.results?.runSeconds ?? "",
      arrowPoints: selectedRacer.results?.arrowPoints ?? "",
    });
  }, [selectedRacer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="admin-page">
      <h2>Admin – Update Racer Results</h2>

      <label>
        Select Racer:
        <select
          value={selectedRacerId}
          onChange={(e) => setSelectedRacerId(e.target.value)}
        >
          <option value="">-- Select Racer --</option>
          {racers.map((r) => (
            <option key={r.racerId} value={r.racerId}>
              {r.registration.firstName} {r.registration.lastName}
            </option>
          ))}
        </select>
      </label>

      {selectedRacer && (
        <>
          <h3>
            {selectedRacer.registration.firstName}{" "}
            {selectedRacer.registration.lastName}
          </h3>

          <fieldset className="results-group">
            <legend>Race Results</legend>

            <label>
              SUP Seconds
              <input
                type="number"
                name="supSeconds"
                value={form.supSeconds}
                onChange={handleChange}
                min="0"
              />
            </label>

            <label>
              Run Seconds
              <input
                type="number"
                name="runSeconds"
                value={form.runSeconds}
                onChange={handleChange}
                min="0"
              />
            </label>

            <label>
              Arrow Points
              <input
                type="number"
                name="arrowPoints"
                value={form.arrowPoints}
                onChange={handleChange}
                min="0"
              />
            </label>

            <button type="button" disabled>
              Save Results (next step)
            </button>
          </fieldset>
        </>
      )}
    </div>
  );
}

export default UpdateResults;
