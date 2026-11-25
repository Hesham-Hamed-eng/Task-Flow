
import type { User } from "../types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@taskflow.com",
    password: "123456",
    role: "admin",
  },
  {
    id: "user-2",
    name: "Hesham Hamed",
    email: "hesham@taskflow.com",
    password: "123456",
    role: "member",
  },
  {
    id: "user-3",
    name: "Sara Ahmed",
    email: "sara@taskflow.com",
    password: "123456",
    role: "member",
  },
];
