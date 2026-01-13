export function formatSeconds(seconds) {
  if (seconds === null || seconds === undefined) {
    return "--";
  }

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Optional: "5m 03s" style
export function formatSecondsPretty(seconds) {
  if (seconds === null || seconds === undefined) {
    return "--";
  }

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}m ${secs.toString().padStart(2, "0")}s`;
}
