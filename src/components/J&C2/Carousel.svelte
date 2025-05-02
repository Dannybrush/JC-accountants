<script lang="ts">
    import { onDestroy } from 'svelte';
    export let items = [];
    export let interval = 8000;
  
    let current = 0;
    const next = () => current = (current + 1) % items.length;
    const prev = () => current = (current - 1 + items.length) % items.length;
  
    const timer = setInterval(next, interval);
    onDestroy(() => clearInterval(timer));
  </script>
  
  <div class="carousel">
    <button class="nav prev" on:click={prev} aria-label="Previous">‹</button>
  
    <div class="slides">
      {#each items as item, i}
        <div class="slide {i === current ? 'active' : 'inactive'}">
          <slot name="slide" {item} />
        </div>
      {/each}
    </div>
  
    <button class="nav next" on:click={next} aria-label="Next">›</button>
  
    <div class="dots">
      {#each items as _, i}
        <span class="{i === current ? 'dot active' : 'dot'}" on:click={() => current = i}></span>
      {/each}
    </div>
  </div>
  
  <style>
    .carousel {
      position: relative;
      max-width: 700px;
      margin: 0 auto;
      text-align: center;
    }
  
    .slides {
      position: relative;
    }
  
    .slide {
      display: none;
      transition: opacity 0.5s ease;
    }
  
    .slide.active {
      display: block;
      opacity: 1;
    }
  
    .slide.inactive {
      opacity: 0;
    }
  
    .nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--brand-color);
      font-size: 2rem;
      cursor: pointer;
      padding: 0 1rem;
    }
  
    .nav.prev { left: 0; }
    .nav.next { right: 0; }
  
    .dots {
      margin-top: 1.5rem;
      display: flex;
      justify-content: center;
      gap: 0.5rem;
    }
  
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ccc;
      cursor: pointer;
      transition: background 0.3
    }
    </style>