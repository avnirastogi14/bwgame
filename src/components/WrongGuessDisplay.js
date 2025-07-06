function WrongGuessDisplay({ wrongCount }) {
  const full = "BOLLY-WOOD".split('');
  const stricken = full.map((l, i) => (
    <span
      key={i}
      style={{
        textDecoration: i < wrongCount ? 'line-through' : 'none',
        margin: '0 5px',
        color: i < wrongCount ? 'red' : 'white'
      }}
    >
      {l}
    </span>
  ));
  return <div style={{ marginTop: '15px', fontSize: '24px' }}>{stricken}</div>;
}

export default WrongGuessDisplay;
