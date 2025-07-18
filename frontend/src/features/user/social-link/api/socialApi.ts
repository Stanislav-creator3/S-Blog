import { baseApi } from "@/shared/baseApi/baseApi";
import { socialSchema } from "./../schemas/social.schema";

export interface ISocial {
  id: string;
  title: string;
  url: string;
}

interface SocialLinkCreate {
  title: string;
  url: string;
}

interface IReorder {
  id: string;
  position: number;
}

export const socialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocials: builder.query<ISocial[], void>({
      query: () => ({
        url: "account/social-links",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Social"],
      transformResponse: (response: unknown) =>
        socialSchema.array().parse(response),
    }),
    createSocial: builder.mutation<boolean, SocialLinkCreate>({
      query: (credentials) => ({
        url: "account/create-social-link",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Social"],
    }),
    updateSocial: builder.mutation<boolean, ISocial>({
      query: (credentials) => ({
        url: "account/update-social-link",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Social"],
    }),
    deleteSocial: builder.mutation<boolean, { id: string }>({
      query: (credentials) => ({
        url: "account/delete-social-link",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Social"],
    }),

    reorderSocial: builder.mutation<boolean, IReorder[]>({
      query: (credentials) => ({
        url: "account/reorder-social-link",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Social"],
    }),
  }),
});

export const {
  useGetSocialsQuery,
  useCreateSocialMutation,
  useUpdateSocialMutation,
  useDeleteSocialMutation,
  useReorderSocialMutation,
  useLazyGetSocialsQuery,
} = socialApi;
