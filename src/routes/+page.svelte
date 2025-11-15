<script lang="ts">
    import { pageOpen } from "$lib/pageOpen";
    import { Card, Button, Toggle } from "flowbite-svelte";
    import { ArrowRightOutline } from "flowbite-svelte-icons";

    let vCard = false;
</script>

<div class="space-y-4">
    <Card
        img="https://www.secom-sanin.co.jp/images/original/20180725115339927bd176c24.jpeg"
        reverse={vCard}
    >
        <div class="m-6">
            <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                小学１年生算数
            </h5>
            <p
                class="mb-3 leading-tight font-normal text-gray-700 dark:text-gray-400"
            >
                基礎中の基礎です
            </p>
            <Button class="w-40" onclick={() => pageOpen(1)}>
                学習を開始 <ArrowRightOutline class="ms-2 h-6 w-6 text-white" />
            </Button>
        </div>
    </Card>
</div>
