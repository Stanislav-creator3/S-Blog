import { useAppSelector } from "@/app/appStore";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { ruFormatter } from "@/shared/utils/ruFormatter";
import { cn } from "@/shared/utils/tw-merge";
import { Link } from "react-router";
import TimeAgo from "react-timeago";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../api/commentApi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Dropdown } from "@/shared/ui/Dropdown/Dropdown";
import { CiMenuKebab } from "react-icons/ci";
import { DropdownContent } from "@/shared/ui/Dropdown/DropdownContent";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commentUpdateSchema,
  TypeCommentUpdateSchema,
} from "../schema/comment.schema";
import toast from "react-hot-toast";
import { Form } from "@/shared/ui/Form/Form";
import { Textarea } from "@/shared/ui/Textarea/Textarea";

interface Props {
  commentId: string;
  className?: string;
  userId: string;
  content: string;
  displayName: string;
  avatar: string | undefined;
  createdAt: Date;
  updateAt: Date;
}

const CommentListItem = ({
  className,
  commentId,
  userId,
  content,
  displayName,
  avatar,
  createdAt,
  updateAt,
}: Props) => {
  const id = useAppSelector((state) => state.auth.auth?.id);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment, { isLoading: isLoadingUpdate }] =
    useUpdateCommentMutation();
  const isUpdate = createdAt !== updateAt;

  const form = useForm<TypeCommentUpdateSchema>({
    resolver: zodResolver(commentUpdateSchema),
    defaultValues: {
      oldContent: content,
      content: content,
    },
  });

  const { isValid } = form.formState;
  const onSubmit = async (data: TypeCommentUpdateSchema) => {
    try {
      await updateComment({
        id: commentId,
        content: data.content,
      });
      setIsEditing(false);
      form.reset();
      form.setValue("oldContent", `${data.content}`);
      form.setValue("content", `${data.content}`);
      toast.success("Комментарий успешно изменен");
    } catch (error) {
      console.log(error);
      toast.error("Произошла ошибка, попробуйте позже");
    }
  };
  return (
    <>
      <div
        className={cn(
          className,
          "rounded-2xl flex flex-col gap-1 p-1 transition relative"
        )}
      >
        <div className="flex items-center gap-2">
          <Link to={`/profile/${userId}`}>
            <Avatar size={3} username={displayName} src={avatar} />
          </Link>
          <div className="flex flex-col">
            <p className="text-lg font-medium">{displayName}</p>
            <TimeAgo live={false} date={createdAt} formatter={ruFormatter} />
          </div>
          <div className="ml-auto flex gap-1">
            {isUpdate && (
              <p className="ml-auto self-start text-sm opacity-35 ">Изменено</p>
            )}
            {id === userId && (
              <Dropdown className="self-start">
                <Dropdown.Button>
                  <CiMenuKebab
                    size={25}
                    className="rounded-2xl cursor-pointer transition p-1 hover:bg-gray-200"
                  />
                </Dropdown.Button>
                <DropdownContent>
                  <Dropdown.List className="flex gap-2 p-2">
                    <Dropdown.Item>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex w-full p-1 cursor-pointer rounded transition items-center gap-2 group
                   hover:bg-gray-200"
                      >
                        <FaEdit className="group-hover:text-base-accent" />{" "}
                        Изменить
                      </button>
                      <button
                        onClick={() => setIsOpen(true)}
                        className="flex w-full p-1 cursor-pointer rounded transition items-center gap-2 group
                   hover:bg-gray-200"
                      >
                        <MdDelete className="group-hover:text-base-accent group-hover:text-red-500" />
                        Удалить
                      </button>
                    </Dropdown.Item>
                  </Dropdown.List>
                </DropdownContent>
              </Dropdown>
            )}
          </div>
        </div>
        {isEditing ? (
          <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              control={form.control}
              name="content"
              render={({ field }) => <Textarea id="content" {...field} />}
            />
            <div className="flex gap-2 justify-end items-center">
              <Button disabled={!isValid || isLoadingUpdate} type="submit">
                Сохранить
              </Button>
              <Button onClick={() => setIsEditing(false)} intent="ghost">
                Отмена
              </Button>
            </div>
          </Form>
        ) : (
          <p className="mt-1 text-lg">{content}</p>
        )}
      </div>
      <Modal width="md" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Удаление статьи</Modal.Header>
        <Modal.Body>
          {`Вы действительно хотите удалить комментарий?: ${content}?`}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => deleteComment(commentId)} intent="ghost">
            Да
          </Button>
          <Button onClick={() => setIsOpen(false)}>Нет</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentListItem;
