<script lang="ts">
    import axios from "axios";
    import { ai_question } from "$lib/ai_question.js";
    import { onMount } from "svelte";
    import { pageOpen } from "$lib/pageOpen";
    import { Button, Modal, P, FloatingLabelInput } from "flowbite-svelte";
    import SignaturePad from "signature_pad";
    import Layout from "../+layout.svelte";
    let canvas: HTMLCanvasElement | null = null;
    let pad: SignaturePad | null = null;
    let paint = $state(false)
    let { data } = $props();
    let explain = $state();
    let check_input = $state();
    let do_ai_gen = $state(false);
    let ready_check = $state(false);
    let user_input: any = $state();
    let check_toggle;
    let defaultModal = $state(false);
    let point: number = $state(0);
    let count = 0;
    const next = Number(data.slug) + 1;
    const back = Number(data.slug) - 1;
    function initPad(node: HTMLCanvasElement) {
            pad = new SignaturePad(node, {
                penColor: "black",
                minWidth: 1,
                maxWidth: 3,
                backgroundColor: "rgba(164, 121, 255, 0.1)"
            });
    
            return {
                destroy() {
                    // canvasが消える時に自動で後片付け
                    pad?.off();
                    pad = null;
                }
            };
    }
    async function check() {
        try {
            console.log("実行されたで(check関数)");
            ready_check = true;
            await do_check();
        } catch (e) {
            console.error(e);
        }
    }
    async function do_check() {
        try {
            do_ai_gen = true;
            if (ready_check === true) {
                const blob = await (await fetch(pad!.toDataURL())).blob(); // Base64をBlobに変換
                const formData = new FormData();
                formData.append('file', blob, 'signature.png');
                if (paint === true) {
                    let images = pad?.toDataURL("image/png");
                    let response
                    const responseget = await axios.post('http://localhost:3000/api/ocr', formData)
                    .then(function (response) {
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }
                console.log("採点が開始されました");
                explain = await ai_question(
                    "問題と答えを参照した上で、解説を30文字以内で簡潔に生成してください",
                    data.Mondai.problem + `ユーザーの回答${user_input}`,
                );
                if (user_input === data.Mondai.answer) {
                    check_input = true;
                    await confetti({
                        particleCount: 100,
                    });
                } else {
                    check_input = false;
                }
                console.log(explain, check_input);
                do_ai_gen = false;
                defaultModal = true;
                return { explain, check_input };
            }
            console.log(explain, check_input);
            do_ai_gen = false;
            return { explain: "", check_input: "" };
        } catch (e) {
            console.error(e);
        }
    }
</script>

<h1 class="text-2xl font-bold">
    問題:{data.Mondai.problem}
</h1>
<div class="mt-2 max-w-sm">
    {#if paint === false}
        <FloatingLabelInput
            clearable
            variant="outlined"
            id="clearable_outlined"
            name="clearable_outlined"
            type="text"
            bind:value={user_input}>回答を入力</FloatingLabelInput
        >
    {:else}
        <div class="border rounded bg-white">
                <canvas 
                    use:initPad 
                    width="400" 
                    height="300" 
                    class="w-full touch-none"
                ></canvas>
        </div>
    {/if}
    <Button class="mt-2 w-full" color="alternative" onclick={() => { paint = !paint }}>
            {paint ? "⌨️ テキストに戻す" : "✏️ 手書きに切り替え"}
    </Button>
</div>
<Button onclick={() => check()}>採点</Button>
{#if ready_check === true}
    {#if do_ai_gen === true}
        <p>採点中です</p>
    {/if}
    <Modal
        title="採点結果"
        form
        bind:open={defaultModal}
        onaction={({ action }) => pageOpen(next)}
    >
        {#if check_input === true}
            <P>正解だと思う</P>
            <P>解説:{explain}</P>
        {:else if check_input === false}
            <P>不正解だと思う</P>
            <P>解説:{explain}</P>
        {/if}
        {#snippet footer()}
            <Button type="submit" value="success">次の問題へ</Button>
        {/snippet}
    </Modal>
{/if}
