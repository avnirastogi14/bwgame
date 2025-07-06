function Keyboard({ onGuess, guessed, includeNumbers = true }) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const numbers = '0123456789'.split('');

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Letters */}
      {letters.map((l) => (
        <button
          key={l}
          onClick={() => onGuess(l)}
          className={guessed.includes(l) ? 'disabled' : ''}
          disabled={guessed.includes(l)}
        >
          {l}
        </button>
      ))}
      
      {/* Numbers (if enabled) */}
      {includeNumbers && (
        <div style={{ marginTop: '10px' }}>
          {numbers.map((n) => (
            <button
              key={n}
              onClick={() => onGuess(n)}
              className={guessed.includes(n) ? 'disabled' : ''}
              disabled={guessed.includes(n)}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Keyboard;