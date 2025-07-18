import { IFollow } from "@/features/follow/api/followApi";
import { AuthorCard } from "@/widgets/AuthorCard";

interface Props {
  data: IFollow[];
  title: string;
}

const FollowList = ({ data, title }: Props) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <div className="flex flex-wrap gap-5">
        {data?.map((item) => (
          <AuthorCard
            key={item.id}
            displayName={item.follower.displayName}
            username={item.follower.username}
            follower={item.follower._count.followers}
          />
        ))}
      </div>
    </>
  );
};

export default FollowList;
