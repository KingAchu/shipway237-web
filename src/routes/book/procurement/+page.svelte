<script lang="ts">
  import { t } from '$lib/stores/lang';
  import { booking } from '$lib/stores/booking';
  import { goto } from '$app/navigation';
  import { getAvailableSchedules } from '$lib/api/schedules';

  let step = $state(1);
  const TOTAL_STEPS = 3;

  function next() { if (step < TOTAL_STEPS) step++; }
  function back() { if (step > 1) step--; else goto('/'); }

  // No pickup needed for procurement — only 3 steps:
  // 1. Item details  2. Delivery address  3. Your info

  const WHATSAPP_URL = 'https://wa.me/1514XXXXXXX';

  function canProceed(): boolean {
    const b = $booking;
    if (step === 1) return !!(b.procurement.item_description && b.procurement.quantity > 0 && b.procurement.budget_cad);
    if (step === 2) { const a = b.cameroon_address; return !!(a.recipient_name && a.recipient_phone && a.city && a.full_description); }
    if (step === 3) { const c = b.client; return !!(c.full_name && c.email && c.phone); }
    return true;
  }

  async function submitBooking() {
    const b = $booking;
    const payload = {
      service_type: 'procurement',
      pickup_schedule_id: null,
      preferred_lang: b.client.preferred_lang,
      client: b.client,
      cameroon_address: b.cameroon_address,
      procurement: b.procurement,
    };
    try {
      const { submitOrder } = await import('$lib/api/orders');
      const result = await submitOrder(payload);
      booking.update(bk => ({ ...bk, reference_no: result.reference_no, order_id: result.order_id }));
      goto('/book/success');
    } catch { alert($t.errors.generic); }
  }
</script>

<svelte:head><title>Buy for Me — Shipway237</title></svelte:head>

