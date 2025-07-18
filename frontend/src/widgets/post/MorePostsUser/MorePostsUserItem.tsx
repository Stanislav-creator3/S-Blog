import { IPost } from "@/entities/posts/model/types";
import { LinkUi } from "@/shared/ui/Link/Link";
import MotionLink from "@/shared/ui/Link/MotionLink";

interface Props {
  post: IPost;
  className?: string;
}

export const MorePostsUserItem = ({ post, className }: Props) => {
  const text = post.content.slice(0, 50);
  const tag = post.tags.slice(0, 1).toString();

  return (
    <MotionLink className={className} href={`/posts/${post.id}`}>
      <LinkUi className="mb-1 text-sm" href={`/tags/${tag}`}>
        {tag}
      </LinkUi>
      <p className="mb-1 text-sm ">{post.title}</p>
      <p className="font-bold text-sm opacity-35">{text}...</p>
    </MotionLink>
  );
};
