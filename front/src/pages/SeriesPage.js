import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SERIES } from '../graphql/seriesQueries';
import './PageStyles.css'; // Fichier de style CSS

const SeriesPage = () => {
  const { loading, error, data } = useQuery(GET_SERIES);

  if (loading) return <p>Chargement des séries...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="page-container">
      <h1>Liste des Séries</h1>
      <div className="series-list">
        {data.series.map(series => (
          <div key={series.id} className="series-item">
            <h2>{series.title}</h2>
            <p>Description : {series.description}</p>
            <p>Films Associés :</p>
            <ul>
              {series.films.map(film => (
                <li key={film.id}>{film.title}</li>
              ))}
            </ul>
            {/* Ajoutez d'autres détails selon les besoins */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesPage;
