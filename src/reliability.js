export const toggleFail = async (API_BASE_URL) => {
 const res = await fetch(`${API_BASE_URL}/toggle-fail`, {
    method: 'POST',
  });
  return res.json();
}
export const fetchHealth = async (API_BASE_URL, setHealth) => {
  const res = await fetch(`${API_BASE_URL}/health`);
    return res.json();

}
export const fetchReady = async (API_BASE_URL, setReady) => {
  const res = await fetch(`${API_BASE_URL}/ready`);
    return res.json();

}   