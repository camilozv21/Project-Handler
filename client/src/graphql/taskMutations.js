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
    $status: String!
  ) {
    updateTask(
      id: $id
      name: $name
      description: $description
      deadLine: $deadLine
      status: $status
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

const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      statusCode
    }
  }
`;

export { ADD_TASK_MUTATION, EDIT_TASK_MUTATION, DELETE_TASK_MUTATION };