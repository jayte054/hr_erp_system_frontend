import axios from 'axios';
import { EmployeeSignup, SignInData } from "../types/types";
import { toastify } from '../components/utils';

export const Base_Url = "http://localhost:3001"
// export const Base_Url = "https://hr-erp-system-backend-1.onrender.com"
export const AuthenticationService = {
    adminSignup: async (formData:{
        name: string;
        email: string;
        password: string;
        department: string;
        salary: string;
    }) => {
        console.log(formData)
        try {
            const adminSignup = await axios.post(`${Base_Url}/api/user/adminSignup`, formData)
            
            return adminSignup.data
        } catch (error) {
            console.log(error)
            toastify.signupSuccessful('admin signup successful')
        }

    },
    adminSignin: async ( signinData: SignInData) => {
        try {
            
            const signin = await axios.post(`${Base_Url}/api/user/adminSignin`, signinData)
           
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
    },

    changePassword: async (passwordData: {
        currentPassword: string,
        newPassword: string,
        employeeId: string,
    }) => {
        try{
            const changePassword = await axios.patch(`${Base_Url}/api/user/changePassword/${passwordData.employeeId}`, {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            } )
            return changePassword.data
        } catch(error) {
            console.log(error)
        }
        


    }
}