<script lang="ts">
  import { onMount } from 'svelte';

  import { API_URL } from '$lib/config';

  let clients = $state<any[]>([]);
  let loading = $state(true);
  let search = $state('');

  function getToken() {
    return document.cookie.split('; ').find(r => r.startsWith('admin_token='))?.split('=')[1] || '';
  }

  onMount(async () => {
    const res = await fetch(`${API_URL}/clients/`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    clients = await res.json();
    loading = false;
  });

  let filtered = $derived(
    search
      ? clients.filter(c =>
          c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
          c.phone?.includes(search) ||
          c.email?.toLowerCase().includes(search.toLowerCase())
        )
      : clients
  );

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

<svelte:head><title>Clients — Shipway237 Admin</title></svelte:head>

<div class="page">
  <h1 class="page-title">Clients</h1>

  <div class="search-bar">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
    <input class="search-input" type="text" placeholder="Search by name, phone or email..." bind:value={search} />
  </div>

  {#if loading}
    <div class="loading">Loading clients...</div>
  {:else if filtered.length === 0}
    <div class="empty">No clients found.</div>
  {:else}
    <div class="clients-table">
      <div class="table-head">
        <span>Name</span>
        <span>Phone</span>
        <span>Email</span>
        <span>Orders</span>
        <span>Since</span>
      </div>
      {#each filtered as client}
        <div class="table-row">
          <span class="client-name">{client.full_name}</span>
          <a href="https://wa.me/{client.phone?.replace('+','')}" target="_blank" class="wa-link">{client.phone}</a>
          <span class="email">{client.email}</span>
          <span class="orders-count">{client.orders?.length ?? 0}</span>
          <span class="date">{formatDate(client.created_at)}</span>
        </div>
      {/each}
    </div>
    <p class="total-count">{filtered.length} client{filtered.length !== 1 ? 's' : ''}</p>
  {/if}
</div>

<style>
  .page { max-width: 900px; }
  .page-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.75rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; margin-bottom: 1.25rem; }
  .search-bar { display: flex; align-items: center; gap: 0.6rem; background: #fff; border: 1.5px solid var(--gray-light); border-radius: var(--radius); padding: 0.6rem 1rem; margin-bottom: 1.25rem; }
  .search-bar svg { color: var(--gray-mid); flex-shrink: 0; }
  .search-input { border: none; outline: none; font-family: 'Barlow', sans-serif; font-size: 0.9rem; color: #1a1a1a; flex: 1; background: transparent; }
  .loading, .empty { color: var(--gray); font-size: 0.9rem; padding: 2rem 0; text-align: center; }
  .clients-table { background: #fff; border-radius: var(--radius-lg); border: 0.5px solid var(--gray-light); overflow: hidden; }
  .table-head { display: grid; grid-template-columns: 1.5fr 1fr 1.5fr 0.5fr 0.75fr; gap: 1rem; padding: 0.6rem 1.25rem; background: #f9f9f7; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray-mid); }
  .table-row { display: grid; grid-template-columns: 1.5fr 1fr 1.5fr 0.5fr 0.75fr; gap: 1rem; padding: 0.875rem 1.25rem; border-top: 0.5px solid var(--gray-light); font-size: 0.875rem; align-items: center; }
  .client-name { font-weight: 600; color: #1a1a1a; }
  .wa-link { color: #1a7c3e; text-decoration: none; font-weight: 500; }
  .wa-link:hover { text-decoration: underline; }
  .email { color: var(--gray); font-size: 0.82rem; }
  .orders-count { font-weight: 600; color: var(--red); text-align: center; }
  .date { color: var(--gray-mid); font-size: 0.8rem; }
  .total-count { font-size: 0.78rem; color: var(--gray-mid); margin-top: 0.75rem; text-align: right; }
  @media (max-width: 640px) { .table-head { display: none; } .table-row { grid-template-columns: 1fr 1fr; } .email, .date { display: none; } }
</style>
