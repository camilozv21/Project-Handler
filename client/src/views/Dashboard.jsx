import React from 'react';
import { Resizable } from 're-resizable';

export const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Resizable
        className="bg-gray-200"
        defaultSize={{
          width: 200,
          height: '100%',
        }}
        minWidth={50}
        maxWidth={500}
        enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
      >
        <p>Sidebar</p>
      </Resizable>
      <div className="bg-white flex-grow">
        <p>Contenido principal</p>
      </div>
    </div>
  )
}