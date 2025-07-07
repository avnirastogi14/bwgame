import React from 'react';
import './Keyboard.css';

function Keyboard({ onGuess, guessed, includeNumbers = true }) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const numbers = '0123456789'.split('');
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const char = ['&','#','-','?','!'];

  return (
    <div className="keyboard-container">
      <div className="keyboard-section">
        <div className="keyboard-grid alphabet-grid">
          {letters.map((l) => (
            <button
              key={l}
              onClick={() => onGuess(l)}
              className={`key-button ${guessed.includes(l) ? 'disabled' : ''} ${
                vowels.includes(l) ? 'vowel' : ''
              }`}
              disabled={guessed.includes(l)}
            >
              {l}
            </button>
          ))}
        </div>
        {includeNumbers && (
          <div className="keyboard-grid number-grid">
            {numbers.map((n) => (
              <button
                key={n}
                onClick={() => onGuess(n)}
                className={`key-button ${guessed.includes(n) ? 'disabled' : ''}`}
                disabled={guessed.includes(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="keyboard-grid char-grid">
            {char.map((c) => (
              <button
                key={c}
                onClick={() => onGuess(c)}
                className={`key-button ${guessed.includes(c) ? 'disabled' : ''}`}
                disabled={guessed.includes(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Keyboard;