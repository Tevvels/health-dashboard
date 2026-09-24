import React, { useState, useEffect } from 'react';
import { fetchHealth, fetchReady, toggleFail } from './reliability';

function App() {
  const [health, setHealth] = useState(null);
  const [ready, setReady] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchHealth(API_BASE_URL).then(setHealth);
    fetchReady(API_BASE_URL).then(setReady);

    const interval = setInterval(() => {
      fetchHealth(API_BASE_URL).then(setHealth);
      fetchReady(API_BASE_URL).then(setReady);
    }, 5000);

    return () => clearInterval(interval);
  }, [API_BASE_URL]);

  const handleToggleFail = async () => {
    await toggleFail(API_BASE_URL);
    const readyData = await fetchReady(API_BASE_URL);
    setReady(readyData);
  };

  return (
    <div>
      <h1>Health Dashboard</h1>

      <div>
        <h2>Liveness Check</h2>
        {health ? (
          <pre>{JSON.stringify(health, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div>
        <h2>Readiness Check</h2>
        {ready ? (
          <div
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              height: '200px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              padding: '10px',
            }}
          >
            <pre style={{ display: 'inline-block' }}>
              {JSON.stringify(ready, null, 2)}
            </pre>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <button onClick={handleToggleFail}>Toggle Fail</button>
    </div>
  );
}

export default App;
