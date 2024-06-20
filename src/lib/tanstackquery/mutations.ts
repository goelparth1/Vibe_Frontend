import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
  } from "@tanstack/react-query";
import type { TsignUpForm } from "../../type.d.ts";
import { signIn, signUp ,signOut } from "../../services/auth.ts";
import { createPost } from "../../services/post.ts";
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
        mutationFn : (val:INewPost) => createPost(val),
    })
}

// export const useUpdatePostMutation = () => {
//     return useMutation({
//         mutationFn : () => useUpdatePost(),
// })
// }