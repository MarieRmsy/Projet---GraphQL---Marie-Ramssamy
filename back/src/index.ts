import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { client } from "./db.ts";
import type { Film, Author, Series, Resolvers} from "../../graphql/src/resolvers.ts";
import {typeDefs} from "../../graphql/src/schema.ts";

const films = client.db('filmvore').collection<Film>('films');
const authors = client.db('filmvore').collection<Author>('authors');
const series = client.db('filmvore').collection<Series>('series');


const resolvers: Resolvers = {
    Query: {
        films: async () => await films.find({}).toArray(),
        authors: async () => await authors.find({}).toArray(),
        series: async () => await series.find({}).toArray(),
      },
      Mutation: {
        addSeries: async (_, { title, description, films }) => {
          const newSeries = { title, description, films };
          await series.insertOne(newSeries);
          return newSeries;
        },
        modifySeries: async (_, { findTitle, title, description, films }) => {
          const result = await series.findOneAndUpdate(
            { title: findTitle },
            { $set: { title, description, films } },
            { returnDocument: 'after' }
          );
          return result;
        },
        deleteSeries: async (_, { title }) => {
          const result = await series.deleteOne({ title });
          return result.deletedCount === 1;
        },
        addFilm: async (_, { title, authors, year, genre, numbernote }) => {
          const newFilm = { title, authors, year, genre, numbernote };
          await films.insertOne(newFilm);
          return newFilm;
        },
        modifyFilm: async (_, { findTitle, title, authors, year, genre, numbernote }) => {
          const result = await films.findOneAndUpdate(
            { title: findTitle },
            { $set: { title, authors, year, genre, numbernote } },
            { returnDocument: 'after' }
          );
          return result;
        },
        deleteFilm: async (_, { title }) => {
          const result = await films.deleteOne({ title });
          return result.deletedCount === 1;
        },
        addAuthor: async (_, { firstname, lastname, birthdate }) => {
            const newAuthor = { firstname, lastname, birthdate };
            await authors.insertOne(newAuthor);
            return newAuthor;
          },
          modifyAuthor: async (_, { firstname, lastname, birthdate, newFirstname, newLastname, newBirthdate }) => {
            const result = await authors.findOneAndUpdate(
              { firstname, lastname, birthdate },
              { $set: { firstname: newFirstname, lastname: newLastname, birthdate: newBirthdate } },
              { returnDocument: 'after' }
            );
            return result;
          },
          deleteAuthor: async (_, { firstname, lastname }) => {
            const result = await authors.deleteOne({ firstname, lastname });
            return result.deletedCount === 1;
          },
    },
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
console.log(`🚀  Server ready at: ${url}`);
