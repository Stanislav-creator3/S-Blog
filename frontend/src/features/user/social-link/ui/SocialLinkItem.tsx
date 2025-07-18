import type { DraggableProvided } from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  socialFormSchema,
  TypeSocialFormSchema,
} from "../schemas/social.schema";
import Input from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import {
  useDeleteSocialMutation,
  useUpdateSocialMutation,
} from "../api/socialApi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdReorder } from "react-icons/md";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface Props {
  socialLink: {
    id: string;
    title: string;
    url: string;
  };
  provider: DraggableProvided;
}

export const SocialLinkItem = ({ socialLink, provider }: Props) => {
  const [editingId, setIsEditingId] = useState<string | null>(null);

  const [remove] = useDeleteSocialMutation();
  const [update, { isLoading: isLoadingUpdate }] = useUpdateSocialMutation();
  const form = useForm<TypeSocialFormSchema>({
    resolver: zodResolver(socialFormSchema),
    values: {
      title: socialLink.title ?? "",
      url: socialLink.url ?? "",
    },
  });

  const { isValid, isDirty } = form.formState;

  const toggleEditing = (id: string | null) => {
    setIsEditingId(id);
  };

  const removeSocialLink = async (socialLinkId: string) => {
    try {
      await remove({ id: socialLinkId }).unwrap();
      toast.success("Ссылка удалена");
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      toast.error((fetchError.data as { message: string }).message);
    }
  };

  const onSubmit = async (data: TypeSocialFormSchema) => {
    try {
      await update({ id: socialLink.id, ...data }).unwrap();
      toast.success("Ссылка обновлена");
      toggleEditing(null);
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      toast.error((fetchError.data as { message: string }).message);
    }
  };

  return (
    <div
      className="flex items-center p-4 background rounded-md border border-border min-h-36"
      ref={provider.innerRef}
      {...provider.draggableProps}
    >
      <div className="flex flex-1 items-center px-2">
        {editingId === socialLink.id ? (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full items-center gap-4"
          >
            <div className="w-full space-y-2">
              <Controller
                control={form.control}
                name="title"
                render={({ field }) => (
                  <Input id="title" placeholder="Telegram" {...field} />
                )}
              />
              <Controller
                control={form.control}
                name="url"
                render={({ field }) => (
                  <Input
                    id="url"
                    placeholder="https://t.me/username"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col space-y-2 p-1">
              <Button
                type="submit"
                disabled={!isDirty || !isValid || isLoadingUpdate}
              >
                Сохранить
              </Button>
              <Button onClick={() => toggleEditing(null)} intent="secondary">
                Отмена
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">{socialLink.title}</h2>
            <p className="text-xl">{socialLink.url}</p>
          </div>
        )}
        <div className="ml-auto flex items-center gap-x-2 pr-4">
          {editingId !== socialLink.id && (
            <Button
              onClick={() => toggleEditing(socialLink.id)}
              intent="ghost"
              size="lgIcon"
            >
              <FaPencil className="size-4 text-muted-foreground" />
            </Button>
          )}
          <Button
            onClick={() => removeSocialLink(socialLink.id)}
            intent="ghost"
            size="lgIcon"
          >
            <FaRegTrashAlt className="size-4 text-muted-foreground" />
          </Button>
        </div>
        <button className="cursor-grab" {...provider.dragHandleProps}>
          <MdReorder size={30} />
        </button>
      </div>
    </div>
  );
};
