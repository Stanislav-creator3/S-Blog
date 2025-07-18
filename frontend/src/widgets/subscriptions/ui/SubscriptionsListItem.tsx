import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { cn } from "@/shared/utils/tw-merge";
import { useNavigate } from "react-router";

interface Props {
  className?: string;
  avatar?: string;
  userName: string;
  id: string;
  currentId?: string;
}

const SubscriptionsListItem = ({
  className,
  avatar,
  userName,
  currentId,
  id,
}: Props) => {
  const navigate = useNavigate();

  const onClick = (id: string | null) => {
    if (!id) {
      return navigate("/subscriptions");
    }

    return navigate(`/subscriptions/${id}`);
  };

  return (
    <div
      className={cn(
        className,
        currentId === id && "bg-gray-300",
        "cursor-pointer relative p-1 select-none rounded-2xl transition duration-500 hover:bg-gray-200"
      )}
      onClick={() => (currentId === id ? onClick(null) : onClick(id))}
    >
      <Avatar username={userName} src={avatar} />
    </div>
  );
};

export default SubscriptionsListItem;
