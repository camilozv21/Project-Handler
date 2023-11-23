import { gql } from "@apollo/client";

const ADD_TASK_MUTATION = gql`
  mutation AddTask(
    $projectId: ID!
    $name: String!
    $description: String!
    $deadLine: String!
  ) {
    addTask(
      projectId: $projectId
      name: $name
      description: $description
      deadLine: $deadLine
    ) {
      statusCode
      task {
        id
        name
        description
        deadLine
        status
      }
    }
  }
`;

export { ADD_TASK_MUTATION };