import useUser from "hooks/useUser";
import React from "react";
import { useAuth } from "services/auth";
import { RoundThumb } from "styles/style";

function UserThumb({ user_id }) {
  const { user, isLoading } = useUser(user_id);

  return (
    <RoundThumb
      title={user?.name}
      src={
        !isLoading && user.profile_pic ? user.profile_pic : "/img/user/avatar.png"
      }
      className="mr-2 items-end"
    />
  );
}

function AuthUserThumb() {
  const { user } = useAuth();

  return (
    <RoundThumb
      src={user?.profile_pic ? user.profile_pic : "/img/user/avatar.png"}
      className="mr-2 items-end"
    />
  );
}

export { UserThumb, AuthUserThumb };
