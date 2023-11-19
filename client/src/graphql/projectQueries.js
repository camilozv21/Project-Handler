import { gql } from "@apollo/client";

const GET_PROJECTS_QUERY = gql`
  query GetProjects {
    projects {
      statusCode
      projects {
        id
        name
        image
      }
    }
  }
`;

const GET_PROJECT_QUERY = gql`
  query GetProject($projectId: ID!) {
    project(projectId: $projectId) {
      project {
        id
        name
        image
        tasks {
          id
          name
          image
          description
          deadLine
          status
        }
      }
    }
  }
`;

export { GET_PROJECTS_QUERY, GET_PROJECT_QUERY };