import { useContext, useEffect, useState } from "react"
import DataTable, { TableColumn } from "react-data-table-component";
import { EmployeeAuthContext } from "../../context/authenticationContext/employeeContext"
import { CustomButton } from "../../components/buttonComponent"
import { EmployeeInterface, UpdateEmployeeData } from "../../types/types"
import { profileService } from "../../services/profileService"
import "./employeePage.css"
import { FaUpload } from "react-icons/fa";
import { toastify } from "../../components/utils";
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from "../../services/authenticationService";

export const EmployeePage = () => {
    const [employeeProfile, setEmployeeProfile] = useState(false)
    const [employeeProfileForm, setEmployeeProfileForm] = useState(false)
    const [changePasswordPage, setChangePasswordPage] = useState(false)
    const [employeeData, setEmployeeData] = useState<EmployeeInterface[]>([])
    const [employeeDataForm, setEmployeeDataForm] = useState<EmployeeInterface[]>([])
    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const {employee} = useContext(EmployeeAuthContext)
    const {fetchEmployeeById, updateEmployeeDetail} = profileService
    const {changePassword} = AuthenticationService
        
    const toggleForm = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
        setState(prev => !prev)
    }
    useEffect(() => {
        const profile = async () => {
            const employeeProfile: EmployeeInterface[] = [];
            const _employee: EmployeeInterface = await fetchEmployeeById(employee.token, employee.email)
            console.log(_employee)
            employeeProfile.push(_employee)
            setEmployeeData(() => employeeProfile)
            setEmployeeDataForm(() => employeeProfile)
            setEmployeeProfile(true)
        }
        profile()
    }, [])

    const profileColumn: TableColumn<EmployeeInterface>[]= [
        {
            name: "Name",
            selector: (row: EmployeeInterface) => row.name
        },
        {
            name: "Email",
            selector: (row: EmployeeInterface) => row.email
        },
        {
            name: "Department",
            selector: (row: EmployeeInterface) => row.department
        },
        {
            name: "salary",
            selector: (row: EmployeeInterface) => row.salary
        },
        {
            name: "Date Joined",
            selector: (row: EmployeeInterface) => row.joiningDate

        }
       
    ]

    const handleInputChange = (
        employeeId: string,
        field: keyof EmployeeInterface,
        value: string
      ) => {
        setEmployeeData((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.employeeId === employeeId ? { ...emp, [field]: value } : emp
          )
        );
      };

    const handleUpdate = async (row: EmployeeInterface) => {
        const formData: UpdateEmployeeData = {
            name: row.name,
            email: row.email,
            department: row.department,
            role: row.role,
            joiningDate: row.joiningDate,
            salary: row.salary
        }
        try {
            const employeeUpdate = await updateEmployeeDetail(employee.token, row._id, formData)
            toastify.update('account updated successfully')

            return employeeUpdate
        } catch (error) {
            console.log(error)
        }
      };

    const profileFormColumn: TableColumn<EmployeeInterface>[] = [
        {
            name: "Name",
            cell: (row) => (
              <input
                type="text"
                value={row.name}
                onChange={(e) =>
                  handleInputChange(row.employeeId, "name", e.target.value)
                }
                style={{ width: "4rem" }}
                required
              />
            ),
          },
          {
            name: "Email",
            cell: (row) => (
              <input
                type="email"
                value={row.email}
                onChange={(e) =>
                  handleInputChange(row.employeeId, "email", e.target.value)
                }
                style={{ width: "4rem" }}
                required
              />
            ),
          },
          {
            name: "Department",
            cell: (row) => (
              <input
                type="text"
                value={row.department}
                onChange={(e) =>
                  handleInputChange(row.employeeId, "department", e.target.value)
                }
                style={{ width: "4rem" }}
                required
              />
            ),
          },
          {
            name: "Date Joined",
            cell: (row) => (
              <input
                type="text"
                value={row.joiningDate}
                onChange={(e) =>
                  handleInputChange(row.employeeId, "joiningDate", e.target.value)
                }
                style={{ width: "4rem" }}
                required
              />
            ),
          },
       
          {
              name: "Actions",
              cell: (row: EmployeeInterface) => (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleUpdate(row)}
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      border: "none",
                      padding: "0",
                      cursor: "pointer",
                    }}
                  >
                    <FaUpload />
                  </button>
                </div>
              ),
            },
    ]

    const navigate = useNavigate()

    const handleChangePassword = async () => {
      try {
        const passwordData = {
          currentPassword: oldPassword, 
          newPassword, 
          employeeId: employee.id
        }
        const change = await changePassword(passwordData)
        toastify.pchange('password changed successfully')
        return change.data;
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <div className='employee-page-container'>
          <div className='employee-signout'>
            <h3>Welcome {employee.name}</h3>
            
            <span>
              <button onClick={
                () => navigate("/authentication")
                }>
                  Signout
              </button>
            </span>
          </div>
            
            <div className="employeePage-button">
            <span>
            <CustomButton 
                label= "Profile"
                onClick={() => {
                    toggleForm(setEmployeeProfile)
                    setEmployeeProfileForm(false)
                    setChangePasswordPage(false)
                }}
            />
            </span>
            <span>
              <CustomButton 
                label= 'Change Password'
                onClick= {() => {
                  toggleForm(setChangePasswordPage)
                  setEmployeeProfileForm(false)
                  setEmployeeProfile(false)
                }}
              />
            </span>
            <span>
            <CustomButton 
                label= "Update Profile"
                onClick={() => {
                    toggleForm(setEmployeeProfileForm)
                    setEmployeeProfile(false)
                    setChangePasswordPage(false)
                }}
            />
            </span>
            </div>
            <div className='employee-body'>
               { employeeProfile && (
                <div>
                    {employeeData && (
                    <>
                    <DataTable 
                        columns={profileColumn}
                        data={employeeData}
                        highlightOnHover
                        pointerOnHover
                        responsive
                    />
                    </>
                    )}
                </div>
               )}
               {changePasswordPage && (
                <div className='change-password'>
                  <p>Old Password</p>
                  <input 
                    type='text'
                    name='oldPassword'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="old password"
                  />
                  <p>New Password</p>
                  <input 
                    type='text'
                    name='newPassword'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="old password"
                  /><br />
                  <button type='submit' onClick={handleChangePassword}>Change Password</button>
                </div>
               )}
               {employeeProfileForm && (
                    <>
                        {employeeDataForm && (
                            <div>
                                <DataTable 
                                    columns={profileFormColumn}
                                    data={employeeData}
                                    highlightOnHover
                                    pointerOnHover
                                    responsive
                    /> 
                            </div>
                        )}
                    </>
               )}
            </div>
        </div>
    )
}