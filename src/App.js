import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import MovieDisplay from './components/MovieDisplay';
import Keyboard from './components/Keyboard';
import WrongGuessDisplay from './components/WrongGuessDisplay';
import HintModal from './components/HintModal';
import './styles/App.css';

function App() {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const [movieList, setMovieList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameStatus, setGameStatus] = useState('playing');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  // Load CSV data from public folder
  useEffect(() => {
    Papa.parse('/data/Movies.csv', {
      download: true,
      header: true,
      complete: (result) => {
        setMovieList(result.data.filter(m => m.name)); // skip empty rows
      },
    });
  }, []);

  // Start first game when movies are loaded
  useEffect(() => {
    if (movieList.length > 0) {
      resetGame();
    }
  }, [movieList]);

  // Enable keyboard input (A-Z)
  useEffect(() => {
    const handleKeyDown = (event) => {
      const pressedKey = event.key.toUpperCase();
      if (/^[A-Z]$/.test(pressedKey)) {
        handleGuess(pressedKey);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [guessedLetters, gameStatus, currentMovie]);

  const resetGame = () => {
    const random = movieList[Math.floor(Math.random() * movieList.length)];
    setCurrentMovie(random);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setShowHint(false);
    setGameStatus('playing');
  };

  const nextRound = () => {
    if (gameStatus === 'won') setScore(score + 10);
    setRound(round + 1);
    resetGame();
  };

  const handleGuess = (letter) => {
    if (!currentMovie || guessedLetters.includes(letter) || gameStatus !== 'playing') return;

    const movieTitle = currentMovie.name.toUpperCase();
    setGuessedLetters((prev) => [...prev, letter]);

    if (!movieTitle.includes(letter)) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);
      if (newWrong === 5) setShowHint(true);
      if (newWrong >= 8) setGameStatus('lost');
    } else {
      const hiddenConsonants = movieTitle
        .split('')
        .filter(l => !vowels.includes(l) && l !== ' ');
      const allGuessed = hiddenConsonants.every(
        l => guessedLetters.includes(l) || l === letter
      );
      if (allGuessed) setGameStatus('won');
    }
  };

  return (
    <div className="app-container">
      <h1>🎬 Bolly-Wood Game</h1>

      <div className="scoreboard">
        <span>🎯 Score: {score}</span>
        <span>🌀 Round: {round}</span>
      </div>

      {currentMovie && (
        <>
          <MovieDisplay
            movie={currentMovie.name.toUpperCase()}
            vowels={vowels}
            guessed={guessedLetters}
          />
          <WrongGuessDisplay wrongCount={wrongGuesses} />

          {gameStatus === 'won' && <div className="result">🏆 You Win!</div>}
          {gameStatus === 'lost' && <div className="result loss">💀 Game Over!</div>}

          {(gameStatus === 'won' || gameStatus === 'lost') && (
            <button className="play-again" onClick={nextRound}>▶️ Next Movie</button>
          )}

          <Keyboard onGuess={handleGuess} guessed={guessedLetters} />

          {showHint && (
            <HintModal
              male={currentMovie.male_lead}
              female={currentMovie.female_lead}
              genre={currentMovie.genre}
              onClose={() => setShowHint(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
