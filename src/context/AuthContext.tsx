
import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types";
import { mockUsers } from "../data/mockUsers";

type SafeUser = Omit<User, "password">;

interface AuthContextType {
  currentUser: SafeUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function getStoredUsers(): User[] {
  const storedUsers = localStorage.getItem("taskflow_users");

  if (!storedUsers) {
    localStorage.setItem("taskflow_users", JSON.stringify(mockUsers));
    return mockUsers;
  }

  try {
    return JSON.parse(storedUsers) as User[];
  } catch {
    localStorage.setItem("taskflow_users", JSON.stringify(mockUsers));
    return mockUsers;
  }
}

function getStoredSession(): SafeUser | null {
  const session = localStorage.getItem("taskflow_session");

  if (!session) {
    return null;
  }

  try {
    return JSON.parse(session) as SafeUser;
  } catch {
    localStorage.removeItem("taskflow_session");
    return null;
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(
    getStoredSession
  );

  function login(email: string, password: string): boolean {
    const users = getStoredUsers();

    const user = users.find(
      (item) => item.email === email && item.password === password
    );

    if (!user) {
      return false;
    }

    const safeUser: SafeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    setCurrentUser(safeUser);
    localStorage.setItem("taskflow_session", JSON.stringify(safeUser));

    return true;
  }

  function register(
    name: string,
    email: string,
    password: string
  ): boolean {
    const users = getStoredUsers();

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      return false;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role: "member",
    };

    users.push(newUser);
    localStorage.setItem("taskflow_users", JSON.stringify(users));

    return true;
  }

  function logout(): void {
    setCurrentUser(null);
    localStorage.removeItem("taskflow_session");
  }

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: currentUser !== null,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
