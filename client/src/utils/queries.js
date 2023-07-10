import { gql } from '@apollo/client';

export const GET_USER = gql`
    query User {
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }

`;