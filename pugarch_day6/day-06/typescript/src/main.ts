import { employees, averageSalary, getDepartments } from "./employee";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("App element not found");

app.innerHTML = `
  <main>
    <h1>TypeScript Employee Dashboard</h1>
    <section class="cards">
      <article><span>Total employees</span><strong>${employees.length}</strong></article>
      <article><span>Average salary</span><strong>₹${Math.round(averageSalary(employees)).toLocaleString("en-IN")}</strong></article>
      <article><span>Departments</span><strong>${getDepartments(employees).length}</strong></article>
    </section>
    <h2>Employees</h2>
    <table>
      <thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Salary</th></tr></thead>
      <tbody>${employees.map(employee => `
        <tr><td>${employee.name}</td><td>${employee.email}</td><td>${employee.department}</td><td>₹${employee.salary.toLocaleString("en-IN")}</td></tr>
      `).join("")}</tbody>
    </table>
    <p class="note">This folder demonstrates typed employee data and reusable calculation functions.</p>
  </main>
`;

import "./style.css";
