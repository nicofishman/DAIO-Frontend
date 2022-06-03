import { createContext, useState, useContext } from 'react';
export const RegisterContext = createContext();

export function RegisterProvider(props) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const handleChangeNombre = (e) => {
        setNombre(e);
    }

    const handleChangeDesc = (e) => {
        setDescripcion(e);
    }

    return (
        <RegisterContext.Provider value={{ nombre, descripcion, handleChangeNombre, handleChangeDesc }}>
            {props.children}
        </RegisterContext.Provider>
    )
}

export function useRegisterContext() {
    const context = useContext(RegisterContext);
    if (!context) {
        throw new Error('useAccountContext must be used within a RegisterProvider');
    }
    return context;
}