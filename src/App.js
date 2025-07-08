import React, { useEffect, useState, useCallback } from 'react';
import Papa from 'papaparse';
import MovieDisplay from './components/MovieDisplay';
import Keyboard from './components/Keyboard';
import WrongGuessDisplay, { MAX_GUESSES } from './components/WrongGuessDisplay';
import HintModal from './components/HintModal';
import HelpModal from './components/HelpModal';
import './App.css';

function App() {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const specialChars = ['&', '#', '-', '?', '!'];

  const [movieList, setMovieList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameStatus, setGameStatus] = useState('playing');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [showHelp, setShowHelp] = useState(false);

  const MAX_WRONG_GUESSES = MAX_GUESSES;
  const HINT_THRESHOLD = 5;

  const resetGame = useCallback(() => {
    const random = movieList[Math.floor(Math.random() * movieList.length)];
    setCurrentMovie(random);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setShowHint(false);
    setGameStatus('playing');
  }, [movieList]);

  const nextRound = useCallback(() => {
    if (gameStatus === 'won') setScore(prev => prev + 10);
    setRound(prev => prev + 1);
    resetGame();
  }, [gameStatus, resetGame]);

  const handleGuess = useCallback((letter) => {
    if (!currentMovie || guessedLetters.includes(letter) || gameStatus !== 'playing') return;

    const title = currentMovie.name.toUpperCase();
    setGuessedLetters(prev => [...prev, letter]);

    if (!title.includes(letter)) {
      if (!vowels.includes(letter)) {
        const newWrong = wrongGuesses + 1;
        setWrongGuesses(newWrong);
        if (newWrong === HINT_THRESHOLD) setShowHint(true);
        if (newWrong >= MAX_WRONG_GUESSES) setGameStatus('lost');
      }
    } else {
      const hiddenCharacters = title
        .split('')
        .filter(char =>
          /[A-Z0-9&#!\-?]/.test(char) && !vowels.includes(char) && char !== ' '
        );

      const updatedGuessedLetters = [...guessedLetters, letter];
      const allGuessed = hiddenCharacters.every(
        char => updatedGuessedLetters.includes(char)
      );

      if (allGuessed) setGameStatus('won');
    }
  }, [currentMovie, guessedLetters, gameStatus, wrongGuesses]);

  useEffect(() => {
    Papa.parse('/data/Movies.csv', {
      download: true,
      header: true,
      complete: (result) => {
        setMovieList(result.data.filter(m => m.name));
      },
    });
  }, []);

  useEffect(() => {
    if (movieList.length > 0) {
      resetGame();
    }
  }, [movieList, resetGame]);

    useEffect(() => {
  const handleKeyDown = (event) => {
    let key = event.key;

    if (key.length === 1) {
      if (/[a-z]/.test(key)) key = key.toUpperCase();
    }

    const allowed = /^[A-Z0-9]$/.test(key) || ['&', '#', '-', '?', '!'].includes(key);
    if (allowed) {
      handleGuess(key);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [handleGuess]);

  return (
    <main className="app-container">
      <button className="help-button" onClick={() => setShowHelp(true)}>
        ?
      </button>

      <h1>🎬 BOLLYWOOD GAME</h1>

      <div className="scoreboard">
        <span>🎯 Score: {score}</span>
        <span>❤️ Lives Left: {MAX_WRONG_GUESSES - wrongGuesses}</span>
        <span>🌀 Round: {round}</span>
      </div>

      {currentMovie && <WrongGuessDisplay wrongCount={wrongGuesses} />}

      <div className="game-content">
        {currentMovie && (
          <>
            <div className="movie-section">
              <div className="movie-display-container">
                <MovieDisplay
                  movie={currentMovie.name.toUpperCase()}
                  vowels={vowels}
                  guessed={guessedLetters}
                />
              </div>

              {gameStatus === 'won' && <div className="result win">🏆 You Win!</div>}
              {gameStatus === 'lost' && (
                <div className="result loss">💀 Game Over! The movie was: <strong>{currentMovie.name.toUpperCase()}</strong></div>
              )}

              {(gameStatus === 'won' || gameStatus === 'lost') && (
                <button className="play-again" onClick={nextRound}>
                  ▶️ Next Movie
                </button>
              )}

              {showHint && gameStatus === 'playing' && (
                <button className="hint-button" onClick={() => setShowHint(true)}>
                  💡 Show Hint
                </button>
              )}
            </div>

            <div className="keyboard-section">
              <Keyboard onGuess={handleGuess} guessed={guessedLetters} />
            </div>
          </>
        )}
      </div>

      {showHint && (
        <HintModal
          male={currentMovie.lead1}
          female={currentMovie.lead2}
          genre={currentMovie.genre}
          onClose={() => setShowHint(false)}
        />
      )}

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </main>
  );
}

export default App;
