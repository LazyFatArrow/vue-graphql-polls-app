// load .env content into process.env
require('dotenv').config()

import "@babel/polyfill";
import mongoose from 'mongoose'
import { resolve } from 'path'
import { mergeTypes, fileLoader } from 'merge-graphql-schemas';
import { ApolloServer, gql } from 'apollo-server'

import resolvers from './resolvers'

const schema = mergeTypes(
  fileLoader(resolve(__dirname, './schema'))
)

const apolloOptions = {
  typeDefs: gql(schema),
  resolvers,
}
mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    return new ApolloServer(apolloOptions).listen(
      parseInt(process.env.SERVER_PORT)
    )
  })
  .then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
  })