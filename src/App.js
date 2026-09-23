import React, { useState, useEffect } from 'react';

function App() {
  const [ health,setHealth] = useState(null);
  const [ ready,setReady] = useState(null);
  const localhost = 'http://localhost:3000';
  const fetchHealth = async () => {
    const res = await fetch(`${localhost}/health`);
    const data = await res.json();
    setHealth(data);
  };
  const fetchReady = async () => {
    const res = await fetch(`${localhost}/ready`);
    const data = await res.json();
    setReady(data);
  }
  const toggleFail = async () => {
    await fetch(`${localhost}/fail`, { method: 'POST' });
    fetchReady();

  }

  useEffect(() => {
    fetchHealth();
    fetchReady();

    const interval = setInterval(() => {
      fetchHealth();
      fetchReady();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
          style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word',
            height: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px',

           }}

          
          ><pre style={{display:"inline-block"}}>{JSON.stringify(ready, null, 2)}</pre></div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button onClick={toggleFail}>Toggle Fail</button>
    </div>
  );

}
export default App;