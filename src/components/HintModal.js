function HintModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.8)', display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#222', padding: '20px',
        borderRadius: '10px', textAlign: 'left', color: 'white'
      }}>
        <h2>Need a Hint?</h2>
        <ul>
          <li><b>Male Lead:</b> Shah Rukh Khan</li>
          <li><b>Female Lead:</b> Kajol</li>
          <li><b>Genre:</b> Romance</li>
        </ul>
        <button onClick={onClose}>Close Hint</button>
      </div>
    </div>
  );
}

export default HintModal;
