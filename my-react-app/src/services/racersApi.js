const API_BASE = process.env.REACT_APP_API_URL;

export async function getRacers() {
  const response = await fetch(`${API_BASE}/racers`);

  if (!response.ok) {
    throw new Error("Failed to fetch racers");
  }

  return response.json();
}