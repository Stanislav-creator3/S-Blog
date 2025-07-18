import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateMutation } from "@/entities/auth/api/authApi";
import { useAppSelector } from "@/app/appStore";
import { useNavigate } from "react-router";
import { Button } from "@/shared/ui/Button/Button";
import { cn } from "@/shared/utils/tw-merge";
import { LayoutAuth } from "@/shared/ui/Layout/LayoutAuth";
import { registerSchema, TypeRegisterSchema } from "../schema/register.schema";
import { TextField } from "@/shared/ui/TextField/TextField";

interface Props {
  className?: string;
}

const RegisterForm: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  const [create, { isLoading: isCreateLoading, error }] = useCreateMutation();

  const { auth } = useAppSelector((state) => state.auth);

  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    mode: "onBlur",
  });
  const { isValid } = form.formState;

  const onSubmit = async (data: TypeRegisterSchema) => {
    await create(data).unwrap();
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <LayoutAuth
      heading="Регистрация"
      backButtonLabel="Войти"
      backButtonHref="/account/login"
    >
      <form
        className={cn(className, "flex  flex-col gap-3")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          control={form.control}
          name="email"
          render={({ field }) => (
            <TextField
              label="Email"
              id="email"
              placeholder="email@example.com"
              {...field}
            />
          )}
        />
        <Controller
          control={form.control}
          name="username"
          render={({ field }) => (
            <TextField
              label="Имя пользователя"
              id="username"
              placeholder="Stas"
              {...field}
            />
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field }) => (
            <TextField
              label="Пароль"
              id="password"
              type="password"
              placeholder="*******"
              error={
                form.formState.errors.password &&
                "Длина пароля должна быть не менее 6 символов"
              }
              {...field}
            />
          )}
        />

        {error && (
          <p className="text-red-500">
            {(error as { data: { message: string } }).data?.message}
          </p>
        )}
        <Button disabled={!isValid || isCreateLoading}>Регистрация</Button>
      </form>
    </LayoutAuth>
  );
};

export default RegisterForm;
