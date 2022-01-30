import React, { useContext, useState } from "react";
import { LocalStorage } from "../helper/localStorage";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext);
}

export const useUpdateUser = () => {
    return useContext(UserUpdateContext);
}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(
        () => {
            const user = JSON.parse(LocalStorage.get('userData'));
            if (user)
            {
              return JSON.parse(LocalStorage.get('userData'))
            }
        });


    const updateUser = () => {
        setUser(JSON.parse(LocalStorage.get('userData')));
    }

    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={updateUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )
    
}

export default UserProvider;