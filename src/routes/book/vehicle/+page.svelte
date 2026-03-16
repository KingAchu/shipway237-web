<script lang="ts">
  import { t } from '$lib/stores/lang';
  import { booking } from '$lib/stores/booking';
  import { goto } from '$app/navigation';
  import { getYears, getMakes, getModels } from '$lib/api/vehicles';
  import { getAvailableSchedules } from '$lib/api/schedules';

  let step = $state(1);
  const TOTAL_STEPS = 4;

  function next() { if (step < TOTAL_STEPS) step++; }
  function back() { if (step > 1) step--; else goto('/'); }

  // Step 1
  let years: number[] = $state([]);
  let makes: string[] = $state([]);
  let models: string[] = $state([]);
  let loadingMakes = $state(false);
  let loadingModels = $state(false);
  let showMakeFreetext = $state(false);
  let showModelFreetext = $state(false);
  let selectedYear = $state('');
  let selectedMake = $state('');
  let selectedModel = $state('');

  $effect(() => {
    getYears().then(y => { years = y; });
  });

  async function onYearChange() {
    const year = parseInt(selectedYear);
    booking.update(b => ({ ...b, vehicle: { ...b.vehicle, vehicle_year: year || null, vehicle_make: '', vehicle_model: '' } }));
    makes = [];
    models = [];
    selectedMake = '';
    selectedModel = '';
    showMakeFreetext = false;
    showModelFreetext = false;
    if (year) {
      loadingMakes = true;
      makes = await getMakes(year);
      loadingMakes = false;
    }
  }

  async function onMakeChange() {
    if (selectedMake === '__other__') {
      showMakeFreetext = true;
      booking.update(b => ({ ...b, vehicle: { ...b.vehicle, vehicle_make: '' } }));
      return;
    }
    showMakeFreetext = false;
    booking.update(b => ({ ...b, vehicle: { ...b.vehicle, vehicle_make: selectedMake, vehicle_model: '' } }));
    models = [];
    selectedModel = '';
    showModelFreetext = false;
    if (selectedMake && $booking.vehicle.vehicle_year) {
      loadingModels = true;
      models = await getModels($booking.vehicle.vehicle_year, selectedMake);
      loadingModels = false;
    }
  }

  function onModelChange() {
    if (selectedModel === '__other__') {
      showModelFreetext = true;
      booking.update(b => ({ ...b, vehicle: { ...b.vehicle, vehicle_model: '' } }));
      return;
    }
    showModelFreetext = false;
    booking.update(b => ({ ...b, vehicle: { ...b.vehicle, vehicle_model: selectedModel } }));
  }

  // Step 2
  const QC_CITIES = ['Montréal', 'Laval', 'Longueuil', 'Québec City', 'Gatineau', 'Sherbrooke', 'Trois-Rivières', 'Saguenay', 'Lévis', 'Terrebonne'];
  const ON_CITIES = ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'London', 'Markham', 'Vaughan', 'Kitchener', 'Windsor'];

  let schedules: any[] = $state([]);
  let loadingSchedules = $state(false);
  let selectedCity = $state('');
  let showOtherCity = $state(false);
  let otherCityValue = $state('');

  async function onCityChange(city: string) {
    selectedCity = city;
    booking.update(b => ({ ...b, pickup_city: city, pickup_schedule_id: '' }));
    schedules = [];
    if (city) {
      loadingSchedules = true;
      try { schedules = await getAvailableSchedules(city); }
      catch { schedules = []; }
      loadingSchedules = false;
    }
  }

  const WHATSAPP_URL = 'https://wa.me/1514XXXXXXX';

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function canProceed(): boolean {
    const v = $booking.vehicle;
    const b = $booking;
    if (step === 1) return !!(v.vehicle_year && (v.vehicle_make || v.vehicle_freetext) && (v.vehicle_model || v.vehicle_freetext) && v.condition);
    if (step === 2) return !!b.pickup_schedule_id || (!!b.pickup_city && schedules.length === 0 && !loadingSchedules);
    if (step === 3) { const a = b.cameroon_address; return !!(a.recipient_name && a.recipient_phone && a.city && a.full_description); }
    if (step === 4) { const c = b.client; return !!(c.full_name && c.email && c.phone); }
    return true;
  }

  async function submitBooking() {
    const b = $booking;
    const payload = {
      service_type: 'vehicle',
      pickup_schedule_id: b.pickup_schedule_id,
      preferred_lang: b.client.preferred_lang,
      client: b.client,
      cameroon_address: b.cameroon_address,
      vehicle: { ...b.vehicle, vehicle_make: b.vehicle.vehicle_make || b.vehicle.vehicle_freetext, vehicle_model: b.vehicle.vehicle_model || b.vehicle.vehicle_freetext },
    };
    try {
      const { submitOrder } = await import('$lib/api/orders');
      const result = await submitOrder(payload);
      booking.update(bk => ({ ...bk, reference_no: result.reference_no, order_id: result.order_id }));
      goto('/book/success');
    } catch { alert($t.errors.generic); }
  }
