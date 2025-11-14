<script lang="ts">
    import { pageOpen } from "$lib/pageOpen";
</script>

<div class="card bg-base-100 w-96 shadow-sm">
    <figure>
        <img
            src="https://www.secom-sanin.co.jp/images/original/20180725115339927bd176c24.jpeg"
            alt="Shoes"
        />
    </figure>
    <div class="card-body">
        <h2 class="card-title">小学１年生算数</h2>
        <p>基礎中の基礎です。</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary" onclick={() => pageOpen(1)}
                >学習を開始する</button
            >
        </div>
    </div>
</div>
