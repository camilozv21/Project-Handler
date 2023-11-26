import React from 'react';
import { Resizable } from 're-resizable';
import { Sidebar } from '../components/Sidebar';
import { useState } from 'react';
import { PrincipalContent } from '../components/PrincipalContent';

export const Dashboard = () => {
  const [showPrincipalContent, setShowPrincipalContent] = useState(true)
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(false)

  const togglePrincipalContent = () => {
    setShowPrincipalContent(showPrincipalContent)
    setIsFirstTime(true)
  }

  return (
    <div className="flex h-screen">
      <Resizable
        className=" bg-blue-100 shadow border-r-4 hover:border-blue-300 transition-colors 0.2s md:max-w-xs"
        defaultSize={{
          width: 200,
          height: '100%',
        }}
        minWidth={85}
        maxWidth={300}
        enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
      >
        <Sidebar togglePrincipalContent={togglePrincipalContent} setSelectedProjectId={setSelectedProjectId} />
      </Resizable>
      <div className="bg-white flex-grow">
        {showPrincipalContent && isFirstTime ? <PrincipalContent projectId={selectedProjectId} /> :
          <div className='flex justify-center items-center w-full h-full'>
            <img src='https://res.cloudinary.com/dj5kafiwa/image/upload/v1700750979/assets/noproject.png' alt="No project image" className='rounded shadow w-full h-auto sm:w-3/5 sm:h-3/5' />
          </div>
        }
      </div>
    </div>
  )
}