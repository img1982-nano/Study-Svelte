<script lang="ts">
    import { supabase } from "$lib/supabaseClient";

    let email = $state("");
    let password = $state("");

    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
    }
</script>

<p>メールアドレスらしい</p>
<input bind:value={email} placeholder="例:hoge@example.com" />
<p>パスワードらしい</p>
<input bind:value={password} type="password" />
<button onclick={() => signInWithEmail()}>ログイン</button>
<p>アカウントないっすか？<a href="/sign_up">こちらから</a></p>
