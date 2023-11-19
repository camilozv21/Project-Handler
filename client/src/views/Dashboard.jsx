import React from 'react';
import { Resizable } from 're-resizable';
import { Sidebar } from '../components/Sidebar';

export const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Resizable
        className=" bg-blue-100 shadow border-r-4 hover:border-blue-300 transition-colors 0.2s md:max-w-xs"
        defaultSize={{
          width: 200,
          height: '100%',
        }}
        minWidth={140}
        maxWidth={300}
        enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
      >
        <Sidebar />
      </Resizable>
      <div className="bg-white flex-grow">
        <p>Contenido principal</p>
      </div>
    </div>
  )
}