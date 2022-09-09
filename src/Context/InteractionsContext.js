import { createContext, useState, useContext, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getInteractions } from '../Handlers/AuthHandler';
export const InteractionsContext = createContext();

export function InteractionsProvider (props) {
    const [interactions, setInteractions] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [matchList, setMatchList] = useState([]);

    const refreshInteractions = async () => {
        AsyncStorage.getItem('spotify_id').then(id => {
            getInteractions(id).then(interactions => {
                setLikeList(interactions.filter(int => int.decision === true && !int.isMatch));
                setMatchList(interactions.filter(int => int.isMatch));
                setInteractions(interactions);
            });
        });
    };

    const value = useMemo(() => {
        return ({
            interactions,
            likeList,
            matchList,
            refreshInteractions
        });
    }, [interactions, likeList, matchList]);

    return (
        <InteractionsContext.Provider value={value}>
            {props.children}
        </InteractionsContext.Provider>
    );
}

export const useInteractionsContext = () => {
    const context = useContext(InteractionsContext);

    if (!context) {
        throw new Error('useInteractionsContext must be used within a InteractionsProvider');
    }

    return context;
};
