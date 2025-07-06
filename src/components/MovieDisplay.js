function MovieDisplay({ movie, vowels, guessed }) {
  return (
    <div className="movie-display">
      {movie.split('').map((char, idx) => {
        if (char === ' ') return '   ';
        return (vowels.includes(char) || guessed.includes(char)) ? char : '_';
      }).join(' ')}
    </div>
  );
}

export default MovieDisplay;
