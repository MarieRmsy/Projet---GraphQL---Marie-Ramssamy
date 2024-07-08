// src/graphql/filmQueries.js
import { gql } from '@apollo/client';

export const GET_FILMS = gql`
  query {
    films {
      title
      authors {
        firstname
        lastname
        birthdate
      }
      year
      genre
      numbernote
    }
  }
`;

export const ADD_FILM = gql`
  mutation AddFilm($title: String!, $authors: [AuthorInput!]!, $year: String!, $genre: String!, $numbernote: Int!) {
    addFilm(title: $title, authors: $authors, year: $year, genre: $genre, numbernote: $numbernote) {
      title
      year
      genre
      numbernote
      authors {
        firstname
        lastname
        birthdate
      }
    }
  }
`;

export const DELETE_FILM = gql`
  mutation DeleteFilm($title: String!) {
    deleteFilm(title: $title)
  }
`;

export const MODIFY_FILM = gql`
  mutation ModifyFilm($findTitle: String!, $title: String!, $authors: [AuthorInput]!, $year: String!, $genre: String!, $numbernote: Int!) {
    modifyFilm(findTitle: $findTitle, title: $title, authors: $authors, year: $year, genre: $genre, numbernote: $numbernote) {
      title
      authors {
        firstname
        lastname
        birthdate
      }
      year
      genre
      numbernote
    }
  }
`;