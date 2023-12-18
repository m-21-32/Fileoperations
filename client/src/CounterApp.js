import React, { useEffect } from 'react';
import { useCounter } from './useCounter';

function CounterApp() {
  const { count, increment, decrement } = useCounter(0);


  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <h1>Counter Application</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default CounterApp;
