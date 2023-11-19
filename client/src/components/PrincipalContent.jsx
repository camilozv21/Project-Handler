import { useQuery } from "@apollo/client"
import { GET_PROJECT_QUERY } from "../graphql/projectQueries"
import { TaskCard } from "./TaskCard";

export const PrincipalContent = (props) => {
  const { loading, error, data } = useQuery(GET_PROJECT_QUERY, {
    variables: {
      projectId: props.projectId
    }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data.project.project)
  return (
    <>
      <div className="w-full h-full">
        <div className="flex flex-row gap-3 container py-3">
          <img src={data.project.project.image} alt={data.project.project.name} className="rounded w-20 h-auto" />
          <p className="text-center text-2xl font-semibold mb-0 capitalize">{data.project.project.name}</p>
        </div>
        <div className="container border w-full h-auto p-4">
          <div className="grid grid-cols-4 place-items-center">
            {data.project.project.tasks && data.project.project.tasks.map((task) => {
              return (
                <TaskCard
                  key={task.id}
                  name={task.name}
                  status={task.status}
                  deadline={task.deadline}
                  image={task.image}
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
