import { useQuery } from "@apollo/client"
import { GET_PROJECTS_QUERY } from "../graphql/projectQueries"

export const ShowProjects = (props) => {
  const { loading, error, data } = useQuery(GET_PROJECTS_QUERY);

  if (loading) return <div className="text-center"><div
    className="spinner-border text-primary"
    role="status"
  ></div></div>;
  if (error) return <p>Error : {error}</p>;

  const handleOnClick = (projectId) => {
    props.setSelectedProjectId(projectId)
    props.togglePrincipalContent()
  }

  return (
    <>
      {data.projects.projects.map((project, i) => (
        <div key={project.name + i} className="flex flex-row items-center gap-2 cursor-pointer px-2" onClick={() => handleOnClick(project.id)}>
          <img src={project.image} alt={project.name} className="h-10 w-10 rounded-full" />
          <p className="text-center mb-0 font-semibold">{project.name}</p>
        </div>
      ))}
    </>
  );
};