<script lang="ts">
  import { onMount } from 'svelte';

  import { API_URL } from '$lib/config';

  let summary = $state<any>(null);
  let recentOrders = $state<any[]>([]);
  let loading = $state(true);

  const STATUS_COLORS: Record<string, string> = {
    submitted: '#E8A820',
    quoted:    '#378ADD',
    paid:      '#1D9E75',
    picked_up: '#8B5CF6',
    in_transit:'#F97316',
    delivered: '#22C55E',
  };

  function getToken() {
    return document.cookie.split('; ').find(r => r.startsWith('admin_token='))?.split('=')[1] || '';
  }

  onMount(async () => {
    const headers = { Authorization: `Bearer ${getToken()}` };
    try {
      const [sumRes, ordRes] = await Promise.all([
        fetch(`${API_URL}/admin/dashboard`, { headers }),
        fetch(`${API_URL}/orders/?`, { headers }),
      ]);
      summary = await sumRes.json();
      const orders = await ordRes.json();
      recentOrders = orders.slice(0, 8);
    } catch (e) {
      console.error(e);
    }
    loading = false;
  });

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

<svelte:head><title>Dashboard — Shipway237 Admin</title></svelte:head>

<div class="page">
  <h1 class="page-title">Dashboard</h1>

  {#if loading}
    <div class="loading">Loading...</div>
  {:else}
    <!-- Summary cards -->
    <div class="summary-grid">
      <div class="summary-card">
        <span class="summary-label">Total orders</span>
        <span class="summary-value">{summary?.total_orders ?? 0}</span>
      </div>
      <div class="summary-card">
        <span class="summary-label">Total revenue</span>
        <span class="summary-value">CAD {(summary?.total_revenue_cad ?? 0).toLocaleString('en-CA', { minimumFractionDigits: 2 })}</span>
      </div>
      <div class="summary-card">
        <span class="summary-label">Submitted</span>
        <span class="summary-value highlight">{summary?.status_counts?.submitted ?? 0}</span>
      </div>
      <div class="summary-card">
        <span class="summary-label">Quoted</span>
        <span class="summary-value">{summary?.status_counts?.quoted ?? 0}</span>
      </div>
      <div class="summary-card">
        <span class="summary-label">Paid</span>
        <span class="summary-value green">{summary?.status_counts?.paid ?? 0}</span>
      </div>
      <div class="summary-card">
        <span class="summary-label">In transit</span>
        <span class="summary-value">{summary?.status_counts?.in_transit ?? 0}</span>
      </div>
    </div>

    <!-- Recent orders -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Recent orders</h2>
        <a href="/admin/orders" class="section-link">View all →</a>
      </div>

      {#if recentOrders.length === 0}
        <div class="empty">No orders yet.</div>
      {:else}
        <div class="orders-table">
          <div class="table-head">
            <span>Reference</span>
            <span>Client</span>
            <span>Service</span>
            <span>Date</span>
            <span>Status</span>
          </div>
          {#each recentOrders as order}
            <a href="/admin/orders/{order.id}" class="table-row">
              <span class="ref">{order.reference_no}</span>
              <span class="client">{order.clients?.full_name ?? '—'}</span>
              <span class="service">{order.service_type}</span>
              <span class="date">{formatDate(order.submitted_at)}</span>
              <span class="status-pill" style="background: {STATUS_COLORS[order.status]}20; color: {STATUS_COLORS[order.status]}">
                {order.status.replace('_', ' ')}
              </span>
            </a>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .page { max-width: 1000px; }
  .page-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.75rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; margin-bottom: 1.5rem; }
  .loading { color: var(--gray); font-size: 0.9rem; }

  .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .summary-card { background: #fff; border-radius: var(--radius-lg); border: 0.5px solid var(--gray-light); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; }
  .summary-label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray-mid); }
  .summary-value { font-size: 1.75rem; font-weight: 700; font-family: 'Barlow Condensed', sans-serif; color: #1a1a1a; }
  .summary-value.highlight { color: #E8A820; }
  .summary-value.green { color: #1D9E75; }

  .section { background: #fff; border-radius: var(--radius-lg); border: 0.5px solid var(--gray-light); overflow: hidden; }
  .section-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; border-bottom: 0.5px solid var(--gray-light); }
  .section-title { font-size: 0.95rem; font-weight: 600; color: #1a1a1a; }
  .section-link { font-size: 0.8rem; color: var(--red); text-decoration: none; font-weight: 500; }
  .section-link:hover { text-decoration: underline; }
  .empty { padding: 2rem; text-align: center; color: var(--gray-mid); font-size: 0.875rem; }

  .orders-table { display: flex; flex-direction: column; }
  .table-head { display: grid; grid-template-columns: 1fr 1.5fr 0.75fr 0.75fr 1fr; gap: 1rem; padding: 0.6rem 1.25rem; background: #f9f9f7; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray-mid); }
  .table-row { display: grid; grid-template-columns: 1fr 1.5fr 0.75fr 0.75fr 1fr; gap: 1rem; padding: 0.875rem 1.25rem; border-top: 0.5px solid var(--gray-light); text-decoration: none; color: #1a1a1a; font-size: 0.875rem; transition: background 0.1s; align-items: center; }
  .table-row:hover { background: #f9f9f7; }
  .ref { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 0.95rem; color: var(--red); }
  .client { font-weight: 500; }
  .service { text-transform: capitalize; color: var(--gray); }
  .date { color: var(--gray-mid); }
  .status-pill { font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.6rem; border-radius: 20px; text-transform: capitalize; white-space: nowrap; }

  @media (max-width: 640px) {
    .table-head { display: none; }
    .table-row { grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; }
    .service, .date { font-size: 0.78rem; }
  }
</style>
