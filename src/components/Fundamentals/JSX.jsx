function JSX() {
  const name = 'Mateen';
  const age = 25;
  const isLoggedIn = true;

  return (
    <div>
      <h2>JSX Demo</h2>

      {/* Variable */}
      <p>Name: {name}</p>

      {/* Calculation */}
      <p>Next year age: {age + 1}</p>

      {/* Ternary */}
      <p>{isLoggedIn ? ' Logged In' : ' Not Logged In'}</p>

      {/* className */}
      <p className="text">CSS class example</p>

      {/* Style object */}
      <p style={{ color: 'blue', fontSize: '18px' }}>
        Styled text
      </p>

      {/* Self closing */}
      <input type="text" placeholder="Self closing tag" />
    </div>
  );
}

export default JSX;