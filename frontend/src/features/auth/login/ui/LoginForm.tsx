import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  loginAccountSchema,
  TypeLoginAccountSchema,
} from "../schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/entities/auth/api/authApi";
import { useAppSelector } from "@/app/appStore";
import { useNavigate } from "react-router";
import { Button } from "@/shared/ui/Button/Button";
import { cn } from "@/shared/utils/tw-merge";
import { LayoutAuth } from "@/shared/ui/Layout/LayoutAuth";
import { TextField } from "@/shared/ui/TextField/TextField";

interface Props {
  className?: string;
}

const LoginForm: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  const [login, { isLoading: isLoginLoading, error }] = useLoginMutation();
  const { auth } = useAppSelector((state) => state.auth);
  const form = useForm<TypeLoginAccountSchema>({
    resolver: zodResolver(loginAccountSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const { isValid } = form.formState;

  const onSubmit = async (data: TypeLoginAccountSchema) => {
    await login(data).unwrap();
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <LayoutAuth
      heading="Авторизация"
      backButtonLabel="Регистрация"
      backButtonHref="/account/register"
    >
      <form
        className={cn(className, "flex flex-col gap-3")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          control={form.control}
          name="login"
          render={({ field }) => (
            <TextField label="Логин" id="login" placeholder="Stas" {...field} />
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
              {...field}
            />
          )}
        />
        {error && (
          <p className="text-red-500">
            {(error as { data: { message: string } }).data?.message}
          </p>
        )}

        <Button disabled={!isValid || isLoginLoading}>Войти</Button>
      </form>
    </LayoutAuth>
  );
};

export default LoginForm;
