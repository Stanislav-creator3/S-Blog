import { Avatar } from "@/shared/ui/Avatar/Avatar";
import MotionLink from "@/shared/ui/Link/MotionLink";
import { formatFollower } from "@/shared/utils/formatFollower";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  username: string;
  displayName: string;
  avatarUrl?: string;
  count: number;
  className?: string;
}

const PopularUserItem = ({ displayName, username, avatarUrl, count, className }: Props) => {
  return (
    <MotionLink href={`/profile/${username}`} className={cn(className)}>
      <div className="flex items-center gap-2">
        <Avatar size={3} username={username} src={avatarUrl} />
        <div className="flex flex-col justify-center">
          <p className="font-bold text-sm">{displayName}</p>
          <p className="opacity-35"> {formatFollower(count)} подписчики</p>
        </div>
      </div>
    </MotionLink>
  );
};

export default PopularUserItem;