<div class="wizard">
  <div class="wizard-progress">
    <div class="progress-bar" style="width: {(step / TOTAL_STEPS) * 100}%"></div>
  </div>

  <div class="wizard-header">
    <button class="back-btn" onclick={back}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      {$t.booking.back}
    </button>
    <span class="step-label">
      {#if step === 1}{$t.procurement.title}
      {:else if step === 2}{$t.address.title}
      {:else}{$t.booking.your_info}
      {/if}
    </span>
    <span class="step-count">{step} / {TOTAL_STEPS}</span>
  </div>

  <div class="wizard-body">

    {#if step === 1}
    <div class="step-content">
      <h2 class="step-title">{$t.procurement.title}</h2>

      <div class="info-box">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        {$t.procurement.fee_note}
      </div>

      <div class="form-group">
        <label for="item" class="form-label">{$t.procurement.item} *</label>
        <textarea id="item" class="form-textarea" rows="3"
          placeholder={$t.procurement.item_hint}
          bind:value={$booking.procurement.item_description}></textarea>
      </div>

      <div class="form-group">
        <label for="item-url" class="form-label">Product link (optional)</label>
        <input id="item-url" class="form-input" type="url"
          placeholder="https://www.amazon.ca/..."
          bind:value={$booking.procurement.item_url} />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="qty" class="form-label">{$t.procurement.quantity} *</label>
          <input id="qty" class="form-input" type="number" min="1"
            bind:value={$booking.procurement.quantity} />
        </div>
        <div class="form-group">
          <label for="budget" class="form-label">{$t.procurement.budget} *</label>
          <div class="input-prefix-wrap">
            <span class="input-prefix">CFA</span>
            <input id="budget" class="form-input input-with-prefix" type="number" min="1"
              placeholder="0.00"
              bind:value={$booking.procurement.budget_cad} />
          </div>
          <p class="form-hint">{$t.procurement.budget_hint}</p>
        </div>
      </div>
    </div>

    {:else if step === 2}
    <div class="step-content">
      <h2 class="step-title">{$t.address.title}</h2>
      <div class="form-row">
        <div class="form-group">
          <label for="rec-name" class="form-label">{$t.address.recipient_name} *</label>
          <input id="rec-name" class="form-input" type="text" bind:value={$booking.cameroon_address.recipient_name} />
        </div>
        <div class="form-group">
          <label for="rec-phone" class="form-label">{$t.address.recipient_phone} *</label>
          <input id="rec-phone" class="form-input" type="tel" placeholder="+237 6XX XXX XXX" bind:value={$booking.cameroon_address.recipient_phone} />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="cm-city" class="form-label">{$t.address.city} *</label>
          <select id="cm-city" class="form-select" bind:value={$booking.cameroon_address.city}>
            <option value="">Select city</option>
            {#each ['Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Garoua', 'Maroua', 'Ngaoundéré', 'Bertoua', 'Ebolowa', 'Kribi'] as city}
              <option value={city}>{city}</option>
            {/each}
          </select>
        </div>
        <div class="form-group">
          <label for="neighbourhood" class="form-label">{$t.address.neighbourhood}</label>
          <input id="neighbourhood" class="form-input" type="text" bind:value={$booking.cameroon_address.neighbourhood} />
        </div>
      </div>
      <div class="form-group">
        <label for="landmark" class="form-label">{$t.address.landmark}</label>
        <input id="landmark" class="form-input" type="text" placeholder={$t.address.landmark_hint} bind:value={$booking.cameroon_address.landmark} />
      </div>
      <div class="form-group">
        <label for="full-desc" class="form-label">{$t.address.full_description} *</label>
        <textarea id="full-desc" class="form-textarea" rows="3" placeholder={$t.address.full_description_hint} bind:value={$booking.cameroon_address.full_description}></textarea>
      </div>
    </div>

    {:else if step === 3}
    <div class="step-content">
      <h2 class="step-title">{$t.booking.your_info}</h2>
      <div class="form-group">
        <label for="full-name" class="form-label">{$t.booking.full_name} *</label>
        <input id="full-name" class="form-input" type="text" bind:value={$booking.client.full_name} />
      </div>
      <div class="form-group">
        <label for="email" class="form-label">{$t.booking.email} *</label>
        <input id="email" class="form-input" type="email" bind:value={$booking.client.email} />
      </div>
      <div class="form-group">
        <label for="phone" class="form-label">{$t.booking.phone} *</label>
        <input id="phone" class="form-input" type="tel" placeholder={$t.booking.phone_hint} bind:value={$booking.client.phone} />
      </div>
      <div class="form-group">
        <label class="form-label">{$t.booking.language}</label>
        <div class="lang-toggle-row">
          <button class="lang-btn" class:active={$booking.client.preferred_lang === 'en'}
            onclick={() => booking.update(b => ({ ...b, client: { ...b.client, preferred_lang: 'en' } }))}>English</button>
          <button class="lang-btn" class:active={$booking.client.preferred_lang === 'fr'}
            onclick={() => booking.update(b => ({ ...b, client: { ...b.client, preferred_lang: 'fr' } }))}>Français</button>
        </div>
        <p class="form-hint">WhatsApp messages will be sent in this language</p>
      </div>
      <div class="disclaimer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        {$t.confirm.disclaimer}
      </div>
    </div>
    {/if}

  </div>

  <div class="wizard-footer">
    {#if step < TOTAL_STEPS}
      <button class="btn-next" disabled={!canProceed()} onclick={next}>
        {$t.booking.next}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    {:else}
      <button class="btn-submit" disabled={!canProceed()} onclick={submitBooking}>
        {$t.booking.submit}
      </button>
    {/if}
  </div>
</div>

<style>
  .wizard { min-height: calc(100vh - 64px); display: flex; flex-direction: column; max-width: 600px; margin: 0 auto; padding: 0 1rem; }
  .wizard-progress { height: 3px; background: var(--gray-light); margin: 0 -1rem; }
  .progress-bar { height: 100%; background: var(--red); transition: width 0.3s ease; }
  .wizard-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; gap: 1rem; }
  .back-btn { display: flex; align-items: center; gap: 0.35rem; background: none; border: none; color: var(--gray); font-family: 'Barlow', sans-serif; font-size: 0.875rem; font-weight: 500; cursor: pointer; padding: 0.35rem 0; transition: color 0.15s; flex-shrink: 0; }
  .back-btn:hover { color: var(--red); }
  .step-label { font-weight: 600; font-size: 0.95rem; color: #1a1a1a; text-align: center; }
  .step-count { font-size: 0.8rem; color: var(--gray-mid); flex-shrink: 0; }
  .wizard-body { flex: 1; padding: 0.5rem 0 1rem; }
  .step-content { display: flex; flex-direction: column; gap: 1.25rem; }
  .step-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #1a1a1a; }
  .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-label { font-size: 0.875rem; font-weight: 600; color: #1a1a1a; }
  .form-input, .form-select, .form-textarea { width: 100%; padding: 0.75rem 1rem; border: 1.5px solid var(--gray-light); border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 0.95rem; color: #1a1a1a; background: #fff; transition: border-color 0.15s; appearance: none; }
  .form-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M0 0l6 8 6-8z' fill='%23646464'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem; }
  .form-input:focus, .form-select:focus, .form-textarea:focus { outline: none; border-color: var(--red); }
  .form-hint { font-size: 0.78rem; color: var(--gray-mid); }
  .form-textarea { resize: vertical; }
  .info-box { display: flex; gap: 0.6rem; align-items: flex-start; padding: 0.875rem 1rem; background: var(--red-light); border-radius: var(--radius); font-size: 0.85rem; color: var(--red-deeper); line-height: 1.5; border: 1px solid rgba(180,40,20,0.15); }
  .info-box svg { flex-shrink: 0; margin-top: 1px; color: var(--red); }
  .input-prefix-wrap { position: relative; display: flex; align-items: center; }
  .input-prefix { position: absolute; left: 1rem; font-size: 0.85rem; font-weight: 600; color: var(--gray); pointer-events: none; }
  .input-with-prefix { padding-left: 3rem; }
  .lang-toggle-row { display: flex; gap: 0.75rem; }
  .lang-btn { flex: 1; padding: 0.65rem; border: 1.5px solid var(--gray-light); border-radius: var(--radius); background: #fff; font-family: 'Barlow', sans-serif; font-size: 0.9rem; font-weight: 500; color: var(--gray); cursor: pointer; transition: all 0.15s; }
  .lang-btn:hover { border-color: var(--red); color: var(--red); }
  .lang-btn.active { border-color: var(--red); background: var(--red); color: #fff; font-weight: 600; }
  .disclaimer { display: flex; gap: 0.6rem; align-items: flex-start; padding: 1rem; background: #f0f7ff; border-radius: var(--radius); font-size: 0.85rem; color: var(--gray); line-height: 1.5; }
  .disclaimer svg { flex-shrink: 0; margin-top: 1px; color: #378add; }
  .wizard-footer { padding: 1rem 0 2rem; border-top: 1px solid var(--gray-light); }
  .btn-next, .btn-submit { width: 100%; padding: 1rem; border: none; border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 1rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background 0.15s, transform 0.1s; }
  .btn-next { background: var(--red); color: #fff; }
  .btn-next:hover:not(:disabled) { background: var(--red-dark); transform: translateY(-1px); }
  .btn-submit { background: #1a7c3e; color: #fff; }
  .btn-submit:hover:not(:disabled) { background: #155f2f; transform: translateY(-1px); }
  .btn-next:disabled, .btn-submit:disabled { background: var(--gray-light); color: var(--gray-mid); cursor: not-allowed; transform: none; }
  @media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
</style>
