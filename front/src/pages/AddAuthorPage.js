// src/pages/AddAuthorPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import AddAuthorForm from '../components/AddAuthorForm';

const AddAuthorPage = () => {
  return (
    <div>
      <h2>Ajouter un Realisateur</h2>
      <AddAuthorForm />
    </div>
  );
};

export default AddAuthorPage;
