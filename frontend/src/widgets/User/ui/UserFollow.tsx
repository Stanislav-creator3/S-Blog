import { Card } from "@/shared/ui/Card/Card";
import { formatFollower } from "@/shared/utils/formatFollower";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  className?: string;
  followers?: number;
  followings?: number;
}

const UserFollow = ({ className, followers, followings }: Props) => {
  return (
    <Card className={cn(className, "text-xl")}>
      <p>Подписчиков: {formatFollower(followers || 0)}</p>
      <p>Подписки: {formatFollower(followings || 0)}</p>
    </Card>
  );
};

export default UserFollow;