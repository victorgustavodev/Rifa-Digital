import { useState, useEffect } from 'react';

const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100000); // Tempo em milissegundos para simular o carregamento

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${loading ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full bg-gray-500 opacity-75 z-50 flex justify-center items-center`}>
      <div className="loader ease-linear rounded-full border-4 border-t-4 lg:border-8 lg:border-t-8 border-gray-200 h-12 w-12 lg:h-24 lg:w-24 border-t-gray-800 animate-spin-slow"></div>
    </div>
  );
};

export default Loading;
