import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_AUTHOR, GET_AUTHORS } from '../graphql/authorQueries';
import './form.css';

const AddAuthorForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [addAuthor] = useMutation(ADD_AUTHOR);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addAuthor({
        variables: {
          firstname,
          lastname,
          birthdate
        },
        refetchQueries: [{ query: GET_AUTHORS }], 
      });
      console.log('Nouveau realisateur ajouté :', data.addAuthor);
      // pour réinitialiser
      setFirstname('');
      setLastname('');
      setBirthdate('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du realisateur :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prénom :
        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
      </label>
      <label>
        Nom :
        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
      </label>
      <label>
        Date de naissance :
        <input type="text" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
      </label>
      <button type="submit">Ajouter Realisateur</button>
    </form>
  );
};

export default AddAuthorForm;
