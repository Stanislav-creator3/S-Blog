import { IPost } from "@/entities/posts/model/types";
import { InfiniteData } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import PostsList from "./PostsList";

export interface Props {
  fetchNextPage: () => void;
  isFetching: boolean;
  data:
    | InfiniteData<{ posts: IPost[]; nextId: string }, string>
    | InfiniteData<{ posts: IPost[]; nextId: string }, string>
    | undefined;
  title?: string;
  isNotPostTitle: string;
}

const InfinitePostsList = ({
  fetchNextPage,
  isFetching,
  data,
  title,
  isNotPostTitle,
}: Props) => {
  useEffect(() => {
    const onScroll = async () => {
      const scrolledToBottom =
        document.body.scrollHeight - 300 < window.scrollY + window.innerHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        await fetchNextPage();
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, isFetching]);

  const results = data?.pages.flatMap((item) => item.posts) ?? [];

  return (
    <PostsList
      allResults={results}
      title={title}
      isNotPostTitle={isNotPostTitle}
    />
  );
};

export default InfinitePostsList;
