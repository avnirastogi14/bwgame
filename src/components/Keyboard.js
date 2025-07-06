function Keyboard({ onGuess, guessed }) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return (
    <div style={{ marginTop: '20px' }}>
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
    </div>
  );
}

export default Keyboard;
