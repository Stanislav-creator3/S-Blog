import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import BaseLayout from "../layouts/BaseLayout";
import { LoginPage } from "@/pages/login";
import { RegisterForm } from "@/features/auth/register";
import { MainPages } from "@/pages/mainPage";
import { AddPost } from "@/pages/addPost";
import { SettingsPage } from "@/pages/dashboard";
import SubscriptionsPage from "@/pages/Subscriptions/ui/SubscriptionsPage";
import {
  SubscriptionsListPost,
  SubscriptionsListPostById,
} from "@/widgets/subscriptions";
import { PostPopularPage } from "@/pages/postPopularPage";
import { LikesPostPage } from "@/pages/likesPostsPage";
import { TagsPostsPage } from "@/pages/tagsPostsPage";
import { PostPage } from "@/pages/postPage";
import { AllFollowingsPage } from "@/pages/allFollowingPage";
import { ProfilePage } from "@/pages/ProfilePage";
import AllFollowerPage from "@/pages/allFollewPage/ui/AllFollowerPage";
import { BookMarksPage } from "@/pages/bookMarksPage";
import SearchPostsPage from "@/pages/searchPostsPage/ui/SearchPostsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <MainPages />,
      },

      {
        path: "/popular",
        element: 
        <>
        <PostPopularPage />,
        <ScrollRestoration />
        </>
      },

      {
        path: "/profile/:username",
        element: <ProfilePage />,
      },

      {
        path: "/followers",
        element: <AllFollowerPage />,
      },

      {
        path: "/search",
        element: <SearchPostsPage />,
      },

      {
        path: "/bookmarks",
        element: <BookMarksPage />,
      },

      {
        path: "/followings",
        element: <AllFollowingsPage />,
      },

      {
        path: "/dashboard/settings",
        element: <SettingsPage />,
      },

      {
        path: "/subscriptions",
        element: <SubscriptionsPage />,
        children: [
          {
            index: true,
            element: <SubscriptionsListPost />,
          },
          {
            path: ":id",
            element: <SubscriptionsListPostById />,
          },
        ],
      },

      {
        path: "/tags/:name",
        element: <TagsPostsPage />,
      },

      {
        path: "/write",
        element: <AddPost />,
      },

      {
        path: "/like/posts",
        element: <LikesPostPage />,
      },

      {
        path: "/write/:id",
        element: <AddPost />,
      },

      {
        path: "/posts/:id",
        element: <PostPage />,
      },
    ],
  },
  {
    path: "/account",
    element: (
      <div className="flex w-[100vw] h-[100vh] justify-center items-center">
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
    ],
  },
]);
