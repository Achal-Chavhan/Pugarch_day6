import { useEffect, useMemo, useState } from "react";
import DashboardCards from "./components/DashboardCards";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeDetails from "./components/EmployeeDetails";
import { fetchEmployees, makeEmployee } from "./api";
import type { Employee, EmployeeInput } from "./types";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [sort, setSort] = useState("name-asc");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [selected, setSelected] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees()
      .then(setEmployees)
      .catch(error => setApiError(error instanceof Error ? error.message : "An unexpected API error occurred."))
      .finally(() => setLoading(false));
  }, []);

  const departments = useMemo(() => [...new Set(employees.map(employee => employee.department))].sort(), [employees]);
  const visibleEmployees = useMemo(() => {
    const query = search.toLowerCase().trim();
    return employees.filter(employee =>
      (employee.name.toLowerCase().includes(query) || employee.email.toLowerCase().includes(query)) &&
      (department === "All" || employee.department === department)
    ).sort((a, b) => {
      switch (sort) {
        case "name-desc": return b.name.localeCompare(a.name);
        case "salary-asc": return a.salary - b.salary;
        case "salary-desc": return b.salary - a.salary;
        default: return a.name.localeCompare(b.name);
      }
    });
  }, [employees, search, department, sort]);

  function saveEmployee(input: EmployeeInput) {
    if (editing) {
      setEmployees(current => current.map(employee => employee.id === editing.id ? { ...employee, ...input } : employee));
    } else {
      const nextId = Math.max(0, ...employees.map(employee => employee.id)) + 1;
      setEmployees(current => [...current, makeEmployee(input, nextId)]);
    }
    setEditing(null);
    setFormOpen(false);
  }

  function startEdit(employee: Employee) {
    setEditing(employee);
    setFormOpen(true);
    setSelected(null);
  }

  function deleteEmployee(employee: Employee) {
    if (window.confirm(`Delete ${employee.name}? This cannot be undone.`)) {
      setEmployees(current => current.filter(item => item.id !== employee.id));
      if (selected?.id === employee.id) setSelected(null);
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar"><div className="brand-mark">EM</div><div className="brand-copy"><strong>PeopleDesk</strong><span>Employee management</span></div><span className="topbar-tag">DAY 06 PROJECT</span></header>
      <section className="welcome"><div><p className="eyebrow">OVERVIEW</p><h1>Employee Dashboard</h1><p className="muted">Manage your team, departments and salary information in one place.</p></div><button className="primary add-main" onClick={() => { setEditing(null); setFormOpen(true); }}>＋ Add employee</button></section>
      <DashboardCards employees={employees} />
      {apiError && <div className="notice"><strong>API connection issue:</strong> {apiError} Check your internet connection and refresh the page.</div>}
      <section className="employees-panel">
        <div className="panel-heading"><div><h2>All employees</h2><p className="muted">{visibleEmployees.length} employees shown</p></div></div>
        <div className="toolbar">
          <label className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or email..." /></label>
          <select aria-label="Filter by department" value={department} onChange={e => setDepartment(e.target.value)}><option>All</option>{departments.map(item => <option key={item}>{item}</option>)}</select>
          <select aria-label="Sort employees" value={sort} onChange={e => setSort(e.target.value)}><option value="name-asc">Name: A to Z</option><option value="name-desc">Name: Z to A</option><option value="salary-asc">Salary: Low to high</option><option value="salary-desc">Salary: High to low</option></select>
        </div>
        {loading ? <div className="empty">Loading employees from API…</div> : <EmployeeTable employees={visibleEmployees} onDetails={setSelected} onEdit={startEdit} onDelete={deleteEmployee} />}
      </section>
      <footer>PeopleDesk · React + TypeScript employee management demo</footer>
      {formOpen && <div className="modal-backdrop"><div className="form-modal"><button className="close-button" onClick={() => { setFormOpen(false); setEditing(null); }} aria-label="Close form">×</button><EmployeeForm employee={editing} onSave={saveEmployee} onCancel={() => { setFormOpen(false); setEditing(null); }} /></div></div>}
      {selected && <EmployeeDetails employee={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}