import axios from 'axios';
import { AdminSignup, EmployeeSignup, SignInData } from "../types/types";
import { toastify } from '../components/utils';

// export const Base_Url = "http://localhost:3001"
export const Base_Url = "https://hr-erp-system-backend.onrender.com"
export const AuthenticationService = {
    adminSignup: async (formData: AdminSignup) => {
        try {
            const adminSignup = await axios.post(`${Base_Url}/api/user/adminSignup`, formData)
            console.log(adminSignup.data)
        } catch (error) {
            console.log(error)
            toastify.signupSuccessful('admin signup successful')
        }

    },
    adminSignin: async ( signinData: SignInData) => {
        try {
            
            const signin = await axios.post(`${Base_Url}/api/user/adminSignin`, signinData)
            console.log(signin.data)
            return signin.data
        }catch (error) {
            console.log(error)
        }
    },
    employeeSignup: async (accessToken: string, formData: EmployeeSignup) => {
        try {
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            console.log(formData)
            const signup = await axios.post(`${Base_Url}/api/user/signup`, formData, config)
            return signup.data
        } catch (error) {
            console.log(error)
        }
    },

    employeeSignin: async ( signinData: SignInData) => {
        try {
            console.log(signinData)
            const signin = await axios.post(`${Base_Url}/api/user/signin`, signinData)
            return signin.data
        }catch (error) {
            console.log(error)
        }
    }
}