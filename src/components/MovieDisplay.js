import React from 'react';
import './MovieDisplay.css';

function MovieDisplay({ movie, vowels, guessed }) {
  return (
    <div className="movie-display">
      {movie.split('').map((char, idx) => {
        if (char === ' ') {
          return <span key={idx} className="word-break"></span>;
        }

        const isRevealed = vowels.includes(char) || guessed.includes(char);
        const isVowel = vowels.includes(char);
        const isNumber = /[0-9]/.test(char);

        return (
          <span
            key={idx}
            className={`letter ${isRevealed ? 'revealed' : 'hidden'} ${
              isVowel && isRevealed ? 'vowel' : ''
            } ${isNumber && isRevealed ? 'number' : ''}`}
          >
            {isRevealed ? char : '_'}
          </span>
        );
      })}
    </div>
  );
}

export default MovieDisplay;