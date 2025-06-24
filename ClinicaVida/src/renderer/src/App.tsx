import { useState } from "react";
import Icon from "./assets/icon.png";
const App = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [doctorData, setDoctorData] = useState({
        name: '',
        idNumber: '',
        birthDate: ''
    });

    const handleNavClick = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e) => {
        const { name, value } 
        = e.target;
        setDoctorData({ ...doctorData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío de datos, como enviarlos a una API
        console.log('Datos del médico:', doctorData);
        // Reiniciar el formulario
        setDoctorData({ name: '', idNumber: '', birthDate: '' });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'addDoctor':
                return (
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-4">Agregar Médico</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={doctorData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Número de Identificación</label>
                                <input
                                    type="text"
                                    name="idNumber"
                                    value={doctorData.idNumber}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={doctorData.birthDate}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Agregar Médico
                            </button>
                        </form>
                    </div>
                );
            case 'legal':
                return <div className="p-4">Consultar requerimientos legales</div>;
            case 'policies':
                return <div className="p-4">Consultar requerimientos políticas internas</div>;
            case 'hours':
                return <div className="p-4">Calcular horas laborales del mes</div>;
            case 'assign':
                return <div className="p-4">Asignar tipo de turno a médicos entre semana</div>;
            default:
                return <div className="p-4">Bienvenido al Organizador de Turnos Médicos</div>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
           <img className="center-img" width="200px" height="200px" src={Icon} alt="" />
            <header className="bg-blue-600 text-white p-4">
                  <h1 className="text-xl font-bold">Organizador de Turnos Médicos</h1>
                <nav className="mt-2">
                    <button onClick={() => handleNavClick('addDoctor')} className="mr-2 bg-green-500 px-4 py-2 rounded">Agregar Médico</button>
                    <button onClick={() => handleNavClick('legal')} className="mr-2 bg-purple-500 px-4 py-2 rounded">Consultar Requerimientos Legales</button>
                    <button onClick={() => handleNavClick('policies')} className="mr-2 bg-yellow-500 px-4 py-2 rounded">Consultar Políticas Internas</button>
                    <button onClick={() => handleNavClick('hours')} className="mr-2 bg-red-500 px-4 py-2 rounded">Calcular Horas Laborales</button>
                    <button onClick={() => handleNavClick('assign')} className="bg-indigo-500 px-4 py-2 rounded">Asignar Turnos</button>
                </nav>
            </header>
            <main className="flex-grow p-4">
                {renderContent()}
            </main>
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; {new Date().getFullYear()} Organizador de Turnos Médicos</p>
            </footer>
        </div>
    );
};

export default App
