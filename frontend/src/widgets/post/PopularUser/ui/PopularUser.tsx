import { useGetPopularUsersQuery } from "@/entities/users/api/user.api";
import PopularUserItem from "./PopularUserItem";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  className?: string;
}

const PopularUser = ({ className }: Props) => {
  const { data, isLoading } = useGetPopularUsersQuery();
  return isLoading ? (
    <div>loading</div>
  ) : (
    data?.length && (
      <div className={cn(className, "flex flex-col")}>
        <h2 className="text-lg font-bold mb-2">Популярные пользователи</h2>
        {data.map((user) => (
          <PopularUserItem
            className="mb-4"
            key={user.id}
            username={user.username}
            displayName={user.display_name}
            avatarUrl={user.avatar}
            count={user.count}
          />
        ))}
      </div>
    )
  );
};

export default PopularUser;
