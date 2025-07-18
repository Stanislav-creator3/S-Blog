import { Card } from "@/shared/ui/Card/Card";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router";

interface Props {
  id: string;
  title: string;
  content: string;
  countComments: number;
}

const DiscussionPosts = ({ id, title, content, countComments }: Props) => {
  return (
    <Link to={`/posts/${id}`}>
      <Card className="transition  duration-500 hover:border-border-hover">
        <div className="flex justify-between items-center"></div>
        <div className="p-1">
          <p className="font-bold text-sm text-nowrap overflow-ellipsis overflow-hidden mb-2">
            {title}
          </p>
          <p className="opacity-35 ">
            {content.length > 50 ? content.slice(0, 50) + "..." : content}
          </p>
          <div className="flex justify-between items-center ">
            <p className="flex text-sm gap-1 items-center justify-center">
              <FaRegComment size={15} className="text-base-accent" />
              Комментариев: {countComments}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DiscussionPosts;
