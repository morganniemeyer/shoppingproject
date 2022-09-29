const SUPABASE_URL = 'https://ytiyzsjdntzjhlsdkkar.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0aXl6c2pkbnR6amhsc2Rra2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyMzk1OTgsImV4cCI6MTk3OTgxNTU5OH0.H2jQlFa0oPvnaZKM7UGsaJ1hGkGRlLiHsbsbyzCDqHw';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function addListItem(item, quantity) {
    const response = await client.from('shopping-list').insert([{ item, quantity }]);
    return response;
}

export async function retrieveList() {
    const response = await client.from('shopping-list').select();
    return response;
}

export async function buyTheThing(someId) {
    const response = await client
        .from('shopping-list')
        .update({ bought: true })
        .match({ id: someId });

    return response;
}

export async function clearBought() {
    const response = await client.from('shopping-list').delete().eq('bought', true);

    return response;
}
