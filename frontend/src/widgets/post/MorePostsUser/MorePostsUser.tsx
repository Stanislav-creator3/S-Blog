import { IPost } from "@/entities/posts/model/types";
import { MorePostsUserItem } from "./MorePostsUserItem";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  className?: string;
  posts: IPost[];
}

const MorePostsUser = ({ className, posts }: Props) => {
  return (
    <div className={cn(className, "flex flex-col justify-center")}>
      <p>Ещё статьи автора</p>
      {posts.map((post) => (
        <MorePostsUserItem post={post} key={post.id} />
      ))}
    </div>
  );
};

export default MorePostsUser;
