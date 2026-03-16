<script lang="ts">
  import '../app.css';
  import { lang, t } from '$lib/stores/lang';
  import { page } from '$app/stores';

  let { children } = $props();

  const WHATSAPP_URL = 'https://wa.me/1514XXXXXXX';

  function isAdmin() {
    return $page.url.pathname.startsWith('/admin');
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet" />
  <title>Shipway237 — Transport & Logistics</title>
</svelte:head>

{#if !isAdmin()}
<header class="sw-header">
  <div class="sw-header-inner">
    <a href="/" class="sw-logo">
      <img src="/src/lib/assets/logo.png" alt="Shipway237" class="sw-logo-img" />
    </a>

    <nav class="sw-nav">
      <a href="/" class="sw-nav-link">{$t.nav.home}</a>
      <a href="/about" class="sw-nav-link">{$t.nav.about}</a>
      <a href="/contact" class="sw-nav-link">{$t.nav.contact}</a>
      <a href={WHATSAPP_URL} target="_blank" class="sw-nav-link sw-nav-wa">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
    </nav>

    <div class="sw-header-right">
      <button
        class="sw-lang-toggle"
        onclick={() => lang.toggle()}
        aria-label="Switch language"
      >
        {$lang === 'en' ? 'FR' : 'EN'}
      </button>
      <a href="/book" class="sw-btn-book">{$t.nav.book}</a>
    </div>
  </div>
</header>
{/if}

<main class:sw-main={!isAdmin()}>
  {@render children()}
</main>

{#if !isAdmin()}
<footer class="sw-footer">
  <div class="sw-footer-inner">
    <div class="sw-footer-brand">
      <img src="/src/lib/assets/logo.png" alt="Shipway237" class="sw-footer-logo" />
      <p>Transport & Logistics</p>
    </div>
    <div class="sw-footer-links">
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/privacy">Privacy policy</a>
    </div>
    <p class="sw-footer-copy">© {new Date().getFullYear()} Shipway237. All rights reserved.</p>
  </div>
</footer>
{/if}

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    font-family: 'Barlow', sans-serif;
    background: #fff;
    color: #1a1a1a;
    min-height: 100vh;
  }

  :global(:root) {
    --red:        #B42814;
    --red-dark:   #A01414;
    --red-deeper: #7A0F0F;
    --red-light:  #F5E0DC;
    --gray:       #646464;
    --gray-mid:   #8C8C8C;
    --gray-light: #E8E8E8;
    --white:      #ffffff;
    --radius:     10px;
    --radius-lg:  16px;
  }

  .sw-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--white);
    border-bottom: 2px solid var(--red);
  }

  .sw-header-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 64px;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .sw-logo {
    text-decoration: none;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .sw-logo-img {
    height: 42px;
    width: auto;
    object-fit: contain;
  }

  .sw-nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex: 1;
  }

  .sw-nav-link {
    text-decoration: none;
    color: var(--gray);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.4rem 0.75rem;
    border-radius: var(--radius);
    transition: color 0.15s, background 0.15s;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .sw-nav-link:hover {
    color: var(--red);
    background: var(--red-light);
  }

  .sw-nav-wa { color: #1a7c3e; }
  .sw-nav-wa:hover { background: #e8f5ed; color: #1a7c3e; }

  .sw-header-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .sw-lang-toggle {
    background: none;
    border: 1.5px solid var(--gray-light);
    border-radius: var(--radius);
    padding: 0.35rem 0.75rem;
    font-family: 'Barlow', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--gray);
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
    letter-spacing: 0.5px;
  }

  .sw-lang-toggle:hover {
    border-color: var(--red);
    color: var(--red);
  }

  .sw-btn-book {
    background: var(--red);
    color: var(--white);
    text-decoration: none;
    padding: 0.5rem 1.25rem;
    border-radius: var(--radius);
    font-size: 0.875rem;
    font-weight: 600;
    transition: background 0.15s;
    white-space: nowrap;
  }

  .sw-btn-book:hover { background: var(--red-dark); }

  .sw-main {
    min-height: calc(100vh - 64px - 120px);
  }

  .sw-footer {
    background: #1a1a1a;
    color: #999;
    padding: 2rem 1.5rem;
    margin-top: 4rem;
  }

  .sw-footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
    justify-content: space-between;
  }

  .sw-footer-brand {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .sw-footer-logo {
    height: 32px;
    width: auto;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }

  .sw-footer-brand p {
    font-size: 0.75rem;
    color: #666;
    margin-top: 2px;
  }

  .sw-footer-links {
    display: flex;
    gap: 1.5rem;
  }

  .sw-footer-links a {
    color: #999;
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.15s;
  }

  .sw-footer-links a:hover { color: var(--white); }

  .sw-footer-copy {
    font-size: 0.75rem;
    color: #555;
    width: 100%;
  }

  @media (max-width: 640px) {
    .sw-nav { display: none; }
    .sw-header-inner { gap: 1rem; }
    .sw-btn-book { padding: 0.45rem 0.9rem; font-size: 0.8rem; }
  }
</style>
