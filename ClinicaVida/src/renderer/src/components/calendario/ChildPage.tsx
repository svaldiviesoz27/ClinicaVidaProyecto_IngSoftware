import React from 'react';

export default function ChildPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-white">
      <h1 className="text-2xl font-semibold">¡Hola desde la segunda ventana!</h1>
      <p className="text-gray-600">Este componente vive en <code>ChildPage.tsx</code>.</p>
    </div>
  );
}
