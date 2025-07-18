import { motion, useAnimate } from "motion/react";
import { PiBookmarkSimple } from "react-icons/pi";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import {
  useCreateBookMarkMutation,
  useDeleteBookMarkMutation,
} from "../api/bookMarkApi";
import { useAppSelector } from "@/app/appStore";
import toast from "react-hot-toast";

interface Props {
  id: string;
  size?: number;
  isBookmarked?: boolean;
}

const BookMarkButton = ({ id, isBookmarked=false, size = 25 }: Props) => {
  const user = useAppSelector((state) => state.auth.auth);
  const [createBookMark, { isLoading: isLoadingCreate }] =
    useCreateBookMarkMutation();
  const [deleteBookMark, { isLoading: isLoadingDelete }] =
    useDeleteBookMarkMutation();
  const [scope, animate] = useAnimate();

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Пожалуйста, авторизуйтесь");
      return;
    }

    animate([
      [scope.current, { opacity: 0 }, { duration: 0.1 }],
      [scope.current, { opacity: 1 }, { duration: 0.4 }],
      [scope.current, { scale: 0.8 }, { duration: 0.1, at: "<" }],
      [scope.current, { scale: 1 }, { duration: 0.1 }],
    ]);

    return isBookmarked ? await deleteBookMark({id}) : await createBookMark({id});
  };


  return (
    <motion.button
      ref={scope}
      whileHover={{ scale: 1.1 }}
      onClick={(e) => handleLike(e)}
      disabled={isLoadingCreate || isLoadingDelete}
      className="glass mr-2 p-1 cursor-pointer"
    >
      {isBookmarked ? (
        <PiBookmarkSimpleFill size={size} className="text-base-accent" />
      ) : (
        <PiBookmarkSimple size={size} className="text-base-accent" />
      )}
    </motion.button>
  );
};

export default BookMarkButton;
