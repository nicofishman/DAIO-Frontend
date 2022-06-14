import { createContext, useState, useContext, useMemo } from 'react';
export const RegisterContext = createContext();

export function RegisterProvider(props) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [charsLeft, setCharsLeft] = useState(150);
    const [username, setUsername] = useState("");

    const [songPreference, setSongPreference] = useState([]);
    const [artistPreference, setArtistPreference] = useState([]);

    const handleChangeNombre = (e) => {
        setNombre(e);
    }

    const handleChangeDesc = (e) => {
        if (e.length <= 150) {
            setDescripcion(e);
            setCharsLeft(150 - e.length);
        }
    }

    const value = useMemo(() => ({
        nombre,
        descripcion,
        charsLeft,
        username,
        songPreference,
        artistPreference,
        handleChangeNombre,
        handleChangeDesc,
        setUsername,
        setSongPreference,
        setArtistPreference
    }), [nombre, descripcion, charsLeft, username, songPreference, artistPreference]);

    return (
        <RegisterContext.Provider value={value}>
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