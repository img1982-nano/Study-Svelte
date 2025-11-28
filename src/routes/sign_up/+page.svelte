<script lang="ts">
    import { supabase } from "$lib/supabaseClient";

    let email = $state("");
    let password = $state("");
    async function signUpNewUser() {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: "https://localhost:5173/sign_up/success",
            },
        });
    }
</script>

<p>メールアドレスらしい</p>
<input bind:value={email} placeholder="例:hoge@example.com" />
<p>パスワードらしい</p>
<input bind:value={password} type="password" />
<button onclick={() => signUpNewUser()}>アカウント作成</button>
