import { cn } from "@/shared/utils/tw-merge";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useLikePostMutation, useUnlikePostMutation } from "../api/likeApi";
import { AnimationSequence, useAnimate } from "motion/react";
import { useAppSelector } from "@/app/appStore";
import toast from "react-hot-toast";

interface LikeButtonProps {
  id: string;
  isLiked?: boolean;
  className?: string;
  size?: number;
}
const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const LikeButton = ({
  id,
  isLiked = false,
  className,
  size = 25,
}: LikeButtonProps) => {
  const user = useAppSelector((state) => state.auth.auth);
  const [scope, animate] = useAnimate();
  const [likePost, { isLoading: isLoadingLike }] = useLikePostMutation();
  const [unLikePost, { isLoading: isLoadingUnLike }] = useUnlikePostMutation();

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Пожалуйста, авторизуйтесь");
      return;
    }
    const sparkles = Array.from({ length: 20 });
    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-100, 100),
        y: randomNumberBetween(-100, 100),
        scale: randomNumberBetween(1.5, 2.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: "<",
      },
    ]);

    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: 0.6,
      },
    ]);

    const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.000001,
      },
    ]);

    animate([
      ...sparklesReset,
      [scope.current, { scale: 0.8 }, { duration: 0.1 }],
      [scope.current, { scale: 1 }, { duration: 0.1 }],
      ...sparklesAnimation,
      ...sparklesFadeOut,
    ]);

    return isLiked ? await unLikePost({ id }) : await likePost({ id });
  };

  return (
    <button
      ref={scope}
      disabled={isLoadingLike || isLoadingUnLike}
      className={cn(
        "glass cursor-pointer p-1 relative z-5 transition-[scale] duration-300 hover:scale-115",
        className
      )}
      onClick={(e) => {
        handleLike(e, id);
      }}
    >
      {isLiked ? (
        <IoMdHeart size={size} className="text-base-accent" />
      ) : (
        <IoMdHeartEmpty size={size} className="text-base-accent" />
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 block"
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <IoMdHeart
            key={index}
            size={15}
            className={`text-base-accent absolute left-1/2 top-1/2 opacity-0 sparkle-${index}`}
          />
        ))}
      </span>
    </button>
  );
};

export default LikeButton;
