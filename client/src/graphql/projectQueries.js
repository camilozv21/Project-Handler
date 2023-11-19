import { gql } from "@apollo/client";

const GET_PROJECTS_QUERY = gql`
  query GetProjects {
    projects {
      statusCode
      projects {
        name
        image
      }
    }
  }
`;

export { GET_PROJECTS_QUERY };