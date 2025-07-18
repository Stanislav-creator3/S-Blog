import { Button } from "@/shared/ui/Button/Button";
import { SlUserFollow } from "react-icons/sl";
import {
  useFollowMutation,
  useGetMyFollowingsQuery,
  useGetSubscriptionInfiniteQuery,
  useUnFollowMutation,
} from "../api/followApi";
import { useState } from "react";
import { LoadingCircleSpinner } from "@/shared/ui/LoadingCircleSpinner/LoadingCircleSpinner";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { useAppSelector } from "@/app/appStore";

interface Props {
  id: string;
  className?: string;
  size?: "sm" | "lg";
}


const ButtonFollow = ({ className, size , id }: Props) => {
  const user = useAppSelector((state) => state.auth.auth);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [follow, { isLoading: isLoadingFollow }] = useFollowMutation();
  const [unFollow, { isLoading: isLoadingUnFollow }] = useUnFollowMutation();
  const { data, refetch } = useGetMyFollowingsQuery();
  const { refetch: refetchSubscription } = useGetSubscriptionInfiniteQuery("");

  const isFollow = data?.some((follower) => follower.followerId === id);

  const onClick = async () => {
    if (!user) {
      toast.error("Пожалуйста, авторизуйтесь");
      return;
    }
    try {
      setLoaded(false);
      setLoading(true);
      const data = isFollow
        ? await unFollow({ followId: id }).unwrap()
        : await follow({ followId: id }).unwrap();

      if (data) {
        setTimeout(() => {
          setLoading(false);
        }, 2500);
        setTimeout(() => {
          setLoaded(true);
        }, 500);
      }
      refetchSubscription();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={onClick}
      intent="secondary"
      className={className}
      size={size}
      disabled={isLoadingFollow || isLoadingUnFollow || loading}
    >
      {loading ? (
        loaded ? (
          <motion.span
            animate={{
              opacity: [0, 1, 1, 0],
              y: [-10, 0, 0, 20],
            }}
            transition={{
              duration: 2,
              times: [0, 0.3, 0.9, 1],
            }}
          >
            Успешно!
          </motion.span>
        ) : (
          <LoadingCircleSpinner w={20} h={20} />
        )
      ) : (
        <>
          <SlUserFollow/> {isFollow ? "Отписаться" : "Подписаться"}
        </>
      )}
    </Button>
  );
};

export default ButtonFollow;
