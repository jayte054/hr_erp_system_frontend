import axios from 'axios';
import { AdminSignup, EmployeeSignup, SignInData } from "../types/types";
import { toastify } from '../components/utils';

// export const Base_Url = "http://localhost:3001"
export const Base_Url = "https://hr-erp-system-backend.onrender.com"
export const AuthenticationService = {
    adminSignup: async (formData: AdminSignup) => {
        try {
            // const adminSignup = await axios.post(`${Base_Url}/api/user/adminSignup`, formData)
            // console.log(adminSignup.data)
            const response = await fetch(`${Base_Url}/api/user/signin`, {
                method: 'POST', 
                mode: 'no-cors',
                headers: {
                  'Content-Type': 'application/json', // Specify JSON format
                },
                body: JSON.stringify(formData), // Convert data to JSON string
              });
              const data = await response.json();
              return data;
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
        // fetch()
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
            // const signin = await axios.post(`${Base_Url}/api/user/signin`, signinData)
            const response = await fetch(`${Base_Url}/api/user/signin`, {
                method: 'POST', 
                mode: 'no-cors',
                headers: {
                  'Content-Type': 'application/json', // Specify JSON format
                },
                body: JSON.stringify(signinData), // Convert data to JSON string
              });
              const data = await response.json();
              return data
            // return signin.data
        }catch (error) {
            console.log(error)
        }
    }
}