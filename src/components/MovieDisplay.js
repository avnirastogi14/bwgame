function MovieDisplay({ movie, vowels, guessed }) {
  return (
    <div className="movie-display">
      {movie.split('').map((char, idx) => {
        if (char === ' ') {
          return <span key={idx} className="word-break">   </span>;
        }
        const displayChar = (vowels.includes(char) || guessed.includes(char)) ? char : '_';
        return <span key={idx} className="letter">{displayChar}</span>;
      })}
    </div>
  );
}

export default MovieDisplay;