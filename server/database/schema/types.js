const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList } = require('graphql')

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      image: { type: GraphQLString },
      tasks: {
        type: new GraphQLList(TaskType),
        resolve(parent, args) {
          return Task.find({ projectId: parent.id });
        }
      },
      userId: {
        type: UserType,
        resolve(parent, args) {
          return User.findById(parent.userId);
        }
      }
    })
  });
  
  const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      lastname: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      image: { type: GraphQLString },
      projectId: {
        type: new GraphQLList(ProjectType),
        resolve(parent, args) {
          return Project.find({ projectId: parent.projectId });
        }
      },
    })
  });
  
  const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      projectId: {
        type: ProjectType,
        resolve(parent, args) {
          return Project.findById(parent.projectId);
        }
      },
      status: { type: GraphQLString },
      description: { type: GraphQLString },
      deadLine: { type: GraphQLString },
      userId: {
        type: UserType,
        resolve(parent, args) {
          return User.findById(parent.userId);
        }
      }
    })
  });

  module.exports = {
    ProjectType,
    UserType,
    TaskType
  };