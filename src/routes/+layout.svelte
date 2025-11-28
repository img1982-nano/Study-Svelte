<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import type { LayoutData } from "./$types";
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Avatar,
        Dropdown,
        DropdownItem,
        DropdownHeader,
        DropdownGroup,
    } from "flowbite-svelte";
    import { on } from "svelte/events";
    import { onMount } from "svelte";
    let on_main = $state(false);
    let { data, children }: { data: LayoutData; children?: any } = $props();
    let AccountName = $state("Notfound");
    let AccountEmail = $state("Notfound");
    onMount(() => {
        const path = location.pathname.slice(1);
        if (path === "/main") {
            on_main = true;
        } else if (!isNaN(Number(path))) {
            on_main = true;
        }
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>
<Navbar>
    <NavBrand href="/">
        <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >Aziquiz</span
        >
    </NavBrand>
    <div class="flex items-center md:order-2">
        <Avatar id="avatar-menu" />
        <NavHamburger />
    </div>
    <Dropdown placement="bottom" triggeredBy="#avatar-menu">
        <DropdownHeader>
            <span class="block text-sm">{AccountName}</span>
            <span class="block truncate text-sm font-medium"
                >{AccountEmail}</span
            >
        </DropdownHeader>
        <DropdownGroup>
            <DropdownItem>契約プラン</DropdownItem>
            <DropdownItem>設定</DropdownItem>
        </DropdownGroup>
        <!--
        {#if on_login === true}
            <DropdownHeader>Sign out</DropdownHeader>
        {:else}
            <DropdownHeader>Sign in</DropdownHeader>
        {/if}
        -->
    </Dropdown>
    <NavUl class="md:ms-auto">
        <NavLi href="/main">学習トップ</NavLi>
        {#if on_main === true}
            <NavLi>AziP:{data.point[0].point}</NavLi>
        {/if}
    </NavUl>
</Navbar>
{@render children?.()}
