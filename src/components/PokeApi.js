import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

const PokeApi = () => {
  const dispatch = useDispatch();
  const [pikachuData, setPikachuData] = useState(null);
  const [charizardData, setCharizardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pikachuPromise = fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
          .then(response => response.json());
        
        const charizardPromise = fetch('https://pokeapi.co/api/v2/pokemon/charizard')
          .then(response => response.json());

        const [pikachuResult, charizardResult] = await Promise.all([pikachuPromise, charizardPromise]);
        
        setPikachuData(pikachuResult);
        setCharizardData(charizardResult);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      <header className="flex justify-between items-center py-4">
        <Link
          to="/"
          className="bg-indigo-600 px-2 py-1 rounded-sm text-sm shadow-sm"
        >
          Back
        </Link>      
      </header>        
      <div className='bg-neutral-800 p-4 rounded-md'>
        <h2>Pikachu</h2>
        {pikachuData && (
            <div>
            <p>Nombre: {pikachuData.name}</p>
            <p>Altura: {pikachuData.height}</p>
            <p>Peso: {pikachuData.weight}</p>
            {/* Otros datos de Pikachu */}
            </div>
        )}
      </div>
      <div className='bg-neutral-800 p-4 rounded-md'>
        <h2>Charizard</h2>
        {charizardData && (
            <div>
            <p>Nombre: {charizardData.name}</p>
            <p>Altura: {charizardData.height}</p>
            <p>Peso: {charizardData.weight}</p>
            {/* Otros datos de Charizard */}
            </div>
        )}
      </div>
    </div>
  );
};

export default PokeApi;