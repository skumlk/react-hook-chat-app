import { useFirebaseAuth } from "context/firebase/auth-context";
import useUser from "hooks/useUser";
import React from "react";
import { RoundThumb } from "styles/style";

function UserThumb({ user_id }) {
  const { user, isLoading } = useUser(user_id);

  return (
    <RoundThumb
      src={
        !isLoading && user.profile_pic ? user.profile_pic : "/img/user/avatar.png"
      }
      className="mr-2 items-end"
    />
  );
}

function AuthUserThumb() {
  const { user } = useFirebaseAuth();

  return (
    <RoundThumb
      src={user?.profile_pic ? user.profile_pic : "/img/user/avatar.png"}
      className="mr-2 items-end"
    />
  );
}

export { UserThumb, AuthUserThumb };
