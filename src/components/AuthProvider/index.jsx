import { useCurrentUser } from "~/features/Auth/Hook";

function AuthProvider() {
  useCurrentUser();

  return null;
}

export default AuthProvider;
