import { useContext, useEffect, useState } from "react"
import DataTable, { TableColumn } from "react-data-table-component";
import { EmployeeAuthContext } from "../../context/authenticationContext/employeeContext"
import { CustomButton } from "../../components/buttonComponent"
import { EmployeeInterface, UpdateEmployeeData } from "../../types/types"
import { profileService } from "../../services/profileService"
import "./employeePage.css"
import { FaTrash, FaUpload } from "react-icons/fa";

export const EmployeePage = () => {
    const [employeeProfile, setEmployeeProfile] = useState(false)
    const [employeeProfileForm, setEmployeeProfileForm] = useState(false)
    const [employeeData, setEmployeeData] = useState<EmployeeInterface[]>([])
    const [employeeDataForm, setEmployeeDataForm] = useState<EmployeeInterface[]>([])
    const {employee} = useContext(EmployeeAuthContext)
    const {fetchEmployeeById, updateEmployeeDetail} = profileService
        
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
            console.log(employeeUpdate)
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


    return (
        <div className='employee-page-container'>
            <h3>Welcome {employee.name}</h3>
            <div className="employeePage-button">
            <span>
            <CustomButton 
                label= "Profile"
                onClick={() => {
                    toggleForm(setEmployeeProfile)
                    setEmployeeProfileForm(false)
                }}
            />
            </span>
            <span>
            <CustomButton 
                label= "Update Profile"
                onClick={() => {
                    toggleForm(setEmployeeProfileForm)
                    setEmployeeProfile(false)
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