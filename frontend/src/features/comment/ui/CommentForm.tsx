import { Form } from "@/shared/ui/Form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  commentCreateSchema,
  TypeCommentCreateSchema,
} from "../schema/comment.schema";
import { useCreateCommentMutation } from "../api/commentApi";
import { Button } from "@/shared/ui/Button/Button";
import { Textarea } from "@/shared/ui/Textarea/Textarea";
import { useAppSelector } from "@/app/appStore";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  postId: string;
  className?: string;
}

const CommentForm = ({ postId, className }: Props) => {
  const user = useAppSelector((state) => state.auth.auth);
  const [create, { isLoading }] = useCreateCommentMutation();
  const form = useForm<TypeCommentCreateSchema>({
    resolver: zodResolver(commentCreateSchema),
    defaultValues: {
      content: "",
    },
  });
  const { isValid } = form.formState;

  const onSubmit = async (data: TypeCommentCreateSchema) => {
    await create({ content: data.content, postId }).unwrap();
    form.reset();
  };

  return (
    <Form
      className={cn(className, "w-full")}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="relative overflow-hidden rounded-md border border-gray-300 shadow-sm focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-200 focus-within:ring-opacity-50">
        <Controller
          control={form.control}
          name="content"
          render={({ field }) => (
            <Textarea
              className="text-2xl placeholder:text-xl"
              border="noBorder"
              placeholder={
                user
                  ? "Ваш комментарий"
                  : "Авторизуйтесь чтобы оставить комментарий"
              }
              rows={3}
              {...field}
            />
          )}
        />
        <div className="flex w-full items-center justify-end bg-white p-2">
          <Button type="submit" disabled={!isValid || isLoading || !user}>
            Отправить
          </Button>
        </div>
      </div>
    </Form>
  );
};
export default CommentForm;
