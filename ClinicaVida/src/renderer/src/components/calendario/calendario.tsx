import React from 'react';

type Turno = {
  [dia: number]: string; // ej. { 1: "C8", 2: "C10", ... }
};

type Medico = {
  nombre: string;
  especialidad: string;
  turnos: Turno;
};

const medicos: Medico[] = [
  {
    nombre: 'Miguel Campos',
    especialidad: 'Hematología',
    turnos: { 1: 'C8', 2: 'C8', 10: 'C10', 27: 'C8', 30: 'C10' }
  },
  {
    nombre: 'Andrea Pinto',
    especialidad: 'Hematología',
    turnos: { 2: 'C10', 3: 'C10', 9: 'C10', 16: 'C10' }
  },
  {
    nombre: 'Yandry Pedroza',
    especialidad: 'Medicina Interna',
    turnos: { 2: 'C8', 5: 'C4', 10: 'C10', 17: 'C10' }
  }
  // Agrega más médicos aquí...
];

const especialidadColor = (especialidad: string) => {
  const colores: { [key: string]: string } = {
    'Hematología': '#f8caca',
    'Medicina Interna': '#c8f8c8',
    'Oncología': '#c8e0f8',
    'DYCP': '#e5c8f8',
    'Cirugía': '#c8f8f2'
  };
  return colores[especialidad] || '#ffffff';
};

const Calendario: React.FC = () => {
  const diasMes = 30;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Calendario de Turnos - Noviembre 2024</h2>

      {/* Este div envuelve la tabla y permite scroll horizontal */}
      <div className="max-w-full overflow-x-auto border rounded-lg">
        <table className="min-w-[1000px] border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2">#</th>
              <th className="border px-2">Nombre</th>
              <th className="border px-2">Especialidad</th>
              {[...Array(diasMes)].map((_, i) => (
                <th key={i + 1} className="border px-1">{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {medicos.map((medico, index) => (
              <tr key={index} style={{ backgroundColor: especialidadColor(medico.especialidad) }}>
                <td className="border px-2">{index + 1}</td>
                <td className="border px-2">{medico.nombre}</td>
                <td className="border px-2">Médico soporte - {medico.especialidad}</td>
                {[...Array(diasMes)].map((_, d) => (
                  <td key={d + 1} className="border text-center px-1">
                    {medico.turnos[d + 1] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendario;