import type { Employee } from "../types";

interface Props { employees: Employee[] }

export default function DashboardCards({ employees }: Props) {
  const average = employees.length
    ? employees.reduce((sum, employee) => sum + employee.salary, 0) / employees.length
    : 0;
  const departments = new Set(employees.map(employee => employee.department)).size;

  return (
    <section className="summary-grid" aria-label="Dashboard summary">
      <article className="summary-card"><span>Total employees</span><strong>{employees.length}</strong><small>Current employee records</small></article>
      <article className="summary-card"><span>Average salary</span><strong>₹{Math.round(average).toLocaleString("en-IN")}</strong><small>Across listed employees</small></article>
      <article className="summary-card"><span>Departments</span><strong>{departments}</strong><small>Unique departments</small></article>
    </section>
  );
}