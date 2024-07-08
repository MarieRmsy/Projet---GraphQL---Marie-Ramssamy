import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_SERIES, GET_SERIES} from '../graphql/seriesQueries'; // Assurez-vous d'avoir votre mutation d'ajout de série
import { GET_FILMS } from '../graphql/filmQueries'; // Importez la query GET_FILMS

const AddSeriesForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFilms, setSelectedFilms] = useState([]);

  const { loading: filmsLoading, error: filmsError, data: filmsData } = useQuery(GET_FILMS); // Utilisez la query GET_FILMS

  const [addSeries] = useMutation(ADD_SERIES, {
    update(cache, { data: { addSeries } }) {
      // Mise à jour du cache après l'ajout d'une série
      const { series } = cache.readQuery({ query: GET_SERIES });
      cache.writeQuery({
        query: GET_SERIES,
        data: { series: [...series, addSeries] },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addSeries({
        variables: {
          title,
          description,
          films: selectedFilms.map(film => ({ title: film.title }))
        },
      });
      console.log('Nouvelle série ajoutée :', data.addSeries);
      // Réinitialiser les champs du formulaire après l'ajout
      setTitle('');
      setDescription('');
      setSelectedFilms([]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la série :', error);
    }
  };

  const handleFilmSelect = (e) => {
    const selectedTitles = Array.from(e.target.selectedOptions, option => option.value);
    const selectedFilms = filmsData.films.filter(film => selectedTitles.includes(film.title));
    setSelectedFilms(selectedFilms);
  };

  const removeFilmField = (index) => {
    const newSelectedFilms = [...selectedFilms];
    newSelectedFilms.splice(index, 1);
    setSelectedFilms(newSelectedFilms);
  };

  if (filmsLoading) return <p>Chargement en cours...</p>;
  if (filmsError) return <p>Erreur de chargement : {filmsError.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre  :
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description :
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Sélectionner les films :
        <select
          multiple
          value={selectedFilms.map(film => film.title)}
          onChange={handleFilmSelect}
          required
        >
          {filmsData.films.map((film, index) => (
            <option key={index} value={film.title}>
              {film.title}
            </option>
          ))}
        </select>
      </label>
      {selectedFilms.map((film, index) => (
        <div key={index}>
          <p>Titre du film : {film.title}</p>
          <button type="button" onClick={() => removeFilmField(index)}>Supprimer le film</button>
        </div>
      ))}
      <button type="submit">Ajouter Série</button>
    </form>
  );
};

export default AddSeriesForm;
