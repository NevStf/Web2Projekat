import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export default function useAuth() {
  return useContext(AuthContext);
}