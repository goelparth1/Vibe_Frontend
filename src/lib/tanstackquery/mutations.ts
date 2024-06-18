import { useMutation } from "@tanstack/react-query";
import type { TsignUpForm } from "../../type.d.ts";
import { signUp } from "../../services/auth.ts";


export const useSignUpMutation = () => {
    return useMutation({
        mutationFn : (data:TsignUpForm) => signUp(data),
    })
}