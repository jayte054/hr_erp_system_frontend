import { useContext, useEffect, useState } from "react"
import { EmployeeAuthContext } from "../../context/authenticationContext/employeeContext"
import { CustomButton } from "../../components/buttonComponent"
import { EmployeeInterface } from "../../types/types"
import { profileService } from "../../services/profileService"

export const EmployeePage = () => {
    const [employeeData, setEmployeeData] = useState<EmployeeInterface>()
    const {employee} = useContext(EmployeeAuthContext)
    const {fetchEmployeeById} = profileService
    
    console.log(employeeData)
    useEffect(() => {
        const profile = async () => {
            const _employee: EmployeeInterface = await fetchEmployeeById(employee.token, employee.email)
            console.log(_employee)
            setEmployeeData(() => _employee)
        }
        profile()
    }, [])


    return (
        <div>
            <h3>Welcome {employee.name}</h3>
            <div className="employeePage-button">
            <span>
            <CustomButton 
                label= "Profile"
            />
            </span>
            <span>
            <CustomButton 
                label= "Update Profile"
            />
            </span>
            </div>
            <div>
               {employeeData && (
                <div>
                    <ul>
                        <li>
                        <span>Name</span>: {employeeData.name} <br />
                        </li>
                        <li>
                        <span>Email</span>: {employeeData.email} <br />
                        </li>
                        <li>
                        <span>Department</span>: {employeeData.department} <br />
                        </li>
                        <li>
                        <span>Role</span>: {employeeData.role} <br />
                        </li>
                        <li>
                        <span>Salary</span>: {employeeData.salary} <br />
                        </li>
                    </ul>
                </div>
               )}
            </div>
        </div>
    )
}