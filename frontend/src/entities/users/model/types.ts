import { ISocial } from "@/features/user/social-link/api/socialApi";
import { IPost } from "../../posts/model/types";

export interface IUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  bio?: string;
  isVerified: boolean;
  isEmailVerified: boolean;
  isTotpEnabled: boolean;
  totpSecret: string | null;
  posts: IPost[] | [];
  socialLinks?: ISocial[] | [];
  isDeactivated: boolean;
  deactivatedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    followers?: number;
    followings?: number;
    posts?: number;
    comments?: number;
  };
}
