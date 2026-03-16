<script lang="ts">
  import { lang } from '$lib/stores/lang';

  const WHATSAPP_URL = 'https://wa.me/1514XXXXXXX';
  const WHATSAPP_NUMBER = '+1 (514) XXX-XXXX';
  const EMAIL = 'info@shipway237.com';
</script>

<svelte:head>
  <title>{$lang === 'fr' ? 'Contactez-nous' : 'Contact us'} — Shipway237</title>
  <meta name="description" content="Contact Shipway237 by WhatsApp, email or find our headquarters in Montreal." />
</svelte:head>

<div class="contact-page">
  <div class="contact-hero">
    <div class="hero-inner">
      <span class="hero-label">{$lang === 'fr' ? 'Nous joindre' : 'Get in touch'}</span>
      <h1 class="hero-title">{$lang === 'fr' ? 'Contactez-nous' : 'Contact us'}</h1>
      <p class="hero-sub">
        {$lang === 'fr'
          ? 'Nous sommes disponibles 7 jours sur 7. La façon la plus rapide de nous joindre est WhatsApp.'
          : 'We are available 7 days a week. The fastest way to reach us is WhatsApp.'}
      </p>
    </div>
  </div>

  <div class="contact-body">
    <div class="contact-grid">

      <!-- WhatsApp -->
      <div class="contact-card contact-primary">
        <div class="contact-icon contact-icon-wa">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </div>
        <h2>{$lang === 'fr' ? 'WhatsApp' : 'WhatsApp'}</h2>
        <p class="card-sub">{$lang === 'fr' ? 'La façon la plus rapide de nous joindre pour des devis, des questions ou un suivi de commande.' : 'The fastest way to reach us for quotes, questions, or order updates.'}</p>
        <a href={WHATSAPP_URL} target="_blank" class="contact-btn contact-btn-wa">
          {$lang === 'fr' ? 'Écrire sur WhatsApp' : 'Message us on WhatsApp'}
        </a>
        <span class="contact-detail">{WHATSAPP_NUMBER}</span>
      </div>

      <!-- Email -->
      <div class="contact-card">
        <div class="contact-icon contact-icon-email">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <h2>Email</h2>
        <p class="card-sub">{$lang === 'fr' ? 'Pour les demandes générales, les partenariats ou les questions administratives.' : 'For general inquiries, partnerships, or administrative questions.'}</p>
        <a href="mailto:{EMAIL}" class="contact-btn contact-btn-email">{EMAIL}</a>
        <span class="contact-detail">{$lang === 'fr' ? 'Réponse sous 24 heures' : 'Response within 24 hours'}</span>
      </div>

      <!-- HQ -->
      <div class="contact-card">
        <div class="contact-icon contact-icon-hq">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <h2>{$lang === 'fr' ? 'Siège social' : 'Headquarters'}</h2>
        <p class="card-sub">{$lang === 'fr' ? 'Basés à Montréal, nous desservons tout le Québec et l\'Ontario pour les collectes.' : 'Based in Montreal, we serve all of Quebec and Ontario for pickups.'}</p>
        <div class="hq-address">
          <strong>Shipway237 Transport & Logistics</strong>
          <span>Montréal, QC, Canada</span>
          <span class="hq-coverage">{$lang === 'fr' ? '📍 Collectes dans tout le QC & ON' : '📍 Pickups across QC & ON'}</span>
        </div>
      </div>

    </div>

    <!-- Hours -->
    <div class="hours-section">
      <h2 class="hours-title">{$lang === 'fr' ? 'Heures de service' : 'Service hours'}</h2>
      <div class="hours-grid">
        <div class="hours-row">
          <span>{$lang === 'fr' ? 'Lundi — Vendredi' : 'Monday — Friday'}</span>
          <span>8:00 AM — 8:00 PM</span>
        </div>
        <div class="hours-row">
          <span>{$lang === 'fr' ? 'Samedi' : 'Saturday'}</span>
          <span>9:00 AM — 6:00 PM</span>
        </div>
        <div class="hours-row">
          <span>{$lang === 'fr' ? 'Dimanche' : 'Sunday'}</span>
          <span>10:00 AM — 4:00 PM</span>
        </div>
      </div>
      <p class="hours-note">
        ⚡ {$lang === 'fr'
          ? 'WhatsApp est surveillé en dehors des heures de bureau pour les urgences.'
          : 'WhatsApp is monitored outside business hours for urgent matters.'}
      </p>
    </div>
  </div>
</div>

<style>
  .contact-hero { background: #1a1a1a; padding: 4rem 1.5rem 3.5rem; }
  .hero-inner { max-width: 680px; margin: 0 auto; }
  .hero-label { display: inline-block; background: rgba(180,40,20,0.3); color: #ffb3a7; font-size: 0.8rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 0.3rem 0.85rem; border-radius: 20px; margin-bottom: 1rem; }
  .hero-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 0.75rem; }
  .hero-sub { font-size: 1rem; color: #ccc; line-height: 1.7; }
  .contact-body { max-width: 1100px; margin: 0 auto; padding: 3rem 1.5rem 4rem; }
  .contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 3rem; }
  .contact-card { border: 1.5px solid var(--gray-light); border-radius: var(--radius-lg); padding: 2rem; display: flex; flex-direction: column; gap: 0.875rem; }
  .contact-primary { border-color: rgba(26,124,62,0.3); background: #f0fff6; }
  .contact-icon { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
  .contact-icon-wa { background: #e8f5ed; color: #1a7c3e; }
  .contact-icon-email { background: #eff6ff; color: #2563eb; }
  .contact-icon-hq { background: var(--red-light); color: var(--red); }
  .contact-card h2 { font-family: 'Barlow Condensed', sans-serif; font-size: 1.2rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; }
  .card-sub { font-size: 0.875rem; color: var(--gray); line-height: 1.6; flex: 1; }
  .contact-btn { display: inline-block; padding: 0.7rem 1.25rem; border-radius: var(--radius); font-weight: 600; font-size: 0.875rem; text-decoration: none; text-align: center; transition: all 0.15s; }
  .contact-btn-wa { background: #1a7c3e; color: #fff; }
  .contact-btn-wa:hover { background: #155f2f; }
  .contact-btn-email { background: #1a1a1a; color: #fff; }
  .contact-btn-email:hover { background: #333; }
  .contact-detail { font-size: 0.8rem; color: var(--gray-mid); }
  .hq-address { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; }
  .hq-address strong { color: #1a1a1a; }
  .hq-address span { color: var(--gray); }
  .hq-coverage { color: var(--red) !important; font-weight: 500; font-size: 0.82rem; }
  .hours-section { background: #f9f9f7; border-radius: var(--radius-lg); border: 1.5px solid var(--gray-light); padding: 2rem; max-width: 500px; }
  .hours-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; margin-bottom: 1.25rem; }
  .hours-grid { display: flex; flex-direction: column; gap: 0; }
  .hours-row { display: flex; justify-content: space-between; font-size: 0.875rem; padding: 0.75rem 0; border-bottom: 0.5px solid var(--gray-light); }
  .hours-row:last-child { border-bottom: none; }
  .hours-row span:first-child { color: var(--gray); }
  .hours-row span:last-child { font-weight: 600; color: #1a1a1a; }
  .hours-note { margin-top: 1rem; font-size: 0.8rem; color: var(--gray-mid); line-height: 1.5; }
  @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }
</style>
