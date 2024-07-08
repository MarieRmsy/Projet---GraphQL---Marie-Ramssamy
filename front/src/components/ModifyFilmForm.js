import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { MODIFY_FILM } from '../graphql/filmQueries';
import { GET_AUTHORS } from '../graphql/authorQueries';

const ModifyFilmForm = () => {
  const [findTitle, setFindTitle] = useState('');
  const [title, setTitle] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [numbernote, setNumbernote] = useState(0);

  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [modifyFilm] = useMutation(MODIFY_FILM);

  useEffect(() => {
    if (!loading && data) {
      setAuthors(data.authors);
    }
  }, [loading, data]);

  const [authors, setAuthors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await modifyFilm({
        variables: {
          findTitle,
          title,
          authors: selectedAuthors.map(author => ({
            firstname: author.firstname,
            lastname: author.lastname,
            birthdate: author.birthdate
          })),
          year,
          genre,
          numbernote
        }
      });
      console.log('Film modifié :', data.modifyFilm);
      // Réinitialiser les champs du formulaire après la modification
      setFindTitle('');
      setTitle('');
      setSelectedAuthors([]);
      setYear('');
      setGenre('');
      setNumbernote(0);
    } catch (error) {
      console.error('Erreur lors de la modification du film :', error);
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

  if (loading) return <p>Chargement des realisateurs...</p>;
  if (error) return <p>Erreur de chargement des realisateurs : {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre du film à modifier :
        <input type="text" value={findTitle} onChange={(e) => setFindTitle(e.target.value)} required />
      </label>
      <label>
        Nouveau titre :
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
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
      {selectedAuthors.map((author, index) => (
        <div key={index}>
          <label>
            Sélectionner un realisateur :
            <select
              value={`${author.firstname} ${author.lastname}`}
              onChange={(e) => {
                const selected = authors.find(a => `${a.firstname} ${a.lastname}` === e.target.value);
                handleAuthorSelect(index, selected);
              }}
            >
              <option value="">Sélectionner un realisateur</option>
              {authors.map((a, i) => (
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
      <button type="submit">Modifier Film</button>
    </form>
  );
};

export default ModifyFilmForm;
