import { Form } from "@/shared/ui/Form/Form";
import { FormWrapper } from "@/shared/ui/FormWrapper/FormWrapper";
import { Controller, useForm } from "react-hook-form";
import {
  socialFormSchema,
  TypeSocialFormSchema,
} from "../schemas/social.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/shared/ui/Separator/Separator";
import { Button } from "@/shared/ui/Button/Button";
import { useCreateSocialMutation } from "../api/socialApi";
import toast from "react-hot-toast";
import { SocialLinkList } from "./SocialLinkList";
import { TextField } from "@/shared/ui/TextField/TextField";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const SocialLinksForm = () => {
  const [create, { isLoading }] = useCreateSocialMutation();

  const form = useForm<TypeSocialFormSchema>({
    resolver: zodResolver(socialFormSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const { isValid, isDirty } = form.formState;

  const onSubmit = async (data: TypeSocialFormSchema) => {
    try {
      await create(data).unwrap();
      toast.success("Ссылка создана");
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      toast.error((fetchError.data as { message: string }).message);
    }
  };

  return (
    <FormWrapper title="Ссылки на соцсети">
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={form.control}
          render={({ field }) => (
            <TextField
              label="Название ссылки"
              id="title"
              description="Текст ссылки"
              placeholder="Telegram"
              {...field}
            />
          )}
        />
        <Controller
          name="url"
          control={form.control}
          render={({ field }) => (
            <TextField
              label="URL ссылки"
              description="Куда ведет эта ссылка? Введите полный URL-адрес, например
          https://tm/username"
              id="url"
              placeholder="https://tm/username"
              {...field}
            />
          )}
        />
        <Button
          className="self-end"
          type="submit"
          disabled={isLoading || !isValid || !isDirty}
        >
          Сохранить
        </Button>
      </Form>
      <Separator className="my-4" />
      <SocialLinkList />
    </FormWrapper>
  );
};

export default SocialLinksForm;
