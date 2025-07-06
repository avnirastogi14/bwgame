function MovieDisplay({ movie, vowels, guessed }) {
  return (
    <h2 style={{ letterSpacing: '10px' }}>
      {movie.split('').map((char, idx) => {
        if (char === ' ') return '  ';
        return (vowels.includes(char) || guessed.includes(char)) ? char : '_';
      }).join(' ')}
    </h2>
  );
}

export default MovieDisplay;
