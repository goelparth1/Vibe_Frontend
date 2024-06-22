import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
  } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys.ts";
import type { TsignUpForm } from "../../type.d.ts";
import { signIn, signUp ,signOut } from "../../services/auth.ts";
import { createPost,getRecentPosts } from "../../services/post.ts";
import { INewPost } from "@/types/index.ts";


export const useSignUpMutation = () => {
    return useMutation({
        mutationFn : (data:TsignUpForm) => signUp(data),
    })
}

export const useSignInMutation = () => {
    return useMutation({
        mutationFn : (data:TsignUpForm) => signIn(data),
    })
}

export const useSignOutMutation = () => {
    return useMutation({
        mutationFn : () => signOut(),
    })
}


//Posts 

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      // onSuccess: () => {
      //   queryClient.invalidateQueries({
      //     queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      //   });
      // },
    });
  };

// export const useUpdatePostMutation = () => {
//     return useMutation({
//         mutationFn : () => useUpdatePost(),
// })
// }
export const useGetRecentPosts = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts,
    });
  };

//  export const useGetUsers = (limit?: number) => {
//     return useQuery({
//       queryKey: [QUERY_KEYS.GET_USERS],
//       queryFn: () => getUsers(limit),
//     });
//   };