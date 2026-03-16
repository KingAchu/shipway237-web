<script lang="ts">
  import { onMount } from 'svelte';

  import { API_URL } from '$lib/config';

  let schedules = $state<any[]>([]);
  let loading = $state(true);
  let showForm = $state(false);
  let saving = $state(false);

  let form = $state({ city: '', province: 'QC', date_from: '', date_to: '', notes: '' });

  const QC_CITIES = ['Montréal', 'Laval', 'Longueuil', 'Québec City', 'Gatineau', 'Sherbrooke', 'Trois-Rivières', 'Saguenay', 'Lévis', 'Terrebonne'];
  const ON_CITIES = ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'London', 'Markham', 'Vaughan', 'Kitchener', 'Windsor'];

  function getToken() {
    return document.cookie.split('; ').find(r => r.startsWith('admin_token='))?.split('=')[1] || '';
  }
  const headers = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` });

  onMount(async () => {
    const res = await fetch(`${API_URL}/schedules/`, { headers: headers() });
    schedules = await res.json();
    loading = false;
  });

  async function addSchedule() {
    if (!form.city || !form.date_from || !form.date_to) return;
    saving = true;
    const res = await fetch(`${API_URL}/schedules/`, {
      method: 'POST', headers: headers(),
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const s = await res.json();
      schedules = [s, ...schedules];
      form = { city: '', province: 'QC', date_from: '', date_to: '', notes: '' };
      showForm = false;
    }
    saving = false;
  }

  async function toggleActive(s: any) {
    await fetch(`${API_URL}/schedules/${s.id}`, {
      method: 'PATCH', headers: headers(),
      body: JSON.stringify({ is_active: !s.is_active }),
    });
    schedules = schedules.map(x => x.id === s.id ? { ...x, is_active: !x.is_active } : x);
  }

  async function deleteSchedule(id: string) {
    if (!confirm('Deactivate this pickup window?')) return;
    await fetch(`${API_URL}/schedules/${id}`, { method: 'DELETE', headers: headers() });
    schedules = schedules.filter(s => s.id !== id);
  }
</script>

<svelte:head><title>Schedules — Shipway237 Admin</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1 class="page-title">Pickup schedules</h1>
    <button class="btn-add" onclick={() => showForm = !showForm}>
      {showForm ? 'Cancel' : '+ Add window'}
    </button>
  </div>

  {#if showForm}
  <div class="form-card">
    <h2 class="form-title">New pickup window</h2>
    <div class="form-grid">
      <div class="form-group">
        <label for="province" class="form-label">Province</label>
        <select id="province" class="form-select" bind:value={form.province}>
          <option value="QC">Québec</option>
          <option value="ON">Ontario</option>
        </select>
      </div>
      <div class="form-group">
        <label for="city" class="form-label">City *</label>
        <select id="city" class="form-select" bind:value={form.city}>
          <option value="">Select city</option>
          {#each (form.province === 'QC' ? QC_CITIES : ON_CITIES) as c}
            <option value={c}>{c}</option>
          {/each}
        </select>
      </div>
      <div class="form-group">
        <label for="date-from" class="form-label">From *</label>
        <input id="date-from" class="form-input" type="date" bind:value={form.date_from} />
      </div>
      <div class="form-group">
        <label for="date-to" class="form-label">To *</label>
        <input id="date-to" class="form-input" type="date" bind:value={form.date_to} />
      </div>
    </div>
    <div class="form-group">
      <label for="notes" class="form-label">Notes (optional)</label>
      <input id="notes" class="form-input" type="text" placeholder="e.g. Will be near Côte-des-Neiges area" bind:value={form.notes} />
    </div>
    <button class="btn-save" disabled={!form.city || !form.date_from || !form.date_to || saving} onclick={addSchedule}>
      {saving ? 'Saving...' : 'Save pickup window'}
    </button>
  </div>
  {/if}

  {#if loading}
    <div class="loading">Loading schedules...</div>
  {:else if schedules.length === 0}
    <div class="empty">No pickup windows yet. Add one above.</div>
  {:else}
    <div class="schedules-list">
      {#each schedules as s}
        <div class="schedule-row" class:inactive={!s.is_active}>
          <div class="schedule-info">
            <span class="schedule-city">{s.city}, {s.province}</span>
            <span class="schedule-dates">{s.date_from} — {s.date_to}</span>
            {#if s.notes}<span class="schedule-notes">{s.notes}</span>{/if}
          </div>
          <div class="schedule-actions">
            <span class="schedule-badge" class:active={s.is_active}>
              {s.is_active ? 'Active' : 'Inactive'}
            </span>
            <button class="action-btn" onclick={() => toggleActive(s)}>
              {s.is_active ? 'Deactivate' : 'Activate'}
            </button>
            <button class="action-btn danger" onclick={() => deleteSchedule(s.id)}>Delete</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .page { max-width: 800px; }
  .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
  .page-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.75rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; }
  .btn-add { padding: 0.6rem 1.25rem; background: var(--red); color: #fff; border: none; border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }
  .btn-add:hover { background: var(--red-dark); }
  .form-card { background: #fff; border-radius: var(--radius-lg); border: 1.5px solid rgba(180,40,20,0.2); padding: 1.25rem; margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.875rem; }
  .form-title { font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray-mid); }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.35rem; }
  .form-label { font-size: 0.8rem; font-weight: 600; color: #1a1a1a; }
  .form-input, .form-select { width: 100%; padding: 0.65rem 0.875rem; border: 1.5px solid var(--gray-light); border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 0.9rem; color: #1a1a1a; background: #fff; appearance: none; }
  .form-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23646464'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.75rem center; padding-right: 2rem; }
  .form-input:focus, .form-select:focus { outline: none; border-color: var(--red); }
  .btn-save { padding: 0.75rem; background: var(--red); color: #fff; border: none; border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }
  .btn-save:hover:not(:disabled) { background: var(--red-dark); }
  .btn-save:disabled { background: var(--gray-light); color: var(--gray-mid); cursor: not-allowed; }
  .loading, .empty { color: var(--gray); font-size: 0.9rem; padding: 2rem 0; text-align: center; }
  .schedules-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .schedule-row { background: #fff; border-radius: var(--radius-lg); border: 0.5px solid var(--gray-light); padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
  .schedule-row.inactive { opacity: 0.5; }
  .schedule-info { display: flex; flex-direction: column; gap: 0.2rem; }
  .schedule-city { font-weight: 600; font-size: 0.95rem; color: #1a1a1a; }
  .schedule-dates { font-size: 0.85rem; color: var(--gray); }
  .schedule-notes { font-size: 0.78rem; color: var(--gray-mid); }
  .schedule-actions { display: flex; align-items: center; gap: 0.75rem; }
  .schedule-badge { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 20px; }
  .schedule-badge.active { background: #e8f8f0; color: #1D9E75; }
  .schedule-badge:not(.active) { background: #f5f5f3; color: var(--gray-mid); }
  .action-btn { padding: 0.35rem 0.75rem; border: 1.5px solid var(--gray-light); border-radius: var(--radius); background: #fff; font-family: 'Barlow', sans-serif; font-size: 0.78rem; font-weight: 500; color: var(--gray); cursor: pointer; transition: all 0.15s; }
  .action-btn:hover { border-color: var(--red); color: var(--red); }
  .action-btn.danger:hover { border-color: #e24b4a; color: #e24b4a; }
  @media (max-width: 480px) { .form-grid { grid-template-columns: 1fr; } }
</style>
