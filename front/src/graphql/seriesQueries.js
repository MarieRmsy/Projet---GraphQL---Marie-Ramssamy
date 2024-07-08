// src/graphql/seriesQueries.js

import { gql } from '@apollo/client';

export const GET_SERIES = gql`
  query {
    series {
      title
      description
      films {
        title
      }
    }
  }
`;

export const ADD_SERIES = gql`
  mutation AddSeries($title: String!, $description: String!, $films: [FilmInput]!) {
    addSeries(title: $title, description: $description, films: $films) {
      title
      description
      films {
        title
      }
    }
  }
`;


export const MODIFY_SERIES = gql`
  mutation ModifySeries($findTitle: String!, $title: String!, $description: String!, $films: [String!]!) {
    modifySeries(findTitle: $findTitle, title: $title, description: $description, films: $films) {
      title
      description
      films
    }
  }
`;

export const DELETE_SERIES = gql`
  mutation DeleteSeries($title: String!) {
    deleteSeries(title: $title)
  }
`;
