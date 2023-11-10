const Project = require("../models/Project");
const User = require("../models/User");
const Task = require("../models/Task");
const { createToken } = require("../../middleware/auth");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        return Task.find({ projectId: parent.id });
      },
    },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
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
      },
    },
  }),
});

const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    projectId: {
      type: ProjectType,
      resolve(parent, args) {
        return Project.findById(parent.projectId);
      },
    },
    status: { type: GraphQLString },
    description: { type: GraphQLString },
    deadLine: { type: GraphQLString },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Task.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        if (args.userId) {
          return Project.find({ userId: args.userId });
        } else {
          return Project.find({});
        }
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        return Task.find({});
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        let project = new Project({
          name: args.name,
          image: args.image,
          userId: args.userId,
        });

        const newProject = await project.save();
        const user = await User.findById(args.userId);
        user.projectId.push(newProject.id);
        await user.save();
        return newProject;
      },
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          lastname: args.lastname,
          email: args.email,
          password: args.password,
          image: args.image,
        });
        return user.save();
      },
    },
    addTask: {
      type: TaskType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        deadLine: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        let task = new Task({
          name: args.name,
          projectId: args.projectId,
          status: args.status,
          description: args.description,
          deadLine: args.deadLine,
          userId: args.userId,
        });

        const newTask = await task.save();
        const project = await Project.findById(args.projectId);
        project.tasks.push(newTask.id);
        await project.save();
        return newTask;
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        image: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              image: args.image,
            },
          },
          { new: true }
        );
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        image: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              lastname: args.lastname,
              email: args.email,
              password: args.password,
              image: args.image,
            },
          },
          { new: true }
        );
      },
    },
    updateTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        project: { type: GraphQLID },
        status: { type: GraphQLString },
        description: { type: GraphQLString },
        deadLine: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Task.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              project: args.project,
              status: args.status,
              description: args.description,
              deadLine: args.deadLine,
            },
          },
          { new: true }
        );
      },
    },
    deleteProject: {
      type: ProjectType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Project.findById(args.id).then((project) => {
          project.tasks.forEach((taskId) => {
            Task.findByIdAndDelete(taskId);
          });
          return Project.findByIdAndDelete(args.id);
        });
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return User.findById(args.id).then((user) => {
          user.projectId.forEach((projectId) => {
            Project.findById(projectId).then((project) => {
              project.tasks.forEach((taskId) => {
                Task.findByIdAndDelete(taskId);
              });
              Project.findByIdAndDelete(projectId);
            });
          });
          return User.findByIdAndDelete(args.id);
        });
      },
    },
    deleteTask: {
      type: TaskType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Task.findByIdAndDelete(args.id);
      },
    },
    login: {
      type: GraphQLString,
      description: "login that retrieves a token as string",
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        try {
          const { email, password } = args;

          var user = await User.findOne({ email: email });

          if (user && password === user.password) {
            return createToken(user);
          } else {
            throw new Error("Credenciales incorrectas");
          }
        } catch (error) {
          throw new Error("Error en el login: " + error);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
