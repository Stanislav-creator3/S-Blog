import { Card } from "@/shared/ui/Card/Card";
import { cn } from "@/shared/utils/tw-merge";
import { BsFilePost } from "react-icons/bs";
import { FaComment } from "react-icons/fa";

interface Props {
  className?: string;
  postsCount: number;
  commentsCount: number;
}

const UserStats = ({ className, postsCount, commentsCount }: Props) => {
  return (
    <Card className={cn(className, "flex flex-col gap-2")}>
      <p className="flex items-center gap-2 text-xl">
        <BsFilePost className="text-base-accent" /> Публикации: {postsCount}
      </p>
      <p className="flex items-center gap-2 text-xl">
        <FaComment className="text-base-accent" /> Комментарии: {commentsCount}
      </p>
    </Card>
  );
};

export default UserStats;
