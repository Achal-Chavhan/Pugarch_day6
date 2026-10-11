import { useEffect, useState, type FormEvent } from "react";
import type { Employee, EmployeeInput } from "../types";

interface Props {
  employee: Employee | null;
  onSave: (input: EmployeeInput) => void;
  onCancel: () => void;
}

const emptyForm: EmployeeInput = { name: "", email: "", department: "Engineering", salary: 0 };

export default function EmployeeForm({ employee, onSave, onCancel }: Props) {
  const [form, setForm] = useState<EmployeeInput>(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(employee
      ? { name: employee.name, email: employee.email, department: employee.department, salary: employee.salary }
      : emptyForm);
    setError("");
  }, [employee]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.department.trim()) {
      setError("Please fill in every field.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!Number.isFinite(form.salary) || form.salary <= 0) {
      setError("Salary must be greater than zero.");
      return;
    }
    onSave({ ...form, name: form.name.trim(), email: form.email.trim() });
  }

  return (
    <form className="employee-form" onSubmit={submit}>
      <h2>{employee ? "Edit employee" : "Add employee"}</h2>
      <label>Full name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Asha Kulkarni" /></label>
      <label>Email<input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="name@example.com" /></label>
      <label>Department<select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
        <option>Engineering</option><option>HR</option><option>Design</option><option>Marketing</option><option>Finance</option><option>Operations</option>
      </select></label>
      <label>Annual salary (₹)<input type="number" min="1" value={form.salary || ""} onChange={e => setForm({ ...form, salary: Number(e.target.value) })} placeholder="50000" /></label>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="form-actions"><button className="primary" type="submit">{employee ? "Save changes" : "Add employee"}</button><button className="secondary" type="button" onClick={onCancel}>Cancel</button></div>
    </form>
  );
}