<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
