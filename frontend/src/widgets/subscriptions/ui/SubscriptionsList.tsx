import { cn } from "@/shared/utils/tw-merge";
import SubscriptionsListItem from "./SubscriptionsListItem";
import { LinkUi } from "@/shared/ui/Link/Link";
import { useGetMyFollowingsQuery } from "@/features/follow/api/followApi";
import { AvatarSkeleton } from "@/shared/ui/Avatar/AvatarSkeleton";
import { useParams } from "react-router";
import { motion } from "motion/react";
import { MdOutlineSubscriptions } from "react-icons/md";

interface Props {
  className?: string;
}

const listVariants = {
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
  hidden: { opacity: 0, x: -100 },
};

const SubscriptionsList = ({ className }: Props) => {
  const { data, isLoading } = useGetMyFollowingsQuery();
  const { id: currentId } = useParams();

  return (
    <div className={cn("flex items-center gap-5", className)}>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <AvatarSkeleton key={index} />
        ))
      ) : data && data?.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
            }}
            className="flex background p-1 gap-1 rounded-2xl items-center max-w-[600px] overflow-y-hidden  overflow-x-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0"
          >
            {data?.map((item, index) => (
              <motion.div
                key={item.id}
                variants={listVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <SubscriptionsListItem
                  currentId={currentId}
                  userName={item.follower.username}
                  id={item.follower.id}
                  avatar={item.follower.avatar}
                />
              </motion.div>
            ))}
          </motion.div>
          <LinkUi href="/followings">Все</LinkUi>
        </>
      ) : (
        <div className="flex font-bold w-full flex-col h-[70vh] items-center justify-center gap-2">
          <p className="flex items-center gap-2 text-2xl">
            У вас нету подписок{" "}
            <MdOutlineSubscriptions size={30} className="text-base-accent" />{" "}
          </p>
          <LinkUi className="text-xl" href="/">
            Перейти на главную
          </LinkUi>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsList;
