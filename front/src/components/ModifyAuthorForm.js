// src/components/ModifyAuthorForm.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MODIFY_AUTHOR } from '../graphql/authorQueries';

const ModifyAuthorForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [newFirstname, setNewFirstname] = useState('');
  const [newLastname, setNewLastname] = useState('');
  const [newBirthdate, setNewBirthdate] = useState('');

  const [modifyAuthor] = useMutation(MODIFY_AUTHOR);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await modifyAuthor({
        variables: {
          firstname,
          lastname,
          birthdate,
          newFirstname,
          newLastname,
          newBirthdate
        }
      });
      console.log('Realisateur modifié :', data.modifyAuthor);
      // Réinitialiser les champs du formulaire après la modification
      setFirstname('');
      setLastname('');
      setBirthdate('');
      setNewFirstname('');
      setNewLastname('');
      setNewBirthdate('');
    } catch (error) {
      console.error('Erreur lors de la modification du realisateur :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prénom du realisateur à modifier :
        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
      </label>
      <label>
        Nom du realisateur à modifier :
        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
      </label>
      <label>
        Date de naissance du realisateur à modifier :
        <input type="text" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </label>
      <label>
        Nouveau prénom :
        <input type="text" value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)} />
      </label>
      <label>
        Nouveau nom :
        <input type="text" value={newLastname} onChange={(e) => setNewLastname(e.target.value)} />
      </label>
      <label>
        Nouvelle date de naissance :
        <input type="text" value={newBirthdate} onChange={(e) => setNewBirthdate(e.target.value)} />
      </label>
      <button type="submit">Modifier Realisateur</button>
    </form>
  );
};

export default ModifyAuthorForm;
