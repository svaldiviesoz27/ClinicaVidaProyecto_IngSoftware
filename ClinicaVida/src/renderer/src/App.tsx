import { useState, useEffect } from "react";
import Icon from "./assets/icon.png";
import { openDB, addDoctor, getDoctors, updateDoctor, deleteDoctor, Doctor } from "./database/db";
import './App.css';

const App = () => {
    const [activeTab, setActiveTab] = useState<string>('dashboard');
    const [doctorData, setDoctorData] = useState<Omit<Doctor, 'id'>>({
        name: '',
        idNumber: '',
        birthDate: '',
        hasSpecialty: false,
        specialty: ''
    });
    const [showSpecialtyField, setShowSpecialtyField] = useState<boolean>(false);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentDoctorId, setCurrentDoctorId] = useState<number | null>(null);

    // Inicializar la base de datos y cargar médicos
    useEffect(() => {
        const initializeDB = async () => {
            await openDB();
            await loadDoctors();
        };
        initializeDB();
    }, []);

    const loadDoctors = async () => {
        const doctorsList = await getDoctors();
        setDoctors(doctorsList);
    };

    const handleNavClick = (tab: string) => {
        setActiveTab(tab);
        resetForm(); // Resetear el formulario al cambiar de tab
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setDoctorData({
            ...doctorData,
            [name]: type === 'checkbox' ? checked : value
        });

        if (name === 'hasSpecialty') {
            setShowSpecialtyField(checked);
            if (!checked) {
                setDoctorData(prev => ({ ...prev, specialty: '' }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEditing && currentDoctorId) {
            await updateDoctor({ id: currentDoctorId, ...doctorData });
        } else {
            await addDoctor(doctorData);
        }
        
        resetForm();
        await loadDoctors();
    };

    const resetForm = () => {
        setDoctorData({ 
            name: '', 
            idNumber: '', 
            birthDate: '',
            hasSpecialty: false,
            specialty: ''
        });
        setShowSpecialtyField(false);
        setIsEditing(false);
        setCurrentDoctorId(null);
    };

    const handleEdit = (doctor: Doctor) => {
        setDoctorData({
            name: doctor.name,
            idNumber: doctor.idNumber,
            birthDate: doctor.birthDate,
            hasSpecialty: doctor.hasSpecialty,
            specialty: doctor.specialty || ''
        });
        setShowSpecialtyField(doctor.hasSpecialty);
        setIsEditing(true);
        setCurrentDoctorId(doctor.idNumber);
        setActiveTab('addDoctor'); // Cambiar a la pestaña de agregar médico
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este médico?')) {
            await deleteDoctor(id);
            await loadDoctors();
        }
    };

    const renderAddDoctor = () => (
        <div className="doctor-form-container">
            <h2 className="text-xl font-bold mb-3">
                {isEditing ? 'Editar Médico' : 'Agregar Médico'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="input-group">
                    <label>Nombre Completo</label>
                    <input
                        type="text"
                        name="name"
                        value={doctorData.name}
                        onChange={handleInputChange}
                        required
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label>Número de Identificación</label>
                    <input
                        type="text"
                        name="idNumber"
                        value={doctorData.idNumber}
                        onChange={handleInputChange}
                        required
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label>Fecha de Nacimiento</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={doctorData.birthDate}
                        onChange={handleInputChange}
                        required
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="hasSpecialty"
                            checked={doctorData.hasSpecialty}
                            onChange={handleInputChange}
                        />
                        <span className="ml-2">¿Tiene especialidad?</span>
                    </label>
                </div>
                {showSpecialtyField && (
                    <div className="input-group">
                        <label className="block text-sm font-medium">Especialidad</label>
                        <input
                            type="text"
                            name="specialty"
                            value={doctorData.specialty}
                            onChange={handleInputChange}
                            className="input"
                        />
                    </div>
                )}
                <div className="form-actions">
                    <button
                        type="submit"
                        className="custom-button"
                    >
                        {isEditing ? 'Guardar Cambios' : 'Agregar Médico'}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="custom-button bg-gray-500 hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );

    const renderDoctorsList = () => (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Lista de Médicos</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Nombre</th>
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Tipo</th>
                            <th className="px-4 py-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor.id} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-2">{doctor.name}</td>
                                <td className="px-4 py-2">{doctor.idNumber}</td>
                                <td className="px-4 py-2">
                                    {doctor.hasSpecialty 
                                        ? `Especialista en ${doctor.specialty}` 
                                        : 'Médico General'}
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(doctor)}
                                        className="text-blue-600 hover:text-blue-800 mr-3"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doctor.id!)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'addDoctor':
                return renderAddDoctor();
            case 'doctorsList':
                return renderDoctorsList();
            case 'legal':
                return <div className="p-4">Consultar requerimientos legales</div>;
            case 'policies':
                return <div className="p-4">Consultar requerimientos políticas internas</div>;
            case 'hours':
                return <div className="p-4">Calcular horas laborales del mes</div>;
            case 'assign':
                return <div className="p-4">Asignar tipo de turno a médicos entre semana</div>;
            default:
                return (
                    <div className="p-4 text-center">
                        <h2 className="text-2xl font-bold mb-4">Panel de Control</h2>
                        <p>Seleccione una opción del menú para comenzar</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f9eef5] font-lato text-[#9280b6]">
        <div className="container mx-auto px-4 flex-grow">
            <div className="flex justify-center mt-6 mb-8">
                <img width="200px" height="200px" src={Icon} alt="Logo" className="rounded-full shadow-lg" />
            </div>

            <header className="bg-[#22335d] text-[#9280b6] p-4 rounded-lg shadow-lg mb-8">
                <h1 className="text-xl font-bold text-center mb-4">Organizador de Turnos Médicos</h1>
                <nav className="flex flex-wrap justify-center gap-3">
                    <button
                        onClick={() => handleNavClick('addDoctor')}
                        className={`custom-button text-sm px-3 py-1.5 m-1 ${activeTab === 'addDoctor' ? 'active-button' : ''}`}
                    >
                        Agregar Médico
                    </button>
                    <button
                        onClick={() => handleNavClick('doctorsList')}
                        className={`custom-button text-sm px-3 py-1.5 m-1 ${activeTab === 'doctorsList' ? 'active-button' : ''}`}
                    >
                        Lista de Médicos
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

            <main className="main-content bg-white rounded-xl shadow-md p-6 mb-8">
                {renderContent()}
            </main>
            </div>

            <footer className="bg-[#22335d] text-[#9280b6] text-center p-4 mt-auto">
                <p className="text-sm">© {new Date().getFullYear()} Organizador de Turnos Médicos</p>
            </footer>
        </div>
    );
};

export default App;

