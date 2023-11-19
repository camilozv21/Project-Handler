import { gql } from '@apollo/client';

const ADD_PROJECT_MUTATION = gql`
  mutation AddProject($name: String!, $image: String!) {
    addProject(name: $name, image: $image) {
      statusCode
    }
  }
`;

export { ADD_PROJECT_MUTATION };