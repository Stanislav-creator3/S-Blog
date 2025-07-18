export const baseUrl = "http://localhost:4000";
export const url = "https://vsrm22-151-252-105-85.ru.tuna.am";
export const mediaUrl = import.meta.env.VITE_MEDIA_URL as string
export const takePosts = 20


export const tabsHeader = [
  {
    name: "forYou",
    label: "Главная",
    href: "/",
  },
 
  {
    name: "popular",
    label: "Популярное",
    href: "/popular",
  },
  {
    name: "following",
    label: "Подписки",
    href: "/subscriptions",
  },
];
