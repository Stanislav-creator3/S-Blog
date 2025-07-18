import { IUser } from "../../users/model/types";

export interface IComment {
  content: string;
  createdAt: Date;
  id: string;
  postId: string;
  updatedAt: Date;
  user: { displayName: string; avatar: string | null };
  userId: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  viewsCount: number;
  user: IUser;
  tags: string[];
  comments: IComment[] | [];
  morePostsUser: IPost[] | [];
  likes: { id: string; userId: string; postId: string }[] | [];
  createdAt: Date;
  _count: {
    comments: number;
    likes: number;
  };
  likedByUser?: boolean;
  bookMarkedByUser?: boolean;
}

export interface IDiscussionPosts {
  id: string;
  title: string;
  content: string;
  tags: string[];
  user: {
    displayName: string;
    avatar: string | null;
    id: string;
    _count: {
      followers: number;
    };
  };
  viewsCount: number;
  _count: {
    comments: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
