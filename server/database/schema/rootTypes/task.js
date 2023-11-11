const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
} = require("graphql");
const { TaskType } = require("../types");
const { getTaskById, createTask, editTask, removeTask } = require("../../controllers/taskController");

const task = {
  type: new GraphQLObjectType({
    name: "TaskResult",
    fields: () => ({
      task: { type: TaskType },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  args: { id: { type: GraphQLID } },
  async resolve(_, args, context) {
    return await getTaskById(args, context);
  },
};

const addTask = {
  type: new GraphQLObjectType({
    name: "AddTaskResult",
    fields: () => ({
      task: { type: TaskType },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    projectId: { type: new GraphQLNonNull(GraphQLID) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    deadLine: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, args, context) {
    return await createTask(args, context);
  },
};

const updateTask = {
  type: new GraphQLObjectType({
    name: "UpdateTaskResult",
    fields: () => ({
      task: { type: TaskType },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    project: { type: GraphQLID },
    status: { type: GraphQLString },
    description: { type: GraphQLString },
    deadLine: { type: GraphQLString },
  },
  async resolve(_, args, context) {
    return await editTask(args, context)
  },
};

const deleteTask = {
  type: new GraphQLObjectType({
    name: "DeleteTaskResult",
    fields: () => ({
      task: { type: TaskType },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  async resolve(_, args, context) {
    return await removeTask(args);
  },
};

module.exports = {
  task,
  addTask,
  updateTask,
  deleteTask,
};