</script>

<svelte:head><title>Book Vehicle Shipment — Shipway237</title></svelte:head>

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
      {#if step === 1}{$t.vehicle.title}
      {:else if step === 2}{$t.booking.pickup_date}
      {:else if step === 3}{$t.address.title}
      {:else}{$t.booking.your_info}
      {/if}
    </span>
    <span class="step-count">{step} / {TOTAL_STEPS}</span>
  </div>

  <div class="wizard-body">

    {#if step === 1}
    <div class="step-content">
      <h2 class="step-title">{$t.vehicle.title}</h2>

      <div class="form-row">
        <div class="form-group">
          <label for="year" class="form-label">{$t.vehicle.year} *</label>
          <select id="year" class="form-select" bind:value={selectedYear} onchange={onYearChange}>
            <option value="">{$t.vehicle.select_year}</option>
            {#each years as y}
              <option value={y}>{y}</option>
            {/each}
          </select>
        </div>

        <div class="form-group">
          <label for="make" class="form-label">{$t.vehicle.make} *</label>
          {#if showMakeFreetext}
            <input id="make" class="form-input" type="text" placeholder="Type make..." bind:value={$booking.vehicle.vehicle_freetext} />
          {:else}
            <select id="make" class="form-select" disabled={!selectedYear || loadingMakes} bind:value={selectedMake} onchange={onMakeChange}>
              <option value="">{loadingMakes ? $t.vehicle.loading_makes : $t.vehicle.select_make}</option>
              {#each makes as m}<option value={m}>{m}</option>{/each}
              <option value="__other__">{$t.vehicle.other_make}</option>
            </select>
          {/if}
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="model" class="form-label">{$t.vehicle.model} *</label>
          {#if showModelFreetext}
            <input id="model" class="form-input" type="text" placeholder="Type model..." bind:value={$booking.vehicle.vehicle_freetext} />
          {:else}
            <select id="model" class="form-select" disabled={!selectedMake || loadingModels} bind:value={selectedModel} onchange={onModelChange}>
              <option value="">{loadingModels ? $t.vehicle.loading_models : $t.vehicle.select_model}</option>
              {#each models as m}<option value={m}>{m}</option>{/each}
              <option value="__other__">{$t.vehicle.other_model}</option>
            </select>
          {/if}
        </div>

        <div class="form-group">
          <label for="trim" class="form-label">{$t.vehicle.trim}</label>
          <input id="trim" class="form-input" type="text" placeholder="e.g. SE, LX, Sport" bind:value={$booking.vehicle.vehicle_trim} />
        </div>
      </div>

      <div class="form-group">
        <label for="vin" class="form-label">{$t.vehicle.vin}</label>
        <input id="vin" class="form-input" type="text" placeholder="17-character VIN" bind:value={$booking.vehicle.vin} />
      </div>

      <div class="form-group">
        <label class="form-label">{$t.vehicle.condition} *</label>
        <div class="condition-grid">
          {#each [{ val: 'runs', label: $t.vehicle.condition_runs }, { val: 'inoperable', label: $t.vehicle.condition_inop }, { val: 'parts', label: $t.vehicle.condition_parts }] as c}
            <button class="condition-btn" class:active={$booking.vehicle.condition === c.val}
              onclick={() => booking.update(b => ({ ...b, vehicle: { ...b.vehicle, condition: c.val as any } }))}>
              {c.label}
            </button>
          {/each}
        </div>
      </div>
    </div>

    {:else if step === 2}
    <div class="step-content">
      <h2 class="step-title">{$t.booking.origin_city}</h2>
      <div class="form-group">
        <div class="city-section">
          <p class="city-province">Québec</p>
          <div class="city-grid">
            {#each QC_CITIES as city}
              <button class="city-btn" class:active={selectedCity === city && !showOtherCity}
                onclick={() => { showOtherCity = false; otherCityValue = ''; onCityChange(city); }}>{city}</button>
            {/each}
          </div>
          <p class="city-province">Ontario</p>
          <div class="city-grid">
            {#each ON_CITIES as city}
              <button class="city-btn" class:active={selectedCity === city && !showOtherCity}
                onclick={() => { showOtherCity = false; otherCityValue = ''; onCityChange(city); }}>{city}</button>
            {/each}
          </div>

          {#if !showOtherCity}
            <button class="city-btn city-btn-other"
              onclick={() => { showOtherCity = true; selectedCity = ''; booking.update(b => ({ ...b, pickup_city: '', pickup_schedule_id: '' })); schedules = []; }}>
              My city is not listed
            </button>
          {:else}
            <div class="other-city-input">
              <label for="other-city" class="form-label">Enter your city *</label>
              <input
                id="other-city"
                class="form-input"
                type="text"
                placeholder="e.g. Québec City, Barrie, Kingston..."
                bind:value={otherCityValue}
                oninput={() => { if (otherCityValue.length > 1) onCityChange(otherCityValue); }}
              />
              <p class="form-hint">Type your city and we will check for available pickup dates.</p>
            </div>
          {/if}
        </div>
      </div>

      {#if selectedCity}
      <div class="form-group">
        <label class="form-label">{$t.booking.pickup_date} *</label>
        {#if loadingSchedules}
          <p class="loading-text">Loading available dates...</p>
        {:else if schedules.length === 0}
          <div class="no-dates">
            <p>{$t.booking.no_dates_available}</p>
            <a href={WHATSAPP_URL} target="_blank" class="wa-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {$t.booking.no_dates_whatsapp}
            </a>
          </div>
        {:else}
          <div class="schedule-list">
            {#each schedules as s}
              <button class="schedule-card" class:active={$booking.pickup_schedule_id === s.id}
                onclick={() => booking.update(b => ({ ...b, pickup_schedule_id: s.id }))}>
                <span class="schedule-dates">{formatDate(s.date_from)} — {formatDate(s.date_to)}</span>
                {#if s.notes}<span class="schedule-notes">{s.notes}</span>{/if}
              </button>
            {/each}
          </div>
        {/if}
      </div>
      {/if}
    </div>

    {:else if step === 3}
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

    {:else if step === 4}
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
  .form-select:disabled { background-color: #f5f5f5; color: var(--gray-mid); cursor: not-allowed; }
  .form-hint { font-size: 0.78rem; color: var(--gray-mid); }
  .form-textarea { resize: vertical; }
  .condition-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
  .condition-btn { padding: 0.75rem 0.5rem; border: 1.5px solid var(--gray-light); border-radius: var(--radius); background: #fff; font-family: 'Barlow', sans-serif; font-size: 0.8rem; font-weight: 500; color: var(--gray); cursor: pointer; transition: all 0.15s; text-align: center; }
  .condition-btn:hover { border-color: var(--red); color: var(--red); }
  .condition-btn.active { border-color: var(--red); background: var(--red-light); color: var(--red-deeper); font-weight: 600; }
  .city-section { display: flex; flex-direction: column; gap: 0.75rem; }
  .city-province { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--gray-mid); }
  .city-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .city-btn { padding: 0.45rem 0.85rem; border: 1.5px solid var(--gray-light); border-radius: 20px; background: #fff; font-family: 'Barlow', sans-serif; font-size: 0.85rem; font-weight: 500; color: var(--gray); cursor: pointer; transition: all 0.15s; }
  .city-btn:hover { border-color: var(--red); color: var(--red); }
  .city-btn.active { border-color: var(--red); background: var(--red); color: #fff; }
  .city-btn-other { border-style: dashed; color: var(--gray-mid); margin-top: 0.25rem; }
  .city-btn-other:hover { border-color: var(--red); border-style: dashed; color: var(--red); }
  .other-city-input { display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.5rem; }
  .schedule-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .schedule-card { padding: 1rem 1.25rem; border: 1.5px solid var(--gray-light); border-radius: var(--radius); background: #fff; text-align: left; cursor: pointer; font-family: 'Barlow', sans-serif; transition: all 0.15s; display: flex; flex-direction: column; gap: 0.25rem; }
  .schedule-card:hover { border-color: var(--red); }
  .schedule-card.active { border-color: var(--red); background: var(--red-light); }
  .schedule-dates { font-weight: 600; font-size: 0.95rem; color: #1a1a1a; }
  .schedule-notes { font-size: 0.8rem; color: var(--gray); }
  .no-dates { padding: 1.5rem; background: #fff8f0; border: 1.5px solid #ffd0b0; border-radius: var(--radius); display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem; color: var(--gray); }
  .wa-link { display: inline-flex; align-items: center; gap: 0.4rem; color: #1a7c3e; font-weight: 600; text-decoration: none; font-size: 0.875rem; }
  .loading-text { color: var(--gray-mid); font-size: 0.9rem; }
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
  @media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } .condition-grid { grid-template-columns: 1fr 1fr; } }
</style>
