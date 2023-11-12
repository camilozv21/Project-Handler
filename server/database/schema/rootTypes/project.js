const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
} = require("graphql");
const { ProjectType } = require("../types");
const {
  getProjectById,
  getProjects,
  createProject,
  editProject,
  removeProject,
} = require("../../controllers/projectController");

const project = {
  type: new GraphQLObjectType({
    name: "ProjectResult",
    fields: () => ({
      project: { type: ProjectType },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  args: { projectId: { type: GraphQLID } },
  async resolve(_, args, context) {
    return await getProjectById(args, context);
  },
};

const projects = {
  type: new GraphQLObjectType({
    name: "ProjectsResult",
    fields: () => ({
      projects: { type: new GraphQLList(ProjectType) },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  async resolve(_, args, context) {
    return await getProjects(context);
  },
};

const addProject = {
  type: new GraphQLObjectType({
    name: "AddProjectResult",
    fields: () => ({
      project: { type: ProjectType },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
  },
  async resolve(_, args, context) {
    return await createProject(args, context);
  },
};

const updateProject = {
  type: new GraphQLObjectType({
    name: "UpdateProjectResult",
    fields: () => ({
      project: { type: ProjectType },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  async resolve(_, args, context) {
    return await editProject(args, context);
  },
};

const deleteProject = {
  type: new GraphQLObjectType({
    name: "DeleteProjectResult",
    fields: () => ({
      project: { type: ProjectType },
      message: { type: GraphQLString },
      statusCode: { type: GraphQLInt },
    }),
  }),
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  async resolve(_, args, context) {
    return await removeProject(args, context);
  },
};

module.exports = {
  project,
  projects,
  addProject,
  updateProject,
  deleteProject,
};
