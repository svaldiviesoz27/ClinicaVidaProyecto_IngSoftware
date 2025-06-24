export interface Doctor {
    id?: number;
    name: string;
    idNumber: string;
    birthDate: string;
    hasSpecialty: boolean;
    specialty?: string; // Opcional porque solo existe si hasSpecialty es true
}

const DB_NAME = 'ClinicaVidaDB';
const DB_VERSION = 1;
const STORE_NAME = 'doctors';

let db: IDBDatabase;

export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
            db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        };

        request.onsuccess = (event: Event) => {
            db = (event.target as IDBOpenDBRequest).result;
            resolve(db);
        };

        request.onerror = (event: Event) => {
            reject((event.target as IDBOpenDBRequest).error);
        };
    });
};

export const addDoctor = (doctor: Omit<Doctor, 'id'>): Promise<void> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(doctor);

        request.onsuccess = () => resolve();
        request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
    });
};

export const getDoctors = (): Promise<Doctor[]> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = (event: Event) => {
            resolve((event.target as IDBRequest).result);
        };

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error);
        };
    });
};

export const updateDoctor = (doctor: Doctor): Promise<void> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(doctor);
        request.onsuccess = () => resolve();
        request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
    });
};
export const deleteDoctor = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
    });
};
