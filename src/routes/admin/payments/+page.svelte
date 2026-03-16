<script lang="ts">
  import { onMount } from 'svelte';

  import { API_URL } from '$lib/config';

  let payments = $state<any[]>([]);
  let loading = $state(true);

  function getToken() {
    return document.cookie.split('; ').find(r => r.startsWith('admin_token='))?.split('=')[1] || '';
  }

  onMount(async () => {
    const res = await fetch(`${API_URL}/payments/`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    payments = await res.json();
    loading = false;
  });

  let total = $derived(payments.filter(p => p.status === 'confirmed').reduce((sum, p) => sum + (p.amount || 0), 0));

  function formatDate(d: string) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const METHOD_LABELS: Record<string, string> = {
    card: 'Card (Stripe)',
    mobile_money: 'Mobile Money',
    interac: 'Interac',
  };

  const STATUS_COLORS: Record<string, string> = {
    confirmed: '#1D9E75',
    pending:   '#E8A820',
    failed:    '#e24b4a',
  };
</script>

<svelte:head><title>Payments — Shipway237 Admin</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1 class="page-title">Payments</h1>
    <div class="total-box">
      <span class="total-label">Total confirmed</span>
      <span class="total-value">CAD {total.toLocaleString('en-CA', { minimumFractionDigits: 2 })}</span>
    </div>
  </div>

  {#if loading}
    <div class="loading">Loading payments...</div>
  {:else if payments.length === 0}
    <div class="empty">No payments yet.</div>
  {:else}
    <div class="payments-table">
      <div class="table-head">
        <span>Reference</span>
        <span>Client</span>
        <span>Method</span>
        <span>Amount</span>
        <span>Date</span>
        <span>Status</span>
      </div>
      {#each payments as p}
        <a href="/admin/orders/{p.order_id}" class="table-row">
          <span class="ref">{p.orders?.reference_no ?? '—'}</span>
          <span class="client">{p.orders?.clients?.full_name ?? '—'}</span>
          <span class="method">{METHOD_LABELS[p.method] ?? p.method}</span>
          <span class="amount">CAD {p.amount?.toLocaleString('en-CA', { minimumFractionDigits: 2 })}</span>
          <span class="date">{formatDate(p.paid_at)}</span>
          <span class="status-pill" style="background: {STATUS_COLORS[p.status]}20; color: {STATUS_COLORS[p.status]}">
            {p.status}
          </span>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .page { max-width: 900px; }
  .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; gap: 1rem; flex-wrap: wrap; }
  .page-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.75rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; }
  .total-box { background: #fff; border: 0.5px solid var(--gray-light); border-radius: var(--radius-lg); padding: 0.75rem 1.25rem; display: flex; flex-direction: column; gap: 0.1rem; }
  .total-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray-mid); }
  .total-value { font-family: 'Barlow Condensed', sans-serif; font-size: 1.4rem; font-weight: 700; color: #1D9E75; }
  .loading, .empty { color: var(--gray); font-size: 0.9rem; padding: 2rem 0; text-align: center; }
  .payments-table { background: #fff; border-radius: var(--radius-lg); border: 0.5px solid var(--gray-light); overflow: hidden; }
  .table-head { display: grid; grid-template-columns: 1fr 1.25fr 1fr 1fr 0.75fr 0.75fr; gap: 1rem; padding: 0.6rem 1.25rem; background: #f9f9f7; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray-mid); }
  .table-row { display: grid; grid-template-columns: 1fr 1.25fr 1fr 1fr 0.75fr 0.75fr; gap: 1rem; padding: 0.875rem 1.25rem; border-top: 0.5px solid var(--gray-light); text-decoration: none; color: #1a1a1a; font-size: 0.875rem; transition: background 0.1s; align-items: center; }
  .table-row:hover { background: #f9f9f7; }
  .ref { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; color: var(--red); }
  .client { font-weight: 500; }
  .method { color: var(--gray); font-size: 0.82rem; }
  .amount { font-weight: 600; }
  .date { color: var(--gray-mid); font-size: 0.8rem; }
  .status-pill { font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.6rem; border-radius: 20px; text-transform: capitalize; white-space: nowrap; }
  @media (max-width: 640px) { .table-head { display: none; } .table-row { grid-template-columns: 1fr 1fr; } .method, .date { display: none; } }
</style>
