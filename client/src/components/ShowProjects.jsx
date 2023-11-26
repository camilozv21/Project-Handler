import { useQuery } from "@apollo/client"
import { GET_PROJECTS_QUERY } from "../graphql/projectQueries"
import { Trash } from 'react-bootstrap-icons';
import { DELETE_PROJECT_MUTATION } from "../graphql/projectMutations";
import { useMutation } from "@apollo/client";

export const ShowProjects = (props) => {
  const { loading, error, data } = useQuery(GET_PROJECTS_QUERY);
  const [deleteProjectMutation, { loading: loadingDelete }] = useMutation(DELETE_PROJECT_MUTATION);

  if (loading) return <div className="text-center"><div
    className="spinner-border text-primary"
    role="status"
  ></div></div>;
  if (error) return <p>Error : {error}</p>;

  const handleOnClick = (projectId) => {
    props.setSelectedProjectId(projectId)
    props.togglePrincipalContent()
  }


  const handleDeleteProject = (projectId) => {
    deleteProjectMutation({
      variables: {
        id: projectId
      }
    }).then(() => {
      alert("Proyecto eliminado");
      window.location.reload();
    });
  }

  return (
    <>
      {data.projects.projects.map((project, i) => {
        let imageUrl = project.image.startsWith('project') ? 'https://res.cloudinary.com/dj5kafiwa/image/upload/v1701020823/assets/project_default.jpg' : project.image;
        return (
          <div key={project.name + i} className="flex flex-row items-center gap-2 cursor-pointer px-2" onClick={() => handleOnClick(project.id)}>
            <img src={imageUrl} alt={project.name} className="h-10 w-10 rounded-full" />
            <p className="text-center mb-0 font-semibold">{project.name}</p>
            <Trash className="text-red-500" onClick={() => handleDeleteProject(project.id)} />
          </div>
        )
      })}
    </>
  );
};