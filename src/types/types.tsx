export interface AdminSignup {
    name: string;
    email: string;
    password: string;
    department: string;
    salary: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface AdminAuthContextInterface {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
}



export interface VerificationData {
    message: string,
    token: string,
    user: AdminAuthContextInterface
}

export interface EmployeeSignup {
    name: string;
    email: string;
    password: string;
    department: string;
    salary: string;
}

export interface EmployeeAuthContextInterface {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
}

export interface EmployeeInterface {
    _id: string;
    employeeId: string;
    name: string;
    email: string;
    department: string;
    role: string;
    joiningDate: string;
    salary: string;
}

export interface UpdateEmployeeData {
    name?: string;
    email?: string;
    department?: string;
    role?: string;
    joiningDate?: string;
    salary?: string;
}