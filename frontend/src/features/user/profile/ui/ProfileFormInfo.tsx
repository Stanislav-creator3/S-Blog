import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  changeInfoSchema,
  TypeChangeInfoSchema,
} from "../schemas/profile/change-info.schema";
import { Button } from "@/shared/ui/Button/Button";
import { Separator } from "@/shared/ui/Separator/Separator";
import { Textarea } from "@/shared/ui/Textarea/Textarea";
import { useAppSelector } from "@/app/appStore";
import { FormWrapper } from "@/shared/ui/FormWrapper/FormWrapper";
import { Form } from "@/shared/ui/Form/Form";
import { useChangeInfoUserMutation } from "../api/profileApi";
import toast from "react-hot-toast";
import { TextField } from "@/shared/ui/TextField/TextField";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const ProfileFormInfo = () => {
  const { auth } = useAppSelector((state) => state.auth);

  const [changeInfo, { isLoading: isLoadingChangeInfo }] =
    useChangeInfoUserMutation();

  const form = useForm<TypeChangeInfoSchema>({
    resolver: zodResolver(changeInfoSchema),
    values: {
      username: auth?.username ?? "",
      displayName: auth?.displayName ?? " ",
      bio: auth?.bio ?? "",
    },
  });
  const { isValid, isDirty } = form.formState;

  const onSubmit = async (data: TypeChangeInfoSchema) => {
    try {
      await changeInfo(data).unwrap();
      toast.success("Информация обновлена");
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      toast.error((fetchError.data as { message: string }).message);
    }
  };

  return (
    <FormWrapper title="Настройки профиля">
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          control={form.control}
          name="username"
          render={({ field }) => (
            <TextField
              label="Ваша имя"
              description="Под этим именем вас будут знать другие пользователи."
              id="username"
              placeholder="Пример: Джек"
              {...field}
            />
          )}
        />

        <Separator className="mt-4" />

        <Controller
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <TextField
              label="Имя которая будет отображаться"
              description="Проставьте прописные буквы в имени пользователя по своему желанию."
              id="displayName"
              placeholder="Пример: Гигант Мысли"
              {...field}
            />
          )}
        />

        <Separator className="mt-4" />

        <Form.Label htmlFor="bio">Биография</Form.Label>
        <Controller
          control={form.control}
          name="bio"
          render={({ field }) => (
            <Textarea
              id="bio"
              placeholder="Пример: Пишу веб-приложения"
              {...field}
            />
          )}
        />
        <Form.Description>
          Информация о себе должна содержать не более 300 символов.
        </Form.Description>
        <Button
          className="self-end"
          type="submit"
          disabled={!isValid || !isDirty || isLoadingChangeInfo}
        >
          Сохранить
        </Button>
      </Form>
    </FormWrapper>
  );
};

export default ProfileFormInfo;
