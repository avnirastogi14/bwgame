import logo from './logo.svg';
import './styles/App.css';


import React, { useState } from 'react';
import MovieDisplay from './components/MovieDisplay';
import Keyboard from './components/Keyboard';
import WrongGuessDisplay from './components/WrongGuessDisplay';
import HintModal from './components/HintModal';

function App() {
  const movie = "DILWALE DULHANIA LE JAYENGE".toUpperCase();
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameStatus, setGameStatus] = useState('playing'); // 'won' or 'lost'

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || gameStatus !== 'playing') return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!movie.includes(letter)) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);

      if (newWrong === 5) setShowHint(true);
      if (newWrong >= 8) setGameStatus('lost');
    } else {
      const hiddenConsonants = movie
        .split('')
        .filter(l => !vowels.includes(l) && l !== ' ');
      const allGuessed = hiddenConsonants.every(l => guessedLetters.includes(l) || l === letter);

      if (allGuessed) setGameStatus('won');
    }
  };

  return (
    <div>
      <h1>Bolly-Wood Game 🎬</h1>
      <MovieDisplay movie={movie} vowels={vowels} guessed={guessedLetters} />
      <WrongGuessDisplay wrongCount={wrongGuesses} />
      {gameStatus === 'won' && <h2>🏆 You Win!</h2>}
      {gameStatus === 'lost' && <h2>💀 Game Over!</h2>}
      <Keyboard onGuess={handleGuess} guessed={guessedLetters} />
      {showHint && <HintModal onClose={() => setShowHint(false)} />}
    </div>
  );
}

export default App;
