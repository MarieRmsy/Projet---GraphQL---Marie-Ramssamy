import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../graphql/authorQueries';
import './PageStyles.css'; // Fichier de style CSS

const AuthorsPage = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <p>Chargement des realisateurs...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="page-container">
      <h1>Liste des Realisateurs</h1>
      <div className="authors-list">
        {data.authors.map(author => (
          <div key={author.id} className="author-item">
            <p>Prénom : {author.firstname}</p>
            <p>Nom : {author.lastname}</p>
            <p>Date de Naissance : {author.birthdate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorsPage;
