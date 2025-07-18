import { useGetPostQuery } from "@/entities/posts/api/posts.api";
import { Card } from "@/shared/ui/Card/Card";
import { LoadingCircleSpinner } from "@/shared/ui/LoadingCircleSpinner/LoadingCircleSpinner";
import { Author, PopularUser } from "@/widgets/post";
import { useParams } from "react-router";
import Markdown from "markdown-to-jsx";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { formatDate } from "@/shared/utils/format-date";
import { Tag } from "@/shared/ui/Tag/Tag";
import { Separator } from "@/shared/ui/Separator/Separator";
import MorePostsUser from "@/widgets/post/MorePostsUser/MorePostsUser";
import { motion } from "motion/react";
import { useAppSelector } from "@/app/appStore";
import { ButtonFollow } from "@/features/follow";
import { CommentForm, CommentList } from "@/features/comment";
import { LikeButton } from "@/features/like";
import { skipToken } from "@reduxjs/toolkit/query";
import MotionLink from "@/shared/ui/Link/MotionLink";
import { BookMarkButton } from "@/features/bookMarks";
import { ButtonShared } from "@/widgets/ButtonShared";

const options = {
  overrides: {
    Tag: {
      component: Tag,
    },
  },
};

const PostPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPostQuery(id ?? skipToken);

  const userId = useAppSelector((state) => state.auth.auth?.id);

  return (
    <div className="w-[100%] m-auto">
      <meta property="og:title" content={data?.title} />
      <meta property="og:description" content={data?.content.slice(0, 100)} />
      <meta property="og:image" content={data?.imageUrl || ""} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content="Blog Be-On" />
      {isLoading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <LoadingCircleSpinner />
        </div>
      ) : (
        data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-[minmax(900px,_2.5fr)_minmax(250px,_0.5fr)]  gap-5"
          >
            <Card className="p-5">
              <div className="flex justify-between items-center mb-3">
                <MotionLink href={`/profile/${data.user.username}`}>
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={data.user.avatar}
                      username={data.user.displayName}
                    />
                    <div className="flex flex-col justify-center">
                      <p className="text-2xl font-bold py-1">
                        {data.user.displayName}
                      </p>
                      <p className="text-xlf opacity-35">
                        {formatDate(data.user.createdAt)}
                      </p>
                    </div>
                  </div>
                </MotionLink>

                <div className="flex gap-5">
                  <ButtonShared text={data.title} />

                  <LikeButton
                    id={data.id}
                    size={30}
                    isLiked={data.likedByUser}
                  />

                  <BookMarkButton
                    id={data.id}
                    size={30}
                    isBookmarked={data.bookMarkedByUser}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                {data.tags.length > 0 &&
                  data.tags.map((tag) => (
                    <Tag text={tag} href={tag} key={tag} />
                  ))}
              </div>
              <h2 className="text-3xl font-bold mb-3">{data?.title} </h2>
              {data.imageUrl && (
                <img
                  src={data.imageUrl}
                  alt={data.title}
                  className="h-60 w-full object-cover"
                />
              )}

              <article className="max-w-none prose lg:prose-xl dark:prose-invert">
                <Markdown options={options} children={data?.content} />
              </article>
              <Separator size={3} className="my-5" />
              <CommentForm className="mb-5" postId={data.id} />
              <CommentList data={data.comments} />
            </Card>

            <div className="mt-5">
              <div className="sticky max-h-[90vh] overflow-auto top-25">
                <Author
                  className="mb-1"
                  displayName={data.user.displayName}
                  username={data.user.username}
                  bio={data.user.bio || ""}
                  src={data.user.avatar}
                  follower={data.user._count?.followers}
                />
                {userId !== data.user.id && (
                  <div className="w-full mb-5">
                    <ButtonFollow size="lg" className="text-xl" id={data.user.id} />
                  </div>
                )}
                <Separator className="mb-5" />
                {data.morePostsUser.length > 0 && (
                  <MorePostsUser
                    posts={data.morePostsUser}
                    className="mb-5 my-2"
                  />
                )}
                <PopularUser />
              </div>
            </div>
          </motion.div>
        )
      )}
    </div>
  );
};

export default PostPage;
