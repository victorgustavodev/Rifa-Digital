import { useState, useEffect } from 'react';

const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Tempo em milissegundos para simular o carregamento

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${loading ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full bg-gray-500 opacity-75 z-50 flex justify-center items-center`}>
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
    </div>
  );
};

export default Loading;