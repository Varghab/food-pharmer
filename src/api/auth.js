import { supabase } from "../config/supabase.config";

export async function auth(){
    const { data: {user} } = await supabase.auth.getUser()
    if(!user||user===null) return false;
    return user.role === "authenticated";
}

