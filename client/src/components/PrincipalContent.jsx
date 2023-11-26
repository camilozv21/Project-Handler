import { useQuery } from "@apollo/client"
import { GET_PROJECT_QUERY } from "../graphql/projectQueries"
import { TaskCard } from "./TaskCard";
import { TaskFormModal } from "./TaskFormModal";
import { useEffect } from "react";

export const PrincipalContent = (props) => {
  const { loading, error, data } = useQuery(GET_PROJECT_QUERY, {
    variables: {
      projectId: props.projectId
    }
  });

  useEffect(() => {
  }, [data])

  if (loading) return <div className="text-center"><div
    className="spinner-border text-primary"
    role="status"
  ></div></div>;
  if (error) return <p>Error : {error.message}</p>;

  let imageUrl = data.project.project.image.startsWith('project') ? 'https://res.cloudinary.com/dj5kafiwa/image/upload/v1701020823/assets/project_default.jpg' : data.project.project.image;

  let altUrl = data.project.project.image.startsWith('project') ? data.project.project.image : 'Imagen por defecto';

  return (
    <>
      <div className="w-full h-full">
        <div className="flex flex-row gap-3 py-3">
          <img src={imageUrl} alt={altUrl} className="rounded w-20 h-auto" />
          <p className="text-center text-2xl font-semibold mb-0 capitalize">{data.project.project.name}</p>
        </div>
        <div className="w-full h-auto p-4">
          <div className="grid grid-flow-row grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
            <TaskFormModal projectId={props.projectId} />
            {data.project.project.tasks && data.project.project.tasks.map((task) => {
              return (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  status={task.status}
                  deadLine={task.deadLine}
                  description={task.description}
                  projectId={props.projectId}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
