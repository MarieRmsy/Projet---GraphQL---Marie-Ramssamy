import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_AUTHOR, GET_AUTHORS } from '../graphql/authorQueries';

const DeleteAuthor = () => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [deleteAuthor] = useMutation(DELETE_AUTHOR);
  const { loading, error, data, refetch } = useQuery(GET_AUTHORS);

  useEffect(() => {
    if (data) {
      // Sélectionner le premier realisateur par défaut
      if (data.authors.length > 0) {
        setSelectedAuthor(`${data.authors[0].firstname} ${data.authors[0].lastname}`);
      }
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [firstname, lastname] = selectedAuthor.split(' ');
      await deleteAuthor({ variables: { firstname, lastname } });
      // Réinitialiser la sélection après la suppression
      await refetch(); // Rafraîchir les données des realisateurs après la suppression
      if (data.authors.length > 1) {
        setSelectedAuthor(`${data.authors[0].firstname} ${data.authors[0].lastname}`);
      } else {
        setSelectedAuthor('');
      }
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sélectionnez le realisateur à supprimer :
        <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)} required>
          {data.authors.map((author) => (
            <option key={author.id} value={`${author.firstname} ${author.lastname}`}>
              {author.firstname} {author.lastname}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Supprimer le realisateur</button>
    </form>
  );
};

export default DeleteAuthor;
