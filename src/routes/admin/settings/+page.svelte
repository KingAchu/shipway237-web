<script lang="ts">
  import { onMount } from 'svelte';

  import { API_URL } from '$lib/config';

  let settings = $state<Record<string, string>>({});
  let loading = $state(true);
  let saving = $state<Record<string, boolean>>({});
  let saved = $state<Record<string, boolean>>({});

  function getToken() {
    return document.cookie.split('; ').find(r => r.startsWith('admin_token='))?.split('=')[1] || '';
  }
  const headers = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` });

  onMount(async () => {
    const res = await fetch(`${API_URL}/admin/settings`, { headers: headers() });
    const rows = await res.json();
    rows.forEach((r: any) => settings[r.key] = r.value);
    loading = false;
  });

  async function saveSetting(key: string) {
    saving[key] = true;
    await fetch(`${API_URL}/admin/settings/${key}`, {
      method: 'PATCH', headers: headers(),
      body: JSON.stringify({ value: settings[key] }),
    });
    saving[key] = false;
    saved[key] = true;
    setTimeout(() => { saved[key] = false; }, 2000);
  }

  const SETTING_LABELS: Record<string, { label: string; hint: string; type: string }> = {
    pricing_visible_vehicle:     { label: 'Show vehicle pricing publicly', hint: 'When on, vehicle prices are shown on the booking page', type: 'toggle' },
    pricing_visible_barrel:      { label: 'Show barrel pricing publicly',  hint: 'When on, barrel prices are shown on the booking page', type: 'toggle' },
    pricing_visible_procurement: { label: 'Show procurement fee publicly', hint: 'When on, procurement fee % is shown on the booking page', type: 'toggle' },
    procurement_fee_default:     { label: 'Default procurement fee (%)',   hint: 'Applied to all new procurement orders', type: 'number' },
    interac_email:               { label: 'Interac e-Transfer email',      hint: 'The email clients send Interac transfers to', type: 'text' },
    whatsapp_number:             { label: 'WhatsApp business number',      hint: 'Your Twilio WhatsApp sending number e.g. +15145550000', type: 'text' },
  };
</script>

<svelte:head><title>Settings — Shipway237 Admin</title></svelte:head>

<div class="page">
  <h1 class="page-title">Settings</h1>

  {#if loading}
    <div class="loading">Loading settings...</div>
  {:else}
    <div class="settings-list">
      {#each Object.entries(SETTING_LABELS) as [key, meta]}
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">{meta.label}</span>
            <span class="setting-hint">{meta.hint}</span>
          </div>
          <div class="setting-control">
            {#if meta.type === 'toggle'}
              <button
                class="toggle-btn"
                class:on={settings[key] === 'true'}
                onclick={() => {
                  settings[key] = settings[key] === 'true' ? 'false' : 'true';
                  saveSetting(key);
                }}
              >
                <span class="toggle-track">
                  <span class="toggle-thumb"></span>
                </span>
                {settings[key] === 'true' ? 'On' : 'Off'}
              </button>
            {:else}
              <div class="input-row">
                <input
                  class="setting-input"
                  type={meta.type}
                  bind:value={settings[key]}
                  onkeydown={(e) => e.key === 'Enter' && saveSetting(key)}
                />
                <button class="btn-save" onclick={() => saveSetting(key)} disabled={saving[key]}>
                  {saving[key] ? '...' : saved[key] ? '✓' : 'Save'}
                </button>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .page { max-width: 700px; }
  .page-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.75rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; margin-bottom: 1.5rem; }
  .loading { color: var(--gray); font-size: 0.9rem; }
  .settings-list { display: flex; flex-direction: column; gap: 0; background: #fff; border-radius: var(--radius-lg); border: 0.5px solid var(--gray-light); overflow: hidden; }
  .setting-row { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; padding: 1rem 1.25rem; border-bottom: 0.5px solid var(--gray-light); flex-wrap: wrap; }
  .setting-row:last-child { border-bottom: none; }
  .setting-info { display: flex; flex-direction: column; gap: 0.2rem; flex: 1; }
  .setting-label { font-size: 0.9rem; font-weight: 600; color: #1a1a1a; }
  .setting-hint { font-size: 0.78rem; color: var(--gray-mid); }
  .setting-control { flex-shrink: 0; }
  .toggle-btn { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; cursor: pointer; font-family: 'Barlow', sans-serif; font-size: 0.85rem; font-weight: 600; color: var(--gray); transition: color 0.15s; }
  .toggle-btn.on { color: #1D9E75; }
  .toggle-track { width: 36px; height: 20px; background: var(--gray-light); border-radius: 10px; position: relative; transition: background 0.2s; }
  .toggle-btn.on .toggle-track { background: #1D9E75; }
  .toggle-thumb { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; background: #fff; border-radius: 50%; transition: transform 0.2s; }
  .toggle-btn.on .toggle-thumb { transform: translateX(16px); }
  .input-row { display: flex; gap: 0.5rem; }
  .setting-input { padding: 0.5rem 0.75rem; border: 1.5px solid var(--gray-light); border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 0.875rem; color: #1a1a1a; width: 200px; }
  .setting-input:focus { outline: none; border-color: var(--red); }
  .btn-save { padding: 0.5rem 0.875rem; background: var(--red); color: #fff; border: none; border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 0.825rem; font-weight: 600; cursor: pointer; transition: background 0.15s; min-width: 52px; }
  .btn-save:hover:not(:disabled) { background: var(--red-dark); }
  .btn-save:disabled { background: #1D9E75; }
  @media (max-width: 480px) { .setting-row { flex-direction: column; align-items: flex-start; } .setting-input { width: 100%; } }
</style>
