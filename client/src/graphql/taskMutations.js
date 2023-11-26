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

const EDIT_TASK_MUTATION = gql`
  mutation updateTask(
    $id: ID!
    $name: String!
    $description: String!
    $deadLine: String!
  ) {
    updateTask(
      id: $id
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

export { ADD_TASK_MUTATION, EDIT_TASK_MUTATION };