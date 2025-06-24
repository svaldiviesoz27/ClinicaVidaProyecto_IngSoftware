import { useState } from "react";
import Icon from "./assets/icon.png";
import './App.css';

const App = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [doctorData, setDoctorData] = useState({
        name: '',
        idNumber: '',
        birthDate: ''
    });

    const handleNavClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDoctorData({ ...doctorData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos del médico:', doctorData);
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
                                <label className="block text-sm font-medium">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={doctorData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Número de Identificación</label>
                                <input
                                    type="text"
                                    name="idNumber"
                                    value={doctorData.idNumber}
                                    onChange={handleInputChange}
                                    required
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={doctorData.birthDate}
                                    onChange={handleInputChange}
                                    required
                                    className="input"
                                />
                            </div>
                            <button
                                type="submit"
                                className="custom-button"
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
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f9eef5] font-lato text-[#9280b6]">
            <div className="flex justify-center mt-6 mb-2">
                <img width="200px" height="200px" src={Icon} alt="Logo" />
            </div>

            {/* Texto de bienvenida arriba de los botones */}
            {activeTab === 'dashboard' && (
                <p className="text-center text-lg font-semibold mb-4">
                    Bienvenido al Organizador de Turnos Médicos
                </p>
            )}

            <header className="bg-[#22335d] text-[#9280b6] p-4">
                <h1 className="text-xl font-bold text-center mb-3">Organizador de Turnos Médicos</h1>
                     <nav className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => handleNavClick('addDoctor')}
                            className={`custom-button text-sm px-3 py-1.5 m-1 ${activeTab === 'addDoctor' ? 'active-button' : ''}`}
                        >
                            Agregar Médico
                        </button>
                        <button
                            onClick={() => handleNavClick('legal')}
                            className={`custom-button text-sm px-3 py-1.5 m-1 ${activeTab === 'legal' ? 'active-button' : ''}`}
                        >
                            Requerimientos Legales
                        </button>
                        <button
                            onClick={() => handleNavClick('policies')}
                            className={`custom-button text-sm px-3 py-1.5 m-1 ${activeTab === 'policies' ? 'active-button' : ''}`}
                        >
                            Políticas Internas
                        </button>
                        <button
                            onClick={() => handleNavClick('hours')}
                            className={`custom-button text-sm px-3 py-1.5 m-1 ${activeTab === 'hours' ? 'active-button' : ''}`}
                        >
                            Horas Laborales
                        </button>
                        <button
                            onClick={() => handleNavClick('assign')}
                            className={`custom-button text-sm px-3 py-1.5 m-1 ${activeTab === 'assign' ? 'active-button' : ''}`}
                        >
                            Asignar Turnos
                        </button>
                    </nav>

            </header>


            <main className="flex-grow p-4">
                {renderContent()}
            </main>

            <footer className="bg-[#22335d] text-[#9280b6] text-center p-4 mt-auto">
                <p>&copy; {new Date().getFullYear()} Organizador de Turnos Médicos</p>
            </footer>
        </div>
    );
};

export default App;

