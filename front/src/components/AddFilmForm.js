import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_FILM, GET_FILMS } from '../graphql/filmQueries';
import { GET_AUTHORS } from '../graphql/authorQueries';

const AddFilmForm = () => {
  const [title, setTitle] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [numbernote, setNumbernote] = useState(0);

  const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(GET_AUTHORS);
  const [addFilm] = useMutation(ADD_FILM, {
    update(cache, { data: { addFilm } }) {

      const { films } = cache.readQuery({ query: GET_FILMS }); // MAJ du cache (après ajout film)
      cache.writeQuery({
        query: GET_FILMS,
        data: { films: [...films, addFilm] },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addFilm({
        variables: {
          title,
          authors: selectedAuthors.map(author => ({
            firstname: author.firstname,
            lastname: author.lastname,
            birthdate: author.birthdate
          })),
          year,
          genre,
          numbernote
        },
      });
      console.log('Nouveau film ajouté :', data.addFilm);
      // Réinitialiser les champs du formulaire après l'ajout
      setTitle('');
      setSelectedAuthors([]);
      setYear('');
      setGenre('');
      setNumbernote(0);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du film :', error);
    }
  };

  const handleAuthorSelect = (index, author) => {
    const newSelectedAuthors = [...selectedAuthors];
    newSelectedAuthors[index] = author;
    setSelectedAuthors(newSelectedAuthors);
  };

  const addAuthorField = () => {
    setSelectedAuthors([...selectedAuthors, { firstname: '', lastname: '', birthdate: '' }]);
  };

  const removeAuthorField = (index) => {
    const newSelectedAuthors = selectedAuthors.filter((_, i) => i !== index);
    setSelectedAuthors(newSelectedAuthors);
  };

  if (authorsLoading) return <p>Chargement des realisateurs...</p>;
  if (authorsError) return <p>Erreur de chargement des realisateurs : {authorsError.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre du film :
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      {selectedAuthors.map((author, index) => (
        <div key={index}>
          <label>
            Sélectionner un realisateur :
            <select
              value={`${author.firstname} ${author.lastname}`}
              onChange={(e) => {
                const selected = authorsData.authors.find(a => `${a.firstname} ${a.lastname}` === e.target.value);
                handleAuthorSelect(index, selected);
              }}
            >
              <option value="">Sélectionner un realisateur</option>
              {authorsData.authors.map((a, i) => (
                <option key={i} value={`${a.firstname} ${a.lastname}`}>
                  {a.firstname} {a.lastname}
                </option>
              ))}
            </select>
          </label>
          {author.firstname && (
            <div>
              <p>Prénom : {author.firstname}</p>
              <p>Nom : {author.lastname}</p>
              <p>Date de naissance : {author.birthdate}</p>
            </div>
          )}
          <button type="button" onClick={() => removeAuthorField(index)}>Supprimer le realisateur</button>
        </div>
      ))}
      <button type="button" onClick={addAuthorField}>Ajouter un realisateur</button>
      <label>
        Publié en :
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required />
      </label>
      <label>
        Genre :
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </label>
      <label>
        Note :
        <input type="number" value={numbernote} onChange={(e) => setNumbernote(parseInt(e.target.value))} required />
      </label>
      <button type="submit">Ajouter Film</button>
    </form>
  );
};

export default AddFilmForm;
