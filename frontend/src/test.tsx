import { useAuth } from "./AuthContext";

export default function TestUser() {
  const { user, loading } = useAuth();
  if (loading) return <div>Chargement...</div>;
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
