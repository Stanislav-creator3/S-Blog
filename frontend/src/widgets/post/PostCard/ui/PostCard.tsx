import { useAppSelector } from "@/app/appStore";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Tag } from "@/shared/ui/Tag/Tag";
import { formatDate } from "@/shared/utils/format-date";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import { useDeletePostMutation } from "../../../../entities/posts/api/posts.api";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { formatFollower } from "@/shared/utils/formatFollower";
import { LikeButton } from "@/features/like";
import { FaRegComment } from "react-icons/fa";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import { cn } from "@/shared/utils/tw-merge";
import MotionLink from "@/shared/ui/Link/MotionLink";
import { BookMarkButton } from "@/features/bookMarks";

type Props = {
  id: string;
  title: string;
  image?: string;
  tags: string[];
  createdAt: Date;
  countComments: number;
  countLikes: number;
  user: {
    id: string;
    username: string;
    avatar?: string;
    displayName: string;
  };
  follower: number;
  likedByUser?: boolean;
  bookMarkedByUser?: boolean;
};

const PostCard: React.FC<Props> = ({
  id,
  title,
  image,
  tags,
  createdAt,
  user,
  countLikes,
  follower,
  countComments,
  likedByUser,
  bookMarkedByUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletePost] = useDeletePostMutation();

  const userId = useAppSelector((state) => state.auth.auth?.id);

  const onOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const onDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    setTimeout(() => {
      deletePost({ id });
    }, 300);
  };
  return (
    <>
      <Link
        to={`/posts/${id}`}
        className={cn(
          userId === user.id && "overflow-hidden",
          "relative grid rounded-[5px] background group transition duration-500 hover:border-border-hover"
        )}
      >
        {userId === user.id && (
          <div
            className="absolute flex gap-2 items-center justify-center drop-shadow-lg p-2 
          rounded-2xl translate-x-15 bg-base-white invisible opacity-0 transition-visibility 
          duration-300 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 top-2 right-2"
          >
            <Link to={`/write/${id}`}>
              <FaEdit
                className="transition duration-300 hover:text-blue-500"
                size={30}
              />
            </Link>
            <MdDelete
              onClick={onOpen}
              className="cursor-pointer transition duration-300 hover:text-red-500"
              size={30}
            />
          </div>
        )}
        {image && (
          <img
            className="object-cover rounded-t-[5px] h-[300px] w-full"
            src={image}
          />
        )}
        <div className="p-4">
          <div className="flex justify-between items-center gap-3 mb-2">
            <MotionLink href={`/profile/${user.username}`}>
              <div className="flex gap-2 items-center">
                <Avatar src={user?.avatar} username={user?.username} />
                <div>
                  <p className="font-bold text-2xl"> {user.displayName} </p>
                  {follower && follower > 10 && (
                    <p className=" flex gap-1 opacity-50">
                      {formatFollower(follower)} подписчиков
                    </p>
                  )}
                </div>
              </div>
            </MotionLink>
            {userId !== user.id && (
              <div className="flex items-center gap-2">
                <LikeButton isLiked={likedByUser} id={id} size={30} />
                <BookMarkButton
                  id={id}
                  size={30}
                  isBookmarked={bookMarkedByUser}
                />
              </div>
            )}
          </div>
          <div className="p-1">
            <p className="font-bold text-2xl  p-1 mb-2">{title}</p>
            <div className="flex justify-between items-center ">
              <div className="flex gap-3 items-center">
                <p className="flex glass p-2 gap-2 items-center">
                  <HiOutlineCalendarDateRange
                    size={20}
                    className="text-base-accent"
                  />
                  {formatDate(createdAt)}
                </p>
                {countComments > 0 && (
                  <p className="flex glass p-2 gap-2 items-center">
                    <FaRegComment size={20} className="text-base-accent" />
                    Комментариев: {countComments}
                  </p>
                )}

                {countLikes > 0 && (
                  <div className="flex glass p-2 gap-1 items-center">
                    <IoMdHeartEmpty size={20} className="text-base-accent" />
                    <p>Нравится: {countLikes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end flex-wrap w-[30vw] gap-3">
                {tags.map((tag, index) => (
                  <Tag key={index} href={tag} text={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <Modal width="md" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Удаление статьи</Modal.Header>
        <Modal.Body>
          {`Вы действительно хотите удалить статью: ${title}?`}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => onDelete(e, id)} intent="ghost">
            Да
          </Button>
          <Button onClick={() => setIsOpen(false)}>Нет</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostCard;
