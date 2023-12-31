const {
  project,
  projects,
  addProject,
  updateProject,
  deleteProject,
} = require("./rootTypes/project");

const {
  user,
  addUser,
  updateUser,
  deleteUser,
  login
} = require("./rootTypes/user");

const {
  task,
  addTask,
  updateTask,
  deleteTask,
} = require("./rootTypes/task");

const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    project,
    projects,
    user,
    task,
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProject,
    updateProject,
    deleteProject,
    addUser,
    updateUser,
    deleteUser,
    login,
    addTask,
    updateTask,
    deleteTask,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
