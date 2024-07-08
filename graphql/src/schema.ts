export const typeDefs = `#graphql
type Author {
  birthdate: String
  firstname: String
  lastname: String
}

input AuthorInput {
  birthdate: String!
  firstname: String!
  lastname: String!
}

type Film {
  authors: [Author]
  genre: String
  numbernote: Int
  title: String
  year: String
}

input FilmInput {
  authors: [AuthorInput]
  genre: String
  numbernote: Int
  title: String
  year: String
}

type Mutation {
  addAuthor(birthdate: String!, firstname: String!, lastname: String!): Author
  addFilm(authors: [AuthorInput]!, genre: String!, numbernote: Int!, title: String!, year: String!): Film
  addSeries(description: String, films: [FilmInput], title: String!): Series
  deleteAuthor(firstname: String!, lastname: String!): Boolean
  deleteFilm(title: String!): Boolean
  deleteSeries(title: String!): Boolean
  modifyAuthor(birthdate: String!, firstname: String!, lastname: String!, newBirthdate: String!, newFirstname: String!, newLastname: String!): Author
  modifyFilm(authors: [AuthorInput]!, findTitle: String!, genre: String!, numbernote: Int!, title: String!, year: String!): Film
  modifySeries(description: String, findTitle: String!, films: [FilmInput], title: String!): Series
}

type Query {
  authors: [Author]
  films: [Film]
  series: [Series]
}

type Series {
  description: String
  films: [Film]
  title: String!
}`;