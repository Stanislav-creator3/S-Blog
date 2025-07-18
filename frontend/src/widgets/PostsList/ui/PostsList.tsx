import { IPost } from "@/entities/posts/model/types";
import { tabContentVariants } from "@/pages/mainPage/ui/MainPages";
import { LinkUi } from "@/shared/ui/Link/Link";
import PostCard from "@/widgets/post/PostCard/ui/PostCard";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  allResults: IPost[];
  title?: string;
  isNotPostTitle: string;
}

const PostsList = ({ allResults, title, isNotPostTitle }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={tabContentVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{
          duration: 0.3,
        }}
      >
        {allResults.length > 0 ? (
          <>
            {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
            <ul className="grid gap-5">
              <AnimatePresence initial={false} mode="popLayout">
                {allResults.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 0, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring" }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <PostCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      image={item.imageUrl}
                      follower={item.user._count?.followers ?? 0}
                      tags={item.tags}
                      createdAt={item.createdAt}
                      user={item.user}
                      countComments={item._count.comments}
                      countLikes={item._count.likes}
                      likedByUser={item.likedByUser}
                      bookMarkedByUser={item.bookMarkedByUser}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </>
        ) : (
          <h2 className="flex flex-col h-[80vh] items-center justify-center  text-2xl font-bold mb-2">
            {isNotPostTitle}
            <LinkUi href="/">Перейти на главную</LinkUi>
          </h2>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PostsList;
