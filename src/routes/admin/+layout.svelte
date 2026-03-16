<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let { children } = $props();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '▦' },
    { href: '/admin/orders', label: 'Orders', icon: '📋' },
    { href: '/admin/clients', label: 'Clients', icon: '👥' },
    { href: '/admin/schedules', label: 'Schedules', icon: '📅' },
    { href: '/admin/payments', label: 'Payments', icon: '💳' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  function isActive(href: string) {
    if (href === '/admin') return $page.url.pathname === '/admin';
    return $page.url.pathname.startsWith(href);
  }

  async function logout() {
    document.cookie = 'admin_token=; Max-Age=0; path=/';
    goto('/admin/login');
  }

  let sidebarOpen = $state(false);
  let isLoginPage = $derived($page.url.pathname === '/admin/login');
</script>

{#if isLoginPage}
  {@render children()}
{:else}
<div class="admin-shell">
  <div class="admin-mobile-header">
    <button class="menu-btn" onclick={() => sidebarOpen = !sidebarOpen}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12h18M3 6h18M3 18h18"/>
      </svg>
    </button>
    <span class="admin-mobile-title">Shipway237 Admin</span>
  </div>

  {#if sidebarOpen}
    <div class="sidebar-overlay" onclick={() => sidebarOpen = false}></div>
  {/if}

  <aside class="admin-sidebar" class:open={sidebarOpen}>
    <div class="sidebar-logo">
      <img src="/src/lib/assets/logo.png" alt="Shipway237" style="height: 36px; width: auto;" />
      <span class="sidebar-badge">Admin</span>
    </div>

    <nav class="sidebar-nav">
      {#each navItems as item}
        <a
          href={item.href}
          class="sidebar-link"
          class:active={isActive(item.href)}
          onclick={() => sidebarOpen = false}
        >
          <span class="sidebar-icon">{item.icon}</span>
          {item.label}
        </a>
      {/each}
    </nav>

    <button class="sidebar-logout" onclick={logout}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
      </svg>
      Log out
    </button>
  </aside>

  <main class="admin-main">
    {@render children()}
  </main>
</div>
{/if}

<style>
  .admin-shell {
    display: flex;
    min-height: 100vh;
    background: #f5f5f3;
  }

  .admin-mobile-header {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 200;
    height: 56px;
    background: #fff;
    border-bottom: 2px solid var(--red);
    padding: 0 1rem;
    align-items: center;
    gap: 1rem;
  }

  .menu-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--gray);
    padding: 0.25rem;
    display: flex;
    align-items: center;
  }

  .admin-mobile-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #1a1a1a;
  }

  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 149;
  }

  .admin-sidebar {
    width: 220px;
    flex-shrink: 0;
    background: #1a1a1a;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .sidebar-logo {
    padding: 1.25rem 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .sidebar-badge {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    background: var(--red);
    color: #fff;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }

  .sidebar-nav {
    flex: 1;
    padding: 0.75rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 1rem;
    text-decoration: none;
    color: #999;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.15s, background 0.15s;
    margin: 0 0.5rem;
    border-radius: 8px;
  }

  .sidebar-link:hover {
    color: #fff;
    background: rgba(255,255,255,0.06);
  }

  .sidebar-link.active {
    color: #fff;
    background: var(--red);
  }

  .sidebar-icon {
    font-size: 14px;
    width: 18px;
    text-align: center;
  }

  .sidebar-logout {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.875rem 1.5rem;
    background: none;
    border: none;
    border-top: 1px solid rgba(255,255,255,0.08);
    color: #666;
    font-family: 'Barlow', sans-serif;
    font-size: 0.875rem;
    cursor: pointer;
    transition: color 0.15s;
    width: 100%;
    text-align: left;
  }

  .sidebar-logout:hover { color: #fff; }

  .admin-main {
    flex: 1;
    min-width: 0;
    padding: 2rem;
    overflow-x: hidden;
  }

  @media (max-width: 768px) {
    .admin-mobile-header { display: flex; }
    .admin-sidebar {
      position: fixed;
      left: -220px;
      top: 0;
      bottom: 0;
      z-index: 150;
      transition: left 0.25s ease;
    }
    .admin-sidebar.open { left: 0; }
    .sidebar-overlay { display: block; }
    .admin-main { padding: 1rem; padding-top: calc(56px + 1rem); }
  }
</style>