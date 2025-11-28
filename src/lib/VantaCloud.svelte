<script>
    import { onMount, onDestroy } from "svelte";

    let vantaEffect;
    let vantaContainer;

    export let options = {};

    onMount(() => {
        if (window.VANTA && window.VANTA.CLOUDS) {
            try {
                vantaEffect = window.VANTA.CLOUDS({
                    el: vantaContainer,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    ...options,
                });
            } catch (error) {}
        } else {
        }
    });

    onDestroy(() => {
        if (vantaEffect && vantaEffect.destroy) {
            vantaEffect.destroy();
        }
    });
</script>

<div class="vanta-background" bind:this={vantaContainer}>
    <slot></slot>
</div>

<style>
    .vanta-background {
        width: 100%;
        height: 100vh;
        position: relative;
    }
</style>
