import { selectAuth, selectIsAuthenticated } from "@/redux/features/auth/authSelectors";
import { useAppSelector } from "@/redux/hooks";

export const useAuth = () => {
  const auth = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return {
    ...auth,
    isAuthenticated,
  };
};
