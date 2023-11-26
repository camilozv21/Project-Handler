import { gql } from "@apollo/client";

const GET_USER = gql`
  query GetUserById{
    user{
      user {
        image
      }
    }
  }
`;

export { GET_USER };