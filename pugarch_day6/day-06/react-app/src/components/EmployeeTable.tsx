import type { Employee } from "../types";

interface Props {
  employees: Employee[];
  onDetails: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export default function EmployeeTable({ employees, onDetails, onEdit, onDelete }: Props) {
  if (!employees.length) return <div className="empty">No employees match your search or filters.</div>;
  return (
    <div className="table-wrap"><table>
      <thead><tr><th>Employee</th><th>Department</th><th>Salary</th><th>Actions</th></tr></thead>
      <tbody>{employees.map(employee => (
        <tr key={employee.id}>
          <td><div className="person"><span className="avatar">{employee.name.charAt(0).toUpperCase()}</span><span><strong>{employee.name}</strong><small>{employee.email}</small></span></div></td>
          <td><span className="department-pill">{employee.department}</span></td>
          <td>₹{employee.salary.toLocaleString("en-IN")}</td>
          <td><div className="actions"><button onClick={() => onDetails(employee)} aria-label={`View ${employee.name}`}>View</button><button onClick={() => onEdit(employee)}>Edit</button><button className="danger-text" onClick={() => onDelete(employee)}>Delete</button></div></td>
        </tr>
      ))}</tbody>
    </table></div>
  );
}