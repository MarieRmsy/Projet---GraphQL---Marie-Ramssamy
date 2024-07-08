import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_FILM, GET_FILMS } from '../graphql/filmQueries';

const DeleteFilm = () => {
  const [selectedFilm, setSelectedFilm] = useState('');
  const [deleteFilm] = useMutation(DELETE_FILM);

  const { loading, error, data, refetch } = useQuery(GET_FILMS);

  useEffect(() => {
    if (data) {
      // Sélectionner le premier film par défaut
      if (data.films.length > 0) {
        setSelectedFilm(data.films[0].title);
      }
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteFilm({ variables: { title: selectedFilm } });
      // Réinitialiser la sélection après la suppression
      await refetch(); // Rafraîchir les données des films après la suppression
      if (data.films.length > 1) {
        setSelectedFilm(data.films[0].title);
      } else {
        setSelectedFilm('');
      }
    } catch (error) {
      console.error('Error deleting film:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sélectionner le film à supprimer :
        <select value={selectedFilm} onChange={(e) => setSelectedFilm(e.target.value)} required>
          {data.films.map((film) => (
            <option key={film.id} value={film.title}>
              {film.title}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Supprimer le Film</button>
    </form>
  );
};

export default DeleteFilm;
