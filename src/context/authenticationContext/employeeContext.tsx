import { createContext, useMemo, useState } from "react";
import { EmployeeAuthContextInterface } from "../../types/types";

interface EmployeeContextProps {
    children: React.ReactNode;
}
export const EmployeeAuthContext = createContext<any>(null)

export const EmployeeProvider: React.FC<EmployeeContextProps> = ({children}: EmployeeContextProps) => {
    const [employee, setEmployee] = useState<EmployeeAuthContextInterface>({
        id: "",
        name: "",
        email: "",
        role: "",
        token: "",
    })

    const updateEmployee = (EmployeeData: EmployeeAuthContextInterface) => {
        setEmployee((data) => ({
            ...data,
            id: EmployeeData.id,
            name: EmployeeData.name,
            email: EmployeeData.email,
            role: EmployeeData.role,
            token: EmployeeData.token,
        }))
    }

    // const contextValue = useMemo(() => ({ Employee, updateEmployee }), [Employee]);

    return (
        <EmployeeAuthContext.Provider value={{employee, updateEmployee}}>{children}</EmployeeAuthContext.Provider>
    )
}