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

const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $lastname: String!, $email: String!, $password: String!, $image: String!) {
    addUser(name: $name, lastname: $lastname, email: $email, password: $password, image: $image) {
      statusCode
      message
    }
  }
`;

export { LOGIN_MUTATION, REGISTER_MUTATION };