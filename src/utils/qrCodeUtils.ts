import type { Employee } from "../types/employee";

export const generateEmployeeVCard = (employee: Employee): string => {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${employee.fullNameEn}`,
    `ORG:Mahd Sports Academy;${employee.department}`,
    `TITLE:${employee.jobTitle}`,
    `EMAIL:${employee.email}`,
    `TEL;TYPE=CELL:${employee.mobileNumber}`,
    "END:VCARD",
  ].join("\n");
};
