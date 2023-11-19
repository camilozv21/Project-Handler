import { useQuery } from "@apollo/client"
import { GET_PROJECTS_QUERY } from "../graphql/projectQueries"

export const ShowProjects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  return (
    <>
      {data.projects.projects.map((project) => (
        <div key={project.name} className="flex flex-row items-center gap-2">
          <img src={project.image} alt={project.name} className="h-14 w-14 rounded-full" />
          <p className="text-center mb-0">{project.name}</p>
        </div>
      ))}
    </>
  );
};