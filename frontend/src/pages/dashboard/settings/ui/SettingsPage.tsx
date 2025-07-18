import { useAppSelector } from "@/app/appStore";
import { ProfileFormAvatar, ProfileFormInfo } from "@/features/user";
import SocialLinksForm from "@/features/user/social-link/ui/SocialLinksForm";
import { Heading } from "@/shared/ui/Heading/Heading";
import { LinkUi } from "@/shared/ui/Link/Link";

const SettingsPage = () => {
  const user = useAppSelector((state) => state.auth.auth);
  return (
    <div className="w-[100%] flex flex-col gap-5 mx-auto ">
      {user ? (
        <div className="mt-5 space-y-6">
          <Heading
            title="Профиль"
            description="Настройте ваш профиль, обновите аватар, измените информацию о себе и добавьте ссылки на социальные сети, чтобы сделать вашу страницу более привлекательной для других пользователей."
          />
          <ProfileFormAvatar />
          <ProfileFormInfo />
          <SocialLinksForm />
        </div>
      ) : (
        <div className="flex h-[80vh] flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">Необходимо авторизоваться</h1>
          <LinkUi href="/account/login">Вход</LinkUi>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
