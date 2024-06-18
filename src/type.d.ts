import type  { IsignUpForm as TsignUpForm } from "../_auth/forms/SignUpForm";
import {Types} from "mongoose"
interface TUser  {
    _id : Types.ObjectId|undefined;
    name : string,
    username : string,
    email: string,
    avatar : string,
    bio : string,
}

export {
    TsignUpForm,
    TUser,
}
