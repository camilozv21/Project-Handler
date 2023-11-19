import { CreateProjectModal } from "./CreateProjectModal"
import { useState } from "react"
import { ShowProjects } from "./ShowProjects"

export const Sidebar = () => {
  const [showCreateProject, setShowCreateProject] = useState(false)

  return (
    <>
      <button className="p-2 border-t-blue-700" onClick={() => setShowCreateProject(true)}>Crear Proyecto +</button>
      <hr className="mt-0 border-t-blue-900 border-t-4" />
      <CreateProjectModal show={showCreateProject} onHide={() => setShowCreateProject(false)} />
      <ShowProjects />
    </>
  )
}
