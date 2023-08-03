import { BASE_URL } from "../../constants/BASE_URL";
import { IPost } from "../../models/Types";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export interface PostsState {
    posts: IPost[],
    isLoading: boolean,
}


//редьюссеры фетча, создания, обновления и удаления постов
export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], {order: string,search: string}>({
            query: ({order = 'asc',search = ''}) => ({
                url: `/`,
                params: {
                    sortby: "userName",
                    order: order,
                    search: search
                }
            }),
            providesTags: result => ['Post']
        }),
        createPost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        updatePost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post']
        }),
    })
})