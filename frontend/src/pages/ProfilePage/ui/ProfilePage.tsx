import { useGetUserQuery } from "@/entities/users/api/user.api";
import { ButtonFollow } from "@/features/follow";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Card } from "@/shared/ui/Card/Card";
import { LoadingCircleSpinner } from "@/shared/ui/LoadingCircleSpinner/LoadingCircleSpinner";
import { formatDate } from "@/shared/utils/format-date";
import { skipToken } from "@reduxjs/toolkit/query";
import { Link, useParams } from "react-router";
import { MdDateRange } from "react-icons/md";
import { getSocialIcon } from "@/shared/utils/getSocialIcon";
import { PostCard } from "@/widgets/post";
import { UserFollow, UserStats } from "@/widgets/User";
import { useAppSelector } from "@/app/appStore";

const ProfilePage = () => {
  const { username } = useParams();
  const id = useAppSelector((state) => state.auth.auth?.id);
  const { data, isLoading, isError } = useGetUserQuery(username ?? skipToken);

  if (isError) {
    return <div>error</div>;
  }

  return (
    <div className="w-[100%]">
      {isLoading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <LoadingCircleSpinner />
        </div>
      ) : (
        <>
          <div className="rounded-t-[5px] h-[150px] bg-base-accent"></div>
          <Card className="mb-1" rounded="none">
              <div className="flex min-h-[50px] relative justify-between mb-10">
                <div>
                  <Avatar
                    className="absolute top-[-60px] left-[0%]"
                    size={8}
                    src={data?.avatar}
                    username={data?.username || ""}
                  />
                </div>
                {id !== data?.id && <ButtonFollow id={data?.id || ""} />}
              </div>
              <div className="flex flex-col  gap-2">
                <p className="font-bold text-3xl">{data?.displayName}</p>
                <p className="text-2xl">{data?.bio}</p>
                <p className="flex items-center text-xl gap-1">
                  <MdDateRange className="text-base-accent" size={30} /> C нами
                  с {formatDate(data?.createdAt || "")}
                </p>
                {data?.socialLinks && data?.socialLinks.length > 0 && (
                  <div className="grid gap-x-3 md:grid-cols-3 xl:grid-cols-8">
                    {data?.socialLinks.map((item) => {
                      const Icon = getSocialIcon(item.url);
                      return (
                        <Link
                          to={item.url}
                          key={item.id}
                          className="flex items-center gap-2 text-[15px] transition-colors duration-300 hover:text-base-accent"
                        >
                          <Icon size={30} />
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
            </div>
          </Card>
          <div className="grid grid-cols-[minmax(250px,_0.5fr)_minmax(500px,_2.5fr)] gap-2">
            <div className="flex flex-col gap-2">
              <UserFollow
                className="p-5"
                followers={data?._count?.followers || 0}
                followings={data?._count?.followings || 0}
              />
              <UserStats
                className="p-5"
                postsCount={data?._count?.posts || 0}
                commentsCount={data?._count?.comments || 0}
              />
            </div>

            {data?.posts?.length === 0 ? (
              <p className="flex justify-center items-center text-2xl ">
                Посты отсутствуют
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {data?.posts?.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    createdAt={post.createdAt}
                    countComments={post._count.comments}
                    countLikes={post._count.likes}
                    follower={data?._count?.followers || 0}
                    tags={post.tags}
                    likedByUser={post.likedByUser}
                    bookMarkedByUser={post.bookMarkedByUser}
                    user={data}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
