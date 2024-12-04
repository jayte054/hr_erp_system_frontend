import { createContext, useState } from "react";
import { AdminAuthContextInterface } from "../../types/types";

interface AdminContextProps {
    children: React.ReactNode;
}
export const AdminAuthContext = createContext<any>(null)

export const AdminProvider: React.FC<AdminContextProps> = ({children}: AdminContextProps) => {
    const [admin, setAdmin] = useState<AdminAuthContextInterface>({
        id: "",
        name: "",
        email: "",
        role: "",
        token: "",
    })

    const updateAdmin = (adminData: AdminAuthContextInterface) => {
        setAdmin((data) => ({
            ...data,
            id: adminData.id,
            name: adminData.name,
            email: adminData.email,
            role: adminData.role,
            token: adminData.token,
        }))
    }


    return (
        <AdminAuthContext.Provider value={{admin, updateAdmin}}>{children}</AdminAuthContext.Provider>
    )
}