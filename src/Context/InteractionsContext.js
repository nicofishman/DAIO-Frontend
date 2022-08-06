import { createContext, useState, useContext, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getInteractions } from '../Handlers/AuthHandler';
export const InteractionsContext = createContext();

export function InteractionsProvider(props) {
    const [interactions, setInteractions] = useState([]);

    const refreshInteractions = async () => {
        AsyncStorage.getItem('spotify_id').then(id => {
            getInteractions(id).then(interactions => {
                setInteractions(interactions)
            })
        })
    }

    const value = useMemo(() => {
        return ({
            interactions,
            refreshInteractions
        })
    }, [interactions])

    return (
        <InteractionsContext.Provider value={value}>
            {props.children}
        </InteractionsContext.Provider>
    )
}

export const useInteractionsContext = () => {
    const context = useContext(InteractionsContext);
    if (!context) {
        throw new Error('useInteractionsContext must be used within a InteractionsProvider');
    }
    return context;
}