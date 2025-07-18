import { Avatar } from "@/shared/ui/Avatar/Avatar";

import { FC } from "react";
import { cn } from "@/shared/utils/tw-merge";
import { formatFollower } from "@/shared/utils/formatFollower";
import MotionLink from "@/shared/ui/Link/MotionLink";

type Props = {
  displayName: string;
  username: string;
  src?: string;
  bio?: string;
  follower?: number;
  className?: string;
};

const Author: FC<Props> = ({
  className,
  displayName,
  username,
  bio,
  src,
  follower,
}) => {
  return (
    <div className={cn(className, "flex flex-col gap-2")}>
      <MotionLink
        href={`/profile/${username}`}
      >
        <div className="flex items-center gap-2">
          <Avatar src={src} username={username} size={3} />
          <div className="flex flex-col">
            <h2 className="text-sm font-bold">{displayName}</h2>
            {follower && (
              <p className="text-base-black text-sm opacity-35">
                {formatFollower(follower)} подписчиков
              </p>
            )}
          </div>
        </div>
      </MotionLink>
      <p className="text-base-black">{bio}</p>
    </div>
  );
};

export default Author;
