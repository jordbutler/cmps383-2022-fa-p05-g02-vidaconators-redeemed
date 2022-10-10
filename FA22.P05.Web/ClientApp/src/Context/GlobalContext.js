

import React from "react";

import { createContext, useState } from "react";

export const GlobalContext = createContext([{}, () => { }]);

export function GlobalContextProvider(props) {
    const [state, setState] = useState({})
    return (
        <GlobalContext.Provider value={[state, setState]}>
            {props.children}
        </GlobalContext.Provider>
    );
}
