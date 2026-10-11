export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
}

export const employees: Employee[] = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", department: "Engineering", salary: 65000 },
  { id: 2, name: "Priya Patil", email: "priya@example.com", department: "HR", salary: 48000 },
  { id: 3, name: "Rohan Deshmukh", email: "rohan@example.com", department: "Design", salary: 52000 },
  { id: 4, name: "Neha Joshi", email: "neha@example.com", department: "Engineering", salary: 72000 }
];

export function averageSalary(list: Employee[]): number {
  if (list.length === 0) return 0;
  return list.reduce((sum, employee) => sum + employee.salary, 0) / list.length;
}

export function getDepartments(list: Employee[]): string[] {
  return [...new Set(list.map(employee => employee.department))].sort();
}