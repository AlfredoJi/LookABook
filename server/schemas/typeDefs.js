const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookid: String
    authors: [Authors!]
    description: String!
    title: String!
    image: String!
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    user: User
}

input saveBooks {
    authors: [Authors!]
    bookId: String!
    description: String!
    title: String!
    image: String
    link: String
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(criteria: saveBooks): User
    deleteBook(bookId: String!): Auth
}
`;

module.exports = typeDefs;