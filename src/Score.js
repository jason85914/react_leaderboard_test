import { useState, useEffect } from "react";

const Score = ({ score, prevScore }) => {
  const [counter, setCountr] = useState(prevScore);

  useEffect(() => {
    const plus = 75;
    if (counter >= prevScore) {
      return;
    }

    let id = setInterval(() => {
      setCountr((count) => count + plus);
    });
    return () => clearInterval(id);
  }, [counter, prevScore]);

  useEffect(() => {
    const plus = 1;
    if (counter >= score) {
      return;
    }

    let id = setInterval(() => {
      setCountr((count) => count + plus);
    });
    return () => clearInterval(id);
  }, [counter, score]);

  return <div>{counter}pt</div>;
};

export default Score;
