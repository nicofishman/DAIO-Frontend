import { createContext, useState, useContext, useMemo, useEffect } from 'react';
export const RegisterContext = createContext();

export function RegisterProvider(props) {
    const [username, setUsername] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [charsLeft, setCharsLeft] = useState(150);
    const [spotifyId, setSpotifyId] = useState();
    const [avatarId, setAvatarId] = useState(-1);
    const [progressBar, setProgressBar] = useState(0); //[porcentaje, screen]


    const [songPreference, setSongPreference] = useState([]);
    const [artistPreference, setArtistPreference] = useState([]);

    const handleChangeNombre = (e) => {
        setUsername(e);
    }

    const handleChangeDesc = (e) => {
        if (e.length <= 150) {
            setDescripcion(e);
            setCharsLeft(150 - e.length);
        }
    }

    const value = {
        username,
        avatarId,
        descripcion,
        charsLeft,
        spotifyId,
        songPreference,
        artistPreference,
        handleChangeNombre,
        setAvatarId,
        handleChangeDesc,
        setSpotifyId,
        setSongPreference,
        setArtistPreference,
        progressBar,
        setProgressBar
    };

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