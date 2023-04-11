import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {

    const [state, setState] = useState(() => {
        const loggedUser = localStorage.getItem(key);
        if (loggedUser) {
            const persistedState = JSON.parse(loggedUser);

            return persistedState;
        }

        return initialValue;
    });

    const setLocalStorageState = (value) => {
        setState(value);

        localStorage.setItem(key, JSON.stringify(value));
    };

    return [
        state,
        setLocalStorageState,
    ];
};
