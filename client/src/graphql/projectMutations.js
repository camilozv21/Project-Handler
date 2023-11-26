import { gql } from '@apollo/client';

const ADD_PROJECT_MUTATION = gql`
  mutation AddProject($name: String!, $image: String!) {
    addProject(name: $name, image: $image) {
      statusCode
    }
  }
`;

const DELETE_PROJECT_MUTATION = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      statusCode
    }
  }
`;

export { ADD_PROJECT_MUTATION, DELETE_PROJECT_MUTATION };