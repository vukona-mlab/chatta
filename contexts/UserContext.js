import { createContext } from "react";

const UserContext = createContext({
    isLoggedIn: false,
    toggleUserState: () => {}
})
export default UserContext