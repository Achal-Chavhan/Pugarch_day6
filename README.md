# Pugarch_day6

About the Project
This project is part of my Day-06 practice. I converted a basic employee dashboard to TypeScript and built a React Employee Management Dashboard with employee information, summary cards, and employee management features.

**Project Structure**
day-06/
├── typescript/
│   ├── src/
│   │   ├── employee.ts
│   │   ├── main.ts
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   └── tsconfig.json
├── react-app/
    ├── src/
    │   ├── components/
    │   │   ├── DashboardCards.tsx
    │   │   ├── EmployeeDetails.tsx
    │   │   ├── EmployeeForm.tsx
    │   │   └── EmployeeTable.tsx
    │   ├── api.ts
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   └── types.ts
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts


**Features**
-->Dashboard
- Displays the total number of employees.
- Calculates the average salary.
- Shows the number of unique departments.
 
-->Employee Management
- View the employee list.
- Search by employee name or email.
- Filter employees by department.
- Sort employees by name or salary.
- View individual employee details.
- Add new employees.
- Edit existing employee information.
- Delete employees after confirmation.

-->Technical Features
- TypeScript interfaces for employee data.
- Reusable React components.
- Form validation for required fields, email addresses, and salary.
- API integration to load sample employee records.
- Loading and error messages for the API request.
- Responsive layout for smaller screens.
 
**Technologies Used**
- HTML
- CSS
- JavaScript
- TypeScript
- React
- Vite
- Fetch API
   
**Requirements**
Install Node.js (LTS) before running the projects. npm is included with the standard Node.js installation.

_How to Run the TypeScript Project_
Open a terminal in VS Code and run:
cd day-06/typescript
npm install
npm run dev
Open the local URL displayed in the terminal.

_How to Run the React Project_
Open a separate terminal in VS Code and run:
cd day-06/react-app
npm install
npm run dev
Open the local URL displayed by Vite in your browser.

If PowerShell blocks the npm command, use npm.cmd instead:
npm.cmd install
npm.cmd run dev
Run these commands from the relevant project folder.

**API Information**
The React project fetches sample user records from JSONPlaceholder and maps them to employee records for demonstration purposes.
Adding, editing, and deleting employees currently updates the React application's local state. These changes are not saved permanently to a server and will reset when the page is refreshed. A production version would connect these operations to a backend API and database.
