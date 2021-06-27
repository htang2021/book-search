const express = require('express');
const path = require('path');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
// const { authMiddleware } = require('./utils/auth');
// const routes = require('./routes');  // commenting out - replaced by graphql

const app = express();
const PORT = process.env.PORT || 6001;

// Create a new Apollo server and pass in gql schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware
});

// integrate Apollo server with express app as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes); // commenting out as this uses api routes

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  
  // log where we can go to test GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

});
