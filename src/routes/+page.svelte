<script>
    import VantaClouds from "$lib/VantaCloud.svelte";
    import { Button } from "flowbite-svelte";
    import { pageOpen } from "$lib/pageOpen";
</script>

<svelte:head>
    <title>Aziquiz</title>
</svelte:head>
<VantaClouds options={{ speed: 1.5, color: 0xcccccc }}>
    <div
        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; z-index: 10;"
    >
        <div>
            <h1 class="text-5xl font-bold text-amber-500 text-shadow-lg">
                すべての人に、勉学を
            </h1>
            <p class="font-bold text-shadow-lg">
                Aziquizは、すべての問題を無料で挑戦することができます
            </p>
            <div class="flex justify-center">
                <Button onclick={() => pageOpen("/main")} class="ml-[-10]"
                    >はじめる</Button
                >
            </div>
        </div>
    </div>
</VantaClouds>
