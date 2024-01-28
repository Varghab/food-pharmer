import { supabase } from "../config/supabase.config";

export async function getCurrentUser(){
    const { data: { user } } = await supabase.auth.getUser()
    return user;
}