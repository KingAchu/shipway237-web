<script lang="ts">
  import { lang } from '$lib/stores/lang';
  import { booking } from '$lib/stores/booking';
  import { goto } from '$app/navigation';
  import type { ServiceType } from '$lib/stores/booking';

  const WHATSAPP_URL = 'https://wa.me/1514XXXXXXX';

  function startBooking(type: ServiceType) {
    booking.update(b => ({ ...b, service_type: type }));
    goto(`/book/${type}`);
  }

  const services = [
    {
      type: 'vehicle' as ServiceType,
      emoji: '🚗',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
      title: { en: 'Vehicle shipping', fr: 'Expédition de véhicule' },
      sub: { en: 'Cars, trucks & SUVs', fr: 'Voitures, camions & SUV' },
      desc: {
        en: 'Ship any vehicle from Canada to Cameroon. We handle pickup from your door, port handling, and delivery to your family.',
        fr: 'Expédiez n\'importe quel véhicule du Canada vers le Cameroun. Nous gérons la collecte, la manutention portuaire et la livraison.',
      },
      features: {
        en: ['Any condition accepted', 'Runs, inoperable or parts', 'All makes & models', 'Insured transit'],
        fr: ['Tous états acceptés', 'Fonctionne, hors service ou pièces', 'Toutes marques & modèles', 'Transit assuré'],
      },
      color: '#B42814',
      time: { en: '6–10 weeks', fr: '6–10 semaines' },
    },
    {
      type: 'barrel' as ServiceType,
      emoji: '📦',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
      title: { en: 'Barrel shipping', fr: 'Expédition de fût' },
      sub: { en: 'Standard shipping barrels', fr: 'Fûts d\'expédition standard' },
      desc: {
        en: 'Pack your barrels at home. We pick them up and ship them safely to Cameroon. Available in 4 sizes.',
        fr: 'Emballez vos fûts chez vous. Nous les collectons et les expédions en toute sécurité au Cameroun. Disponible en 4 tailles.',
      },
      features: {
        en: ['4 barrel sizes available', '30, 55, 75 & 110 gal', 'Clothes, food & goods', 'Door-to-door delivery'],
        fr: ['4 tailles disponibles', '30, 55, 75 & 110 gal', 'Vêtements, nourriture & biens', 'Livraison porte à porte'],
      },
      color: '#1D6FB5',
      time: { en: '6–8 weeks', fr: '6–8 semaines' },
    },
    {
      type: 'procurement' as ServiceType,
      emoji: '🛒',
      image: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?w=800&q=80',
      title: { en: 'Buy for me', fr: 'Acheter pour moi' },
      sub: { en: 'Procurement & shipping', fr: 'Achat & expédition' },
      desc: {
        en: 'Need something from Canada? Send us the link or description, we buy it and ship it straight to your door in Cameroon.',
        fr: 'Besoin de quelque chose du Canada ? Envoyez-nous le lien ou la description, on l\'achète et l\'expédie directement chez vous au Cameroun.',
      },
      features: {
        en: ['Any item from Canada', 'Amazon, Best Buy & more', 'Pay in CFA francs', 'Fast processing'],
        fr: ['Tout article du Canada', 'Amazon, Best Buy & plus', 'Paiement en francs CFA', 'Traitement rapide'],
      },
      color: '#1a7c3e',
      time: { en: '3–6 weeks', fr: '3–6 semaines' },
    },
  ];
</script>

<svelte:head>
  <title>{$lang === 'fr' ? 'Réserver une expédition' : 'Book a shipment'} — Shipway237</title>
  <meta name="description" content="Book your shipment from Canada to Cameroon. Vehicle shipping, barrel shipping, or procurement services." />
</svelte:head>

<!-- Page hero -->
<section class="book-hero">
  <div class="hero-inner">
    <span class="hero-label">Cameroon ↔ Canada</span>
    <h1 class="hero-title">
      {$lang === 'fr' ? 'Que souhaitez-vous expédier ?' : 'What are you shipping?'}
    </h1>
    <p class="hero-sub">
      {$lang === 'fr'
        ? 'Choisissez votre service ci-dessous et réservez en moins de 5 minutes.'
        : 'Choose your service below and book in under 5 minutes.'}
    </p>
  </div>
</section>

