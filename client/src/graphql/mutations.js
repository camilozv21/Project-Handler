import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      statusCode
      message
      token
      expiresIn
    }
  }
`;

export { LOGIN_MUTATION };