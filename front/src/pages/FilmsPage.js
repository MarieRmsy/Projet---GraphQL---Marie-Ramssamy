import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_FILMS } from '../graphql/filmQueries';
import './PageStyles.css'; // Fichier de style CSS

const FilmsPage = () => {
  const { loading, error, data } = useQuery(GET_FILMS);

  if (loading) return <p>Chargement des films...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="page-container">
      <h1>Liste des Films</h1>
      <div className="films-list">
        {data.films.map(film => (
          <div key={film.id} className="film-item">
            <h2>{film.title}</h2>
            <p>Publié en : {film.year}</p>
            <p>Genre : {film.genre}</p>
            <p>Note : {film.numbernote}</p>
            <p>Realisateurs :</p>
            <ul>
              {film.authors.map(author => (
                <li key={author.id}>{`${author.firstname} ${author.lastname}`}</li>
              ))}
            </ul>
            {/* Ajoutez d'autres détails selon les besoins */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmsPage;
