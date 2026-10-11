import type { Employee } from "../types";

interface Props { employee: Employee; onClose: () => void }

export default function EmployeeDetails({ employee, onClose }: Props) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="details-modal" role="dialog" aria-modal="true" aria-labelledby="details-title" onClick={event => event.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close details">×</button>
        <span className="large-avatar">{employee.name.charAt(0).toUpperCase()}</span>
        <h2 id="details-title">{employee.name}</h2>
        <p className="muted">Employee ID: {employee.id}</p>
        <dl><dt>Email</dt><dd>{employee.email}</dd><dt>Department</dt><dd>{employee.department}</dd><dt>Annual salary</dt><dd>₹{employee.salary.toLocaleString("en-IN")}</dd></dl>
        <button className="primary full-width" onClick={onClose}>Close details</button>
      </section>
    </div>
  );
}