import { gql } from '@apollo/client';

// Requête pour récupérer tous les realisateurs
export const GET_AUTHORS = gql`
  query {
    authors {
      firstname
      lastname
      birthdate
    }
  }
`;

// Mutation pour ajouter un nouveau realisateur
export const ADD_AUTHOR = gql`
  mutation AddAuthor($firstname: String!, $lastname: String!, $birthdate: String!) {
    addAuthor(firstname: $firstname, lastname: $lastname, birthdate: $birthdate) {
      firstname
      lastname
      birthdate
    }
  }
`;

// Mutation pour modifier un realisateur existant
export const MODIFY_AUTHOR = gql`
  mutation ModifyAuthor($firstname: String!, $lastname: String!, $birthdate: String!, $newFirstname: String!, $newLastname: String!, $newBirthdate: String!) {
    modifyAuthor(firstname: $firstname, lastname: $lastname, birthdate: $birthdate, newFirstname: $newFirstname, newLastname: $newLastname, newBirthdate: $newBirthdate) {
      firstname
      lastname
      birthdate
    }
  }
`;

// Mutation pour supprimer un realisateur
export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($firstname: String!, $lastname: String!) {
    deleteAuthor(firstname: $firstname, lastname: $lastname)
  }
`;
