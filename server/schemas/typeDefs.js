// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`

    input BookInput {
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Book {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }    

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(_id: ID, input: BookInput): User
        removeBook(bookId: ID): User
    }
`;

// export typeDefs
module.exports = typeDefs;