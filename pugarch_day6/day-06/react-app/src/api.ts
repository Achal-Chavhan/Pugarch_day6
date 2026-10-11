import type { Employee, EmployeeInput } from "./types";

// Demo API: JSONPlaceholder does not provide a real employee database.
// The app uses local state for CRUD and fetches initial records from this API.
const API_URL = "https://jsonplaceholder.typicode.com/users";

interface ApiUser {
  id: number;
  name: string;
  email: string;
  company?: { name?: string };
}

export async function fetchEmployees(): Promise<Employee[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Could not load employees from the API.");
  const users = (await response.json()) as ApiUser[];
  const departments = ["Engineering", "HR", "Design", "Marketing"];
  return users.map((user, index) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    department: departments[index % departments.length],
    salary: 40000 + (index * 4750)
  }));
}

export function makeEmployee(input: EmployeeInput, id: number): Employee {
  return { id, ...input };
}