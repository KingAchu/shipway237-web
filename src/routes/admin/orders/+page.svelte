<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  import { API_URL } from '$lib/config';

  let orders = $state<any[]>([]);
  let loading = $state(true);
  let filterStatus = $state('');
  let filterService = $state('');

  const STATUS_COLORS: Record<string, string> = {
    submitted: '#E8A820', quoted: '#378ADD', paid: '#1D9E75',
    picked_up: '#8B5CF6', in_transit: '#F97316', delivered: '#22C55E',
  };

  const STATUSES = ['', 'submitted', 'quoted', 'paid', 'picked_up', 'in_transit', 'delivered'];
  const SERVICES = ['', 'vehicle', 'barrel', 'procurement'];

  function getToken() {
    return document.cookie.split('; ').find(r => r.startsWith('admin_token='))?.split('=')[1] || '';
  }

  async function loadOrders() {
    loading = true;
    const headers = { Authorization: `Bearer ${getToken()}` };
    const params = new URLSearchParams();
    if (filterStatus) params.set('status', filterStatus);
    if (filterService) params.set('service_type', filterService);
    const res = await fetch(`${API_URL}/orders/?${params}`, { headers });
    orders = await res.json();
    loading = false;
  }

  onMount(loadOrders);

  function formatDate(d: string) {
    if (!d) return '—';
    return new Date(d).toLocaleString('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
</script>

<svelte:head><title>Orders — Shipway237 Admin</title></svelte:head>

<div class="page">
  <h1 class="page-title">Orders</h1>

  <div class="filters">
    <select class="filter-select" bind:value={filterStatus} onchange={loadOrders}>
      {#each STATUSES as s}
        <option value={s}>{s ? s.replace('_', ' ') : 'All statuses'}</option>
      {/each}
    </select>
    <select class="filter-select" bind:value={filterService} onchange={loadOrders}>
      {#each SERVICES as s}
        <option value={s}>{s || 'All services'}</option>
      {/each}
    </select>
    <span class="orders-count">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
  </div>

  {#if loading}
    <div class="loading">Loading orders...</div>
  {:else if orders.length === 0}
    <div class="empty">No orders found.</div>
  {:else}
    <div class="orders-table">
      <div class="table-head">
        <span>Reference</span>
        <span>Client</span>
        <span>Service</span>
        <span>City</span>
        <span>Date</span>
        <span>Status</span>
      </div>
      {#each orders as order}
        <a href="/admin/orders/{order.id}" class="table-row">
          <span class="ref">{order.reference_no}</span>
          <span class="client">
            <span class="client-name">{order.clients?.full_name ?? '—'}</span>
            <span class="client-phone">{order.clients?.phone ?? ''}</span>
          </span>
          <span class="service">{order.service_type}</span>
          <span class="city">{order.pickup_schedules?.city ?? '—'}</span>
          <span class="date">{formatDate(order.submitted_at)}</span>
          <span class="status-pill" style="background: {STATUS_COLORS[order.status]}20; color: {STATUS_COLORS[order.status]}">
            {order.status.replace('_', ' ')}
          </span>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .page { max-width: 1000px; }
  .page-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.75rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; margin-bottom: 1.25rem; }
  .filters { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
  .filter-select { padding: 0.5rem 2rem 0.5rem 0.75rem; border: 1.5px solid var(--gray-light); border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 0.875rem; color: #1a1a1a; background: #fff; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23646464'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.6rem center; cursor: pointer; }
  .filter-select:focus { outline: none; border-color: var(--red); }
  .orders-count { font-size: 0.8rem; color: var(--gray-mid); margin-left: auto; }
  .loading, .empty { color: var(--gray); font-size: 0.9rem; padding: 2rem 0; text-align: center; }
  .orders-table { background: #fff; border-radius: var(--radius-lg); border: 0.5px solid var(--gray-light); overflow: hidden; }
  .table-head { display: grid; grid-template-columns: 1fr 1.5fr 0.75fr 0.75fr 0.75fr 1fr; gap: 1rem; padding: 0.6rem 1.25rem; background: #f9f9f7; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray-mid); }
  .table-row { display: grid; grid-template-columns: 1fr 1.5fr 0.75fr 0.75fr 0.75fr 1fr; gap: 1rem; padding: 0.875rem 1.25rem; border-top: 0.5px solid var(--gray-light); text-decoration: none; color: #1a1a1a; font-size: 0.875rem; transition: background 0.1s; align-items: center; }
  .table-row:hover { background: #f9f9f7; }
  .ref { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 0.95rem; color: var(--red); }
  .client { display: flex; flex-direction: column; gap: 0.1rem; }
  .client-name { font-weight: 500; }
  .client-phone { font-size: 0.78rem; color: var(--gray-mid); }
  .service { text-transform: capitalize; color: var(--gray); }
  .city { color: var(--gray-mid); font-size: 0.8rem; }
  .date { color: var(--gray-mid); }
  .status-pill { font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.6rem; border-radius: 20px; text-transform: capitalize; white-space: nowrap; }
  @media (max-width: 640px) { .table-head { display: none; } .table-row { grid-template-columns: 1fr 1fr; } .city { display: none; } }
</style>
