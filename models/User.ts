type UserRole = "ADMIN" | "MANAGER" | "SUPERVISOR" | "SALESMAN";

export interface User {
  id: string;
  name: string;
  role: any;
}
