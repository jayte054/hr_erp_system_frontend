import axios from "axios"
import { Base_Url } from "./authenticationService"
import { UpdateEmployeeData } from "../types/types"

export const profileService = {
    fetchAllEmployeesAdmin: async (accessToken: string) => {
        try {
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            const employees = await axios.get(`${Base_Url}/api/profile/fetchEmployeeProfiles`, config)
            console.log(employees.data)
            return employees.data.data;
        } catch (error) {
            console.log(error)
        }
    },

    updateEmployeeDetail: async (accessToken: string, id: string, formData: UpdateEmployeeData) => {
        try{
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            const updateEmployee = await axios.patch(`${Base_Url}/api/profile/employee/updateEmployeeProfile/${id}`, formData , config)
            console.log(updateEmployee.data)
            return updateEmployee.data;
        } catch (error) {
            console.log(error)
        }
    },

    deleteEmployeeDetail: async (accessToken: string, id: string) => {
        try{
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            const deleteEmployee = await axios.delete(`${Base_Url}/api/profile/admin/delete/${id}`, config)
            console.log(deleteEmployee.data)
            return deleteEmployee.data;
        } catch (error) {
            console.log(error)
        }
    }
}