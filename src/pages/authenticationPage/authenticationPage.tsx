import { useContext, useEffect, useState } from "react"
import "./authenticationPage.css"
import { CustomButton } from "../../components/buttonComponent"
import { AuthenticationService } from "../../services/authenticationService"
import { toastify } from "../../components/utils"
import {  VerificationData } from "../../types/types"
import { AdminAuthContext } from "../../context/authenticationContext/adminContext"
import { EmployeeAuthContext } from "../../context/authenticationContext/employeeContext"
import { useNavigate } from "react-router-dom"

export const AuthenticationPage = () => {
    const [adminform, setAdminForm] = useState(false)
    const [adminsigninform, setAdminSigninForm] = useState(false)
    const [employeeSigninform, setEmployeeSigninForm] = useState(false)
    const [name, setName] = useState<string>("")
    const [_password, _setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [_email, _setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [department, setDepartment] = useState<string>("")
    const [salary, setSalary] = useState<string>("")
    const {adminSignup, adminSignin, employeeSignin} = AuthenticationService
    const { updateAdmin} = useContext(AdminAuthContext)
    const { updateEmployee} = useContext(EmployeeAuthContext)
    const navigate = useNavigate()


    const toggleForm = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
        setState(prev => !prev);
    }

    useEffect(() => {
        const setSignUpPage = () => {
            setAdminForm(true)
            setAdminSigninForm(true)
        }
        setSignUpPage()
    }, [])

    const handleAdminSignup = async () => {
        const formData = {
            name, email, password, department, salary
        }
        try {
            await adminSignup(formData)
            toastify.signupSuccessful('successful signup')
        } catch(error) {
            console.log(error)
        }
    }

    const handleAdminSignin = async () => {
        const signinData = {email, password}
        try {
            const admin: VerificationData = await adminSignin(signinData)
            const adminData = {
                id: admin.user.id,
                name: admin.user.name,
                email: admin.user.email,
                role: admin.user.role,
                token: admin.token,
            }
            updateAdmin(adminData)
            navigate("/adminPage")
            toastify.siginSuccessful('successfully signed in')
        }catch (error) {
            console.log(error)
        }
    }

    const handleEmployeeSignin = async () => {
        const signinData = {email: _email, password: _password}
        try {
            const employee: VerificationData = await employeeSignin(signinData)
            
            const employeeData = {
                id: employee.user.id,
                name: employee.user.name,
                email: employee.user.email,
                role: employee.user.role,
                token: employee.token,
            }
            console.log(employeeData)
            updateEmployee(employeeData)
            navigate('/employeePage')
            toastify.siginSuccessful('successfully signed in')

        }catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="authPage">
            <div className="authPage-signup">
                <h3>Signup</h3>

                    <CustomButton 
                        label="Admin SignUp"
                        onClick={() => {
                            toggleForm(setAdminForm)
                        }}
                    />
                {adminform && (
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
                                label="signup"
                                onClick={handleAdminSignup}
                            />
                            </span>
                            
                        </div>
                    )}

            </div>
            <div className="authPage-signin">
                <h3> Signin</h3>
            <div className="signup-buttons">
                <span>
                <CustomButton 
                    label= "Admin Signin"
                    onClick={() => {
                        toggleForm(setEmployeeSigninForm)
                        toggleForm(setAdminSigninForm)
                    }}
                />
                </span>
               <span>
               <CustomButton 
                    label= "Employee Signin"
                    onClick={() => {
                        toggleForm(setEmployeeSigninForm)
                        toggleForm(setAdminSigninForm)

                    }}
                />
               </span>
                
                </div>
                {adminsigninform && (
                     <div className="signin-input">
                             <span>Email</span>
                            <input
                                type="text"
                                name="_email"
                                value={_email}
                                onChange={(e) => _setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                             <span>Password</span>
                            <input
                                type="password"
                                name="_password"
                                value={_password}
                                onChange={(e) => _setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <span>
                            <CustomButton 
                                label="Admin Sign In"
                                onClick={handleAdminSignin}
                            />
                            </span>
                            
                        </div>
                )}
                {employeeSigninform && (
                    <div className="signin-input">
                         <span>Email</span>
                        <input
                            type="text"
                            name="_email"
                            value={_email}
                            onChange={(e) => _setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                         <span>Password</span>
                        <input
                            type="password"
                            name="_password"
                            value={_password}
                            onChange={(e) => _setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <span>
                        <CustomButton 
                            label="Employee Sign In"
                            onClick={handleEmployeeSignin}
                        />
                        </span>
                    </div>
                )}
               
                        
            </div>
        </div>
    )
}