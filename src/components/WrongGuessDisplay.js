import React from 'react';
import './WrongGuessDisplay.css';

export const TRACKER_WORD = "BOLLY-WOOD".split('');
export const MAX_GUESSES = TRACKER_WORD.length;

function WrongGuessDisplay({ wrongCount }) {
  return (
    <div className="wrong-guess-tracker">
      {TRACKER_WORD.map((letter, i) => (
        <span
          key={i}
          className={`tracker-letter ${i < wrongCount ? 'used' : ''}`}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}

export default WrongGuessDisplay;