<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  import { API_URL } from '$lib/config';

  let order = $state<any>(null);
  let loading = $state(true);
  let quoteAmount = $state('');
  let quoteNotes = $state('');
  let sendingQuote = $state(false);
  let updatingStatus = $state(false);
  let statusNote = $state('');
  let successMsg = $state('');

  const STATUSES = ['submitted', 'quoted', 'paid', 'picked_up', 'in_transit', 'delivered'];

  const STATUS_COLORS: Record<string, string> = {
    submitted: '#E8A820', quoted: '#378ADD', paid: '#1D9E75',
    picked_up: '#8B5CF6', in_transit: '#F97316', delivered: '#22C55E',
  };

  function getToken() {
    return document.cookie.split('; ').find(r => r.startsWith('admin_token='))?.split('=')[1] || '';
  }

  const headers = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`
  });

  onMount(async () => {
    const id = $page.params.id;
    const res = await fetch(`${API_URL}/orders/${id}`, { headers: headers() });
    order = await res.json();
    loading = false;
  });

  async function sendQuote() {
    if (!quoteAmount) return;
    sendingQuote = true;
    try {
      const res = await fetch(`${API_URL}/quotes/`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ order_id: order.id, amount: parseFloat(quoteAmount), notes: quoteNotes }),
      });
      if (res.ok) {
        successMsg = 'Quote sent via WhatsApp!';
        order = { ...order, status: 'quoted' };
        quoteAmount = '';
        quoteNotes = '';
      }
    } catch { }
    sendingQuote = false;
    setTimeout(() => successMsg = '', 4000);
  }

  async function updateStatus(newStatus: string) {
    updatingStatus = true;
    try {
      await fetch(`${API_URL}/orders/${order.id}/status`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify({ status: newStatus, note: statusNote }),
      });
      order = { ...order, status: newStatus };
      successMsg = `Status updated to ${newStatus.replace('_', ' ')}`;
      statusNote = '';
    } catch { }
    updatingStatus = false;
    setTimeout(() => successMsg = '', 4000);
  }

  async function confirmInterac() {
    const amount = prompt('Enter amount paid (CAD):');
    if (!amount) return;
    const ref = prompt('Interac reference (optional):') || '';
    const res = await fetch(`${API_URL}/payments/confirm-interac`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ order_id: order.id, amount: parseFloat(amount), interac_ref: ref }),
    });
    if (res.ok) {
      order = { ...order, status: 'paid' };
      successMsg = 'Interac payment confirmed!';
      setTimeout(() => successMsg = '', 4000);
    }
  }

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

<svelte:head><title>Order Detail — Shipway237 Admin</title></svelte:head>

<div class="page">
  <a href="/admin/orders" class="back-link">← Back to orders</a>

  {#if loading}
    <div class="loading">Loading order...</div>
  {:else if order}

    {#if successMsg}
      <div class="success-banner">{successMsg}</div>
    {/if}

    <div class="order-header">
      <div>
        <h1 class="order-ref">{order.reference_no}</h1>
        <p class="order-meta">{order.service_type} · {formatDate(order.submitted_at)}</p>
      </div>
      <span class="status-pill large" style="background: {STATUS_COLORS[order.status]}20; color: {STATUS_COLORS[order.status]}">
        {order.status.replace('_', ' ')}
      </span>
    </div>

    <div class="grid">

      <!-- Client info -->
      <div class="card">
        <h2 class="card-title">Client</h2>
        <div class="info-rows">
          <div class="info-row"><span>Name</span><span>{order.clients?.full_name}</span></div>
          <div class="info-row"><span>Email</span><span>{order.clients?.email}</span></div>
          <div class="info-row"><span>Phone</span>
            <a href="https://wa.me/{order.clients?.phone?.replace('+','')}" target="_blank" class="wa-link">
              {order.clients?.phone}
            </a>
          </div>
          <div class="info-row"><span>Language</span><span>{order.clients?.preferred_lang?.toUpperCase()}</span></div>
        </div>
      </div>

      <!-- Service details -->
      <div class="card">
        <h2 class="card-title">Service details</h2>
        {#if order.vehicle_details}
          <div class="info-rows">
            <div class="info-row"><span>Year</span><span>{order.vehicle_details.vehicle_year}</span></div>
            <div class="info-row"><span>Make</span><span>{order.vehicle_details.vehicle_make}</span></div>
            <div class="info-row"><span>Model</span><span>{order.vehicle_details.vehicle_model}</span></div>
            {#if order.vehicle_details.vehicle_trim}<div class="info-row"><span>Trim</span><span>{order.vehicle_details.vehicle_trim}</span></div>{/if}
            <div class="info-row"><span>Condition</span><span>{order.vehicle_details.condition}</span></div>
            {#if order.vehicle_details.vin}<div class="info-row"><span>VIN</span><span>{order.vehicle_details.vin}</span></div>{/if}
          </div>
        {:else if order.barrel_details}
          <div class="info-rows">
            <div class="info-row"><span>Size</span><span>{order.barrel_details.barrel_size}</span></div>
            <div class="info-row"><span>Quantity</span><span>{order.barrel_details.quantity}</span></div>
            <div class="info-row"><span>Contents</span><span>{order.barrel_details.contents_description}</span></div>
          </div>
        {:else if order.procurement_details}
          <div class="info-rows">
            <div class="info-row"><span>Item</span><span>{order.procurement_details.item_description}</span></div>
            {#if order.procurement_details.item_url}<div class="info-row"><span>Link</span><a href={order.procurement_details.item_url} target="_blank" class="text-link">View →</a></div>{/if}
            <div class="info-row"><span>Quantity</span><span>{order.procurement_details.quantity}</span></div>
            <div class="info-row"><span>Budget</span><span>XAF {order.procurement_details.budget_cad?.toLocaleString()}</span></div>
            <div class="info-row"><span>Fee %</span><span>{order.procurement_details.fee_percentage}%</span></div>
          </div>
        {/if}
      </div>

      <!-- Delivery address -->
      <div class="card">
        <h2 class="card-title">Delivery address</h2>
        {#if order.cameroon_addresses}
          <div class="info-rows">
            <div class="info-row"><span>Recipient</span><span>{order.cameroon_addresses.recipient_name}</span></div>
            <div class="info-row"><span>Phone</span><span>{order.cameroon_addresses.recipient_phone}</span></div>
            <div class="info-row"><span>City</span><span>{order.cameroon_addresses.city}</span></div>
            {#if order.cameroon_addresses.neighbourhood}<div class="info-row"><span>Area</span><span>{order.cameroon_addresses.neighbourhood}</span></div>{/if}
            {#if order.cameroon_addresses.landmark}<div class="info-row"><span>Landmark</span><span>{order.cameroon_addresses.landmark}</span></div>{/if}
            <div class="info-row"><span>Description</span><span class="wrap">{order.cameroon_addresses.full_description}</span></div>
          </div>
        {/if}
      </div>

      <!-- Pickup -->
      {#if order.pickup_schedules}
      <div class="card">
        <h2 class="card-title">Pickup</h2>
        <div class="info-rows">
          <div class="info-row"><span>City</span><span>{order.pickup_schedules.city}, {order.pickup_schedules.province}</span></div>
          <div class="info-row"><span>Window</span><span>{order.pickup_schedules.date_from} — {order.pickup_schedules.date_to}</span></div>
        </div>
      </div>
      {/if}

      <!-- Quote builder -->
      <div class="card card-accent">
        <h2 class="card-title">Send quote</h2>
        <div class="form-group">
          <label for="amount" class="form-label">Amount (CAD) *</label>
          <input id="amount" class="form-input" type="number" placeholder="0.00" bind:value={quoteAmount} />
        </div>
        <div class="form-group">
          <label for="notes" class="form-label">Notes (optional)</label>
          <textarea id="notes" class="form-textarea" rows="2" placeholder="Any notes for the client..." bind:value={quoteNotes}></textarea>
        </div>
        <button class="btn-quote" disabled={!quoteAmount || sendingQuote} onclick={sendQuote}>
          {sendingQuote ? 'Sending...' : 'Send quote via WhatsApp'}
        </button>
        <button class="btn-interac" onclick={confirmInterac}>
          Confirm Interac payment
        </button>
      </div>

      <!-- Status update -->
      <div class="card">
        <h2 class="card-title">Update status</h2>
        <div class="status-buttons">
          {#each STATUSES as s}
            <button
              class="status-btn"
              class:current={order.status === s}
              style={order.status === s ? `background: ${STATUS_COLORS[s]}20; color: ${STATUS_COLORS[s]}; border-color: ${STATUS_COLORS[s]}` : ''}
              disabled={order.status === s || updatingStatus}
              onclick={() => updateStatus(s)}
            >
              {s.replace('_', ' ')}
            </button>
          {/each}
        </div>
        <div class="form-group" style="margin-top: 0.75rem;">
          <label for="status-note" class="form-label">Note (optional)</label>
          <input id="status-note" class="form-input" type="text" placeholder="e.g. Picked up in Montreal June 19" bind:value={statusNote} />
        </div>
      </div>

    </div>

    <!-- Status history -->
    {#if order.order_status_history?.length > 0}
    <div class="card history-card">
      <h2 class="card-title">Status history</h2>
      <div class="history-list">
        {#each order.order_status_history as h}
          <div class="history-row">
            <span class="history-status">{h.new_status.replace('_', ' ')}</span>
            <span class="history-by">{h.triggered_by}</span>
            {#if h.note}<span class="history-note">{h.note}</span>{/if}
            <span class="history-date">{formatDate(h.changed_at)}</span>
          </div>
        {/each}
      </div>
    </div>
    {/if}

  {/if}
</div>

<style>
  .page { max-width: 900px; }
  .back-link { display: inline-block; color: var(--gray); text-decoration: none; font-size: 0.875rem; margin-bottom: 1.25rem; transition: color 0.15s; }
  .back-link:hover { color: var(--red); }
  .loading { color: var(--gray); padding: 2rem 0; }

  .success-banner { background: #e8f8f0; border: 1px solid #1D9E75; color: #0F6E56; padding: 0.75rem 1rem; border-radius: var(--radius); font-size: 0.875rem; margin-bottom: 1.25rem; }

  .order-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.5rem; gap: 1rem; flex-wrap: wrap; }
  .order-ref { font-family: 'Barlow Condensed', sans-serif; font-size: 2rem; font-weight: 700; color: #1a1a1a; margin: 0; }
  .order-meta { font-size: 0.875rem; color: var(--gray); margin-top: 0.25rem; text-transform: capitalize; }
  .status-pill { font-size: 0.8rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 20px; text-transform: capitalize; white-space: nowrap; }
  .status-pill.large { font-size: 0.9rem; padding: 0.5rem 1rem; }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }

  .card { background: #fff; border-radius: var(--radius-lg); border: 0.5px solid var(--gray-light); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; }
  .card-accent { border-color: rgba(180,40,20,0.2); background: #fdfaf9; }
  .card-title { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray-mid); margin: 0; }

  .info-rows { display: flex; flex-direction: column; gap: 0.5rem; }
  .info-row { display: flex; justify-content: space-between; gap: 1rem; font-size: 0.875rem; }
  .info-row span:first-child { color: var(--gray-mid); flex-shrink: 0; }
  .info-row span:last-child { text-align: right; font-weight: 500; }
  .wrap { text-align: right; word-break: break-word; }

  .wa-link { color: #1a7c3e; text-decoration: none; font-weight: 500; }
  .wa-link:hover { text-decoration: underline; }
  .text-link { color: var(--red); text-decoration: none; font-weight: 500; }

  .form-group { display: flex; flex-direction: column; gap: 0.35rem; }
  .form-label { font-size: 0.8rem; font-weight: 600; color: #1a1a1a; }
  .form-input, .form-textarea { width: 100%; padding: 0.65rem 0.875rem; border: 1.5px solid var(--gray-light); border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 0.9rem; color: #1a1a1a; background: #fff; }
  .form-input:focus, .form-textarea:focus { outline: none; border-color: var(--red); }
  .form-textarea { resize: vertical; }

  .btn-quote { width: 100%; padding: 0.75rem; background: var(--red); color: #fff; border: none; border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }
  .btn-quote:hover:not(:disabled) { background: var(--red-dark); }
  .btn-quote:disabled { background: var(--gray-light); color: var(--gray-mid); cursor: not-allowed; }
  .btn-interac { width: 100%; padding: 0.65rem; background: none; border: 1.5px solid var(--gray-light); border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 0.85rem; font-weight: 500; color: var(--gray); cursor: pointer; transition: all 0.15s; }
  .btn-interac:hover { border-color: #1D9E75; color: #1D9E75; }

  .status-buttons { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .status-btn { padding: 0.4rem 0.75rem; border: 1.5px solid var(--gray-light); border-radius: 20px; background: #fff; font-family: 'Barlow', sans-serif; font-size: 0.78rem; font-weight: 500; color: var(--gray); cursor: pointer; transition: all 0.15s; text-transform: capitalize; }
  .status-btn:hover:not(:disabled) { border-color: var(--red); color: var(--red); }
  .status-btn:disabled { cursor: default; }
  .status-btn.current { font-weight: 600; }

  .history-card { margin-top: 0; }
  .history-list { display: flex; flex-direction: column; gap: 0.5rem; }
  .history-row { display: flex; align-items: center; gap: 1rem; font-size: 0.825rem; padding: 0.5rem 0; border-bottom: 0.5px solid var(--gray-light); flex-wrap: wrap; }
  .history-row:last-child { border-bottom: none; }
  .history-status { font-weight: 600; text-transform: capitalize; color: #1a1a1a; min-width: 90px; }
  .history-by { color: var(--gray-mid); font-size: 0.78rem; }
  .history-note { color: var(--gray); flex: 1; }
  .history-date { color: var(--gray-mid); font-size: 0.78rem; margin-left: auto; }

  @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
</style>
