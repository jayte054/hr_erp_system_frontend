import { useContext, useEffect, useState } from "react"
import { AdminAuthContext } from "../../context/authenticationContext/adminContext"
import "./adminPage.css"
import { AuthenticationService } from "../../services/authenticationService"
import { toastify } from "../../components/utils"
import { CustomButton } from "../../components/buttonComponent"
import { EmployeeTable } from "../../components/employeeTableComponent"
import { EmployeeStatsComponent } from "../../components/employeeStatsComponent"
import { useNavigate } from "react-router-dom"

export const AdminPage = () => {
    const [employeeform, setEmployeeForm] = useState(false)
    const [employeeTable, setEmployeeTable] = useState(false)
    const [employeeStatsTable, setEmployeeStatsTable] = useState(false)
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [department, setDepartment] = useState<string>("")
    const [salary, setSalary] = useState<string>("")
    const {admin} = useContext(AdminAuthContext)
    const {employeeSignup} = AuthenticationService

    const toggleForm = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
        setState(prev => !prev);
    }

    useEffect(() => {
        const setSignUpPage = () => {
            setEmployeeForm(true)
        }
        setSignUpPage()
    }, [])

    const handleEmployeeSignup = async () => {
        const formData = {
            name, email, password, department, salary
        }
        try {
            await employeeSignup(admin.token, formData)
            toastify.signupSuccessful('employee signed up successfully')
        } catch (error) {
            console.log(error);
        }
    }

    const navigate = useNavigate()

    return (
        <div className="admin-dash-container">
            <div className='employee-signout'>
            <h3>Welcome {admin.name}</h3>
            <span>
              <button onClick={
                () => navigate("/authentication")
                }>
                  Signout
              </button>
            </span>
          </div>
            <button onClick={() => {
                toggleForm(setEmployeeForm)
                setEmployeeTable(false)
                setEmployeeStatsTable(false)
            }
            }
            >
                Add Employee
            </button>

            <button onClick={() => {
                toggleForm(setEmployeeTable)
                setEmployeeForm(false)
                setEmployeeStatsTable(false)
                }}
            >
                Fetch All Employees
            </button>
            <button onClick={() => {
                toggleForm(setEmployeeStatsTable)
                setEmployeeTable(false)
                setEmployeeForm(false)
            }}>
                Display Analytics
            </button>
            {employeeform && (
                        <div className="signin-input">
                        <span>Name</span>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            required
                        />
                         <span>Email</span>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                         <span>Password</span>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                         <span>Department</span>
                        <input
                            type="text"
                            name="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="Department"
                            required
                        />
                         <span>Salary</span>
                        <input
                            type="text"
                            name="salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder="Salary"
                            required
                        />
                        <span>
                        <CustomButton 
                            label="employee signup"
                            onClick={handleEmployeeSignup}
                        />
                        </span>
                    </div>
                    )}
                    {employeeTable && (
                        <div>
                            <EmployeeTable 
                                admin={admin}
                            />
                        </div>
                    )}
                    {employeeStatsTable && (
                        <div>
                            <EmployeeStatsComponent 
                                admin={admin}
                            />
                        </div>
                    )}
            </div>
    )
}