<!-- Service cards -->
<section class="book-services">
  <div class="services-inner">
    {#each services as svc, i}
      <div class="svc-card" style="--accent: {svc.color}">
        <!-- Image -->
        <div class="svc-image">
          <img src={svc.image} alt={svc.title[$lang]} loading="lazy" />
          <div class="svc-image-overlay"></div>
          <div class="svc-badge">
            <span class="svc-emoji">{svc.emoji}</span>
            <span class="svc-time">⏱ {svc.time[$lang]}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="svc-content">
          <div class="svc-header">
            <div>
              <h2 class="svc-title">{svc.title[$lang]}</h2>
              <p class="svc-sub">{svc.sub[$lang]}</p>
            </div>
          </div>

          <p class="svc-desc">{svc.desc[$lang]}</p>

          <ul class="svc-features">
            {#each svc.features[$lang] as feat}
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {feat}
              </li>
            {/each}
          </ul>

          <button class="svc-btn" onclick={() => startBooking(svc.type)}>
            {$lang === 'fr' ? 'Réserver maintenant' : 'Book now'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- Bottom strip -->
<section class="book-footer-strip">
  <div class="strip-inner">
    <div class="strip-item">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
      <span>{$lang === 'fr' ? 'Devis sous 24h' : 'Quote within 24h'}</span>
    </div>
    <div class="strip-divider"></div>
    <div class="strip-item">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.14a16 16 0 006 6l1.41-1.41a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
      <span>{$lang === 'fr' ? 'Support WhatsApp 7j/7' : 'WhatsApp support 7 days'}</span>
    </div>
    <div class="strip-divider"></div>
    <div class="strip-item">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
      <span>{$lang === 'fr' ? 'Collecte à domicile' : 'Home pickup'}</span>
    </div>
    <div class="strip-divider"></div>
    <div class="strip-item">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <span>{$lang === 'fr' ? 'Expédition assurée' : 'Insured shipping'}</span>
    </div>
    <div class="strip-divider"></div>
    <a href={WHATSAPP_URL} target="_blank" class="strip-wa">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      {$lang === 'fr' ? 'Une question ? WhatsApp' : 'Questions? WhatsApp us'}
    </a>
  </div>
</section>

<style>
  /* Hero */
  .book-hero {
    background: #1a1a1a;
    padding: 3.5rem 1.5rem 3rem;
    text-align: center;
  }
  .hero-inner { max-width: 600px; margin: 0 auto; }
  .hero-label {
    display: inline-block;
    background: rgba(180,40,20,0.3);
    color: #ffb3a7;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 0.3rem 0.85rem;
    border-radius: 20px;
    margin-bottom: 1rem;
  }
  .hero-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(1.75rem, 5vw, 2.75rem);
    font-weight: 700;
    text-transform: uppercase;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 0.75rem;
  }
  .hero-sub { font-size: 0.95rem; color: #aaa; line-height: 1.6; }

  /* Services */
  .book-services { padding: 2.5rem 1.5rem 3rem; background: #f5f5f3; }
  .services-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* Card */
  .svc-card {
    background: #fff;
    border-radius: var(--radius-lg);
    border: 1.5px solid var(--gray-light);
    overflow: hidden;
    display: grid;
    grid-template-columns: 360px 1fr;
    transition: box-shadow 0.2s, border-color 0.2s;
  }
  .svc-card:hover {
    border-color: var(--accent);
    box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  }

  /* Image */
  .svc-image {
    position: relative;
    overflow: hidden;
    min-height: 280px;
  }
  .svc-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  .svc-card:hover .svc-image img { transform: scale(1.04); }
  .svc-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(0,0,0,0.3), transparent);
  }
  .svc-badge {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .svc-emoji {
    font-size: 2.5rem;
    line-height: 1;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  }
  .svc-time {
    background: rgba(0,0,0,0.6);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.6rem;
    border-radius: 20px;
    backdrop-filter: blur(4px);
    width: fit-content;
  }

  /* Content */
  .svc-content {
    padding: 2rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .svc-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
  .svc-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #1a1a1a;
    line-height: 1.1;
  }
  .svc-sub { font-size: 0.85rem; color: var(--gray-mid); margin-top: 0.2rem; }
  .svc-desc { font-size: 0.9rem; color: var(--gray); line-height: 1.7; }

  /* Features */
  .svc-features {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  .svc-features li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    color: #1a1a1a;
    font-weight: 500;
  }
  .svc-features li svg { color: var(--accent); flex-shrink: 0; }

  /* CTA button */
  .svc-btn {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.875rem 1.5rem;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    font-family: 'Barlow', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.1s;
  }
  .svc-btn:hover { opacity: 0.9; transform: translateY(-1px); }

  /* Bottom strip */
  .book-footer-strip {
    background: #1a1a1a;
    padding: 1.25rem 1.5rem;
  }
  .strip-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .strip-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    font-weight: 500;
    color: #999;
  }
  .strip-item svg { color: var(--red); flex-shrink: 0; }
  .strip-divider { width: 1px; height: 16px; background: rgba(255,255,255,0.1); }
  .strip-wa {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: #4ade80;
    text-decoration: none;
    transition: color 0.15s;
  }
  .strip-wa:hover { color: #86efac; }

  /* ── Mobile first ── */
  @media (max-width: 900px) {
    .svc-card { grid-template-columns: 1fr; }
    .svc-image { min-height: 220px; }
    .svc-image-overlay { background: linear-gradient(to top, rgba(0,0,0,0.4), transparent); }
    .svc-content { padding: 1.5rem; }
  }

  @media (max-width: 480px) {
    .svc-features { grid-template-columns: 1fr; }
    .strip-divider { display: none; }
    .strip-inner { justify-content: flex-start; gap: 1rem; }
  }
</style>
