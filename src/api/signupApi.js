import {supabase} from "../config/supabase.config"

export async function signupApi({email, password}){

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    return {data, error}       

}