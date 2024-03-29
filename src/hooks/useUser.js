import { useQuery } from "react-query";
import { useUserApi } from "services/user";

function useUser(user_id) {
  const { getUserById } = useUserApi();
  const { status, data: user, isLoading, error } = useQuery(
    ["user", user_id],
    () => getUserById(user_id),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  return { status, user, isLoading, error };
}

export default useUser;