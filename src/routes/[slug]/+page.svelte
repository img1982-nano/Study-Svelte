<script lang="ts">
    import { ai_question } from "$lib/ai_question.js";
    import { pageOpen } from "$lib/pageOpen";

    let { data } = $props();
    let explain = $state();
    let check_input = $state();
    let do_ai_gen = $state(false);
    let ready_check = $state(false);
    let user_input = $state();
    let check_toggle;
    const next = Number(data.slug) + 1;
    const back = Number(data.slug) - 1;

    async function check() {
        console.log("実行されたで(check関数)");
        ready_check = true;
        do_check();
    }
    async function do_check() {
        do_ai_gen = true;
        if (ready_check === true) {
            explain = await ai_question(
                "問題と答えを参照した上で、解説を30文字以内で簡潔に生成してください",
                data.Mondai.problem + `ユーザーの回答${user_input}`,
            );
            if (user_input === data.Mondai.answer) {
                check_input = true;
            } else {
                check_input = false;
            }
            console.log(explain, check_input);
            do_ai_gen = false;
            return { explain, check_input };
        }
        console.log(explain, check_input);
        do_ai_gen = false;
        return { explain: "", check_input: "" };
    }
</script>

<h1>問題:{data.Mondai.problem}</h1>
<input placeholder="回答を入力" bind:value={user_input} />
<button onclick={() => check()}>採点</button>
{#if ready_check === true}
    {#if do_ai_gen === true}
        <p>採点中です</p>
    {/if}
    {#if check_input === true}
        <h1>正解だと思う</h1>
        <p>解説:{explain}</p>
        <button onclick={() => pageOpen(next)}>次の問題へ</button>
        {#if Number(data.slug) > 1}
            <button onclick={() => pageOpen(back)}>前の問題へ</button>
        {/if}
    {:else if check_input === false}
        <h1>不正解だと思う</h1>
        <p>解説:{explain}</p>
        <button onclick={() => pageOpen(next)}>次の問題へ</button>
        {#if Number(data.slug) > 1}
            <button onclick={() => pageOpen(back)}>前の問題へ</button>
        {/if}
    {/if}
{/if}
