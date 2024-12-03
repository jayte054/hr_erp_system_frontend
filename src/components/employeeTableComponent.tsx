

import DataTable, { TableColumn } from "react-data-table-component";
import { profileService } from "../services/profileService";
import { AdminAuthContextInterface, EmployeeInterface, UpdateEmployeeData } from "../types/types";
import { useEffect, useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";

interface EmployeeProp {
  admin: AdminAuthContextInterface;
}

export const EmployeeTable = ({ admin }: EmployeeProp) => {
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const { fetchAllEmployeesAdmin, updateEmployeeDetail, deleteEmployeeDetail } = profileService;

  const accessToken = admin.token;

  // Fetch employees on component mount
  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const allEmployees:EmployeeInterface[] = await fetchAllEmployeesAdmin(accessToken);
        console.log(allEmployees)
        setEmployees(allEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchAllEmployees();
  }, [accessToken]);

  // Update employee data on input change
  const handleInputChange = (
    employeeId: string,
    field: keyof EmployeeInterface,
    value: string
  ) => {
    setEmployees((prevEmployees) =>
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
        const employeeUpdate = await updateEmployeeDetail(accessToken, row._id, formData)
        console.log(employeeUpdate)
        return employeeUpdate
    } catch (error) {
        console.log(error)
    }
  };

  const handleDelete = async(id: string) => {
    try {
        await deleteEmployeeDetail(accessToken, id)
    } catch (error) {
        console.log(error)
    }
  };

  // Define table columns
  const employeeColumn: TableColumn<EmployeeInterface>[] = [
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
      name: "Role",
      cell: (row) => (
        <input
          type="text"
          value={row.role}
          onChange={(e) =>
            handleInputChange(row.employeeId, "role", e.target.value)
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
          type="date"
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
      name: "Salary",
      cell: (row) => (
        <input
          type="number"
          value={row.salary}
          onChange={(e) =>
            handleInputChange(row.employeeId, "salary", e.target.value)
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
            <button
              onClick={() => handleDelete(row._id)}
              style={{
                // backgroundColor: "red",
                color: "red",
                border: "none",
                padding: "0",
                cursor: "pointer",
              }}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "1.3rem",
        margin: "1rem auto",
        textAlign: "center" as "center",
      },
    },
    cells: {
      style: {
        fontSize: ".9rem",
        textAlign: "center" as "center",
      },
    },
    rows: {
      style: {
        margin: "1rem auto",
        textAlign: "center" as "center",
      },
    },
  }; 

  return (
    <div style={{backgroundColor: "#6fbbb1"}}>
      <DataTable
        columns={employeeColumn}
        data={Array.isArray(employees) ? employees : []}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        customStyles={customStyles}
      />
    </div>
  );
};
