import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Card } from "@/shared/ui/Card/Card";
import { formatFollower } from "@/shared/utils/formatFollower";
import { Link } from "react-router";

interface Props {
  username: string;
  follower: number;
  displayName: string;
  src?: string;
}

const AuthorCard = ({ username, src, follower, displayName }: Props) => {
  return (
    <Link className="transition duration-300 hover:shadow-xl hover:scale-95" to={`/profile/${username}`}>
      <Card className="max-w-[500px] w-full max-h-[300px] h-full flex gap-2 items-center p-2">
        <Avatar size={6} username={username} src={src} />
        <div className="flex flex-col gap-5">
          <p className="font-bold text-2xl">{displayName}</p>
          <div className="flex gap-5 justify-between">
            <p className="text-xl">
              Специальность: <span className="opacity-35">Fronted</span>
            </p>
            <p className="text-xl">
              Подписчики:{" "}
              <span className="opacity-35">{formatFollower(follower)}</span>{" "}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default AuthorCard;
