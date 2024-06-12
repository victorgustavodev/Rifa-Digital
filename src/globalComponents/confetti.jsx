import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const ConfettiPage = () => {
  const [confettiActive, setConfettiActive] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fadeOutInterval = setInterval(() => {
        setOpacity((prevOpacity) => {
          if (prevOpacity > 0) {
            return prevOpacity - 0.05;
          } else {
            clearInterval(fadeOutInterval);
            setConfettiActive(false);
            return 0;
          }
        });
      }, 100); // Reduz a opacidade a cada 100ms
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {confettiActive && (
        <div style={{ opacity: opacity, transition: 'opacity 0.5s' }}>
          <Confetti numberOfPieces={100} />
        </div>
      )}
    </div>
  );
};

export default ConfettiPage;
