<script lang="ts">
  import { t } from '$lib/stores/lang';
  import { lang } from '$lib/stores/lang';
  import { booking } from '$lib/stores/booking';
  import { goto } from '$app/navigation';
  import type { ServiceType } from '$lib/stores/booking';

  const WHATSAPP_URL = 'https://wa.me/1514XXXXXXX';

  const services: { type: ServiceType; icon: string }[] = [
    { type: 'vehicle',     icon: '🚗' },
    { type: 'barrel',      icon: '📦' },
    { type: 'procurement', icon: '🛒' },
  ];

  function selectService(type: ServiceType) {
    booking.update(b => ({ ...b, service_type: type }));
    goto(`/book/${type}`);
  }

  const stats = [
    { value: '500+', label: { en: 'Shipments completed', fr: 'Expéditions réalisées' } },
    { value: '12+',  label: { en: 'Cities covered',      fr: 'Villes desservies' } },
    { value: '98%',  label: { en: 'On-time delivery',    fr: 'Livraison à temps' } },
    { value: '5★',   label: { en: 'Client satisfaction', fr: 'Satisfaction client' } },
  ];

  const reasons = [
    { icon: '🇨🇲', title: { en: 'We know Cameroon', fr: 'Nous connaissons le Cameroun' }, desc: { en: 'Born from the diaspora, we understand how goods move in Cameroon. No surprises at the port.', fr: 'Nés de la diaspora, nous savons comment les marchandises circulent au Cameroun. Pas de surprises au port.' } },
    { icon: '📱', title: { en: 'WhatsApp all the way', fr: 'WhatsApp du début à la fin' }, desc: { en: 'Every update, every quote, every confirmation — sent directly to your WhatsApp. No apps to download.', fr: 'Chaque mise à jour, chaque devis, chaque confirmation — directement sur WhatsApp. Aucune application à télécharger.' } },
    { icon: '🚪', title: { en: 'Door to door in Canada', fr: 'Porte à porte au Canada' }, desc: { en: 'We come to you in Montreal and Toronto. No need to drop off at a warehouse — we handle pickup.', fr: 'Nous venons vous trouver à Montréal et Toronto. Pas besoin de déposer en entrepôt.' } },
    { icon: '💳', title: { en: 'Flexible payments', fr: 'Paiements flexibles' }, desc: { en: 'Pay by card, Mobile Money, or Interac e-Transfer. We make it easy for both sides of the ocean.', fr: 'Payez par carte, Mobile Money ou virement Interac. Nous facilitons les choses des deux côtés de l\'océan.' } },
    { icon: '🛒', title: { en: 'We buy for you', fr: 'Nous achetons pour vous' }, desc: { en: 'Family in Cameroon wants something from Canada? Send us the link, we buy it and ship it directly.', fr: 'Votre famille au Cameroun veut quelque chose du Canada ? Envoyez-nous le lien, on l\'achète et l\'expédie.' } },
    { icon: '🔒', title: { en: 'Safe & insured', fr: 'Sécurisé & assuré' }, desc: { en: 'Your goods are handled with care and covered by insurance throughout the entire journey.', fr: 'Vos marchandises sont manipulées avec soin et couvertes par une assurance tout au long du trajet.' } },
  ];

  const testimonials = [
    { name: 'Marie-Claire N.', city: { en: 'Montréal', fr: 'Montréal' }, text: { en: 'I shipped my car to Douala and was amazed by how smooth the process was. I received WhatsApp updates at every step. My family picked it up without any issues.', fr: 'J\'ai expédié ma voiture à Douala et j\'ai été étonnée par la fluidité du processus. J\'ai reçu des mises à jour WhatsApp à chaque étape.' }, service: { en: 'Vehicle shipping', fr: 'Expédition véhicule' } },
    { name: 'Jean-Pierre T.', city: { en: 'Toronto', fr: 'Toronto' }, text: { en: 'Sent 3 barrels to my parents in Yaoundé for Christmas. The pickup was easy, they came right to my house. Everything arrived on time and in perfect condition.', fr: 'J\'ai envoyé 3 fûts à mes parents à Yaoundé pour Noël. La collecte était facile, ils sont venus directement chez moi. Tout est arrivé à temps.' }, service: { en: 'Barrel shipping', fr: 'Expédition fûts' } },
    { name: 'Solange M.', city: { en: 'Laval', fr: 'Laval' }, text: { en: 'My sister needed a laptop from Canada. Shipway237 bought it for me and shipped it to Douala. The whole process took 2 weeks and the price was very fair.', fr: 'Ma sœur avait besoin d\'un ordinateur portable du Canada. Shipway237 l\'a acheté pour moi et l\'a expédié à Douala en 2 semaines.' }, service: { en: 'Procurement', fr: 'Achat proxy' } },
  ];

  const faqs = [
    { q: { en: 'How long does shipping to Cameroon take?', fr: 'Combien de temps prend l\'expédition vers le Cameroun ?' }, a: { en: 'Typically 6 to 10 weeks for vehicles and barrels by sea freight. We will give you a more precise estimate when you book.', fr: 'En général 6 à 10 semaines pour les véhicules et les fûts par fret maritime.' } },
    { q: { en: 'How do I pay?', fr: 'Comment puis-je payer ?' }, a: { en: 'We accept Interac e-Transfer, credit/debit card via Stripe, and Mobile Money (MTN MoMo, Orange Money) via Flutterwave.', fr: 'Nous acceptons le virement Interac, la carte de crédit/débit via Stripe et le Mobile Money via Flutterwave.' } },
    { q: { en: 'Do you pick up anywhere in Quebec and Ontario?', fr: 'Faites-vous des collectes partout au Québec et en Ontario ?' }, a: { en: 'We serve most major cities in both provinces. Check available pickup dates in your city when you start a booking.', fr: 'Nous desservons la plupart des grandes villes des deux provinces. Vérifiez les dates de collecte disponibles lors de la réservation.' } },
    { q: { en: 'Can I ship a car that doesn\'t run?', fr: 'Puis-je expédier une voiture qui ne fonctionne pas ?' }, a: { en: 'Yes. We ship vehicles in any condition — running, inoperable, or parts only. Select the correct condition when booking.', fr: 'Oui. Nous expédions des véhicules dans tous états — en état de marche, hors service ou pièces seulement.' } },
    { q: { en: 'What can I put in a barrel?', fr: 'Que puis-je mettre dans un fût ?' }, a: { en: 'Most household goods, clothing, food items, and electronics are accepted. Prohibited items include flammables and weapons. When in doubt, ask us on WhatsApp.', fr: 'La plupart des articles ménagers, vêtements et électroniques sont acceptés. Les inflammables et armes sont interdits.' } },
  ];

  let openFaq = $state<number | null>(null);
  function toggleFaq(i: number) { openFaq = openFaq === i ? null : i; }
</script>

<svelte:head>
  <title>Shipway237 — Transport & Logistics | Cameroon ↔ Canada</title>
  <meta name="description" content="Reliable shipping from Montreal and Toronto to Cameroon. Cars, barrels, and procurement services for the Cameroonian diaspora in Canada." />
</svelte:head>

<!-- Hero -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-inner">
    <div class="hero-content">
      <span class="hero-label">{$t.home.hero_label}</span>
      <h1 class="hero-title">{$t.home.hero_title}</h1>
      <p class="hero-sub">{$t.home.hero_sub}</p>
      <div class="hero-ctas">
        <a href="/book/vehicle" class="btn-primary">{$t.home.cta_book}</a>
        <a href={WHATSAPP_URL} target="_blank" class="btn-whatsapp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {$t.home.cta_whatsapp}
        </a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-badge"><span class="badge-num">237</span><span class="badge-text">Cameroun</span></div>
      <div class="hero-route">
        <span class="route-city">Montréal</span><span class="route-arrow">✈</span>
        <span class="route-city">Toronto</span><span class="route-arrow">→</span>
        <span class="route-city">Douala</span>
      </div>
    </div>
  </div>
</section>

<!-- Trust strip -->
<section class="trust">
  <div class="trust-inner">
    <div class="trust-item"><span class="trust-icon">🇨🇦</span><span>Montreal & Toronto pickup</span></div>
    <div class="trust-divider"></div>
    <div class="trust-item"><span class="trust-icon">🇨🇲</span><span>Door-to-door in Cameroon</span></div>
    <div class="trust-divider"></div>
    <div class="trust-item"><span class="trust-icon">💬</span><span>WhatsApp updates</span></div>
    <div class="trust-divider"></div>
    <div class="trust-item"><span class="trust-icon">🔒</span><span>Secure payments</span></div>
  </div>
</section>

<!-- Services -->
<section class="services">
  <div class="section-inner">
    <h2 class="section-title">{$t.home.select_service}</h2>
    <div class="service-cards">
      {#each services as svc}
        <button class="service-card" onclick={() => selectService(svc.type)}>
          <span class="service-icon">{svc.icon}</span>
          <span class="service-name">{$t.services[svc.type]}</span>
          <span class="service-desc">{$t.services[`${svc.type}_desc`]}</span>
          <span class="service-arrow">→</span>
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- Stats -->
<section class="stats-section">
  <div class="section-inner">
    <div class="stats-grid">
      {#each stats as stat}
        <div class="stat-card">
          <span class="stat-value">{stat.value}</span>
          <span class="stat-label">{stat.label[$lang]}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Photo gallery -->
<section class="gallery-section">
  <div class="section-inner">
    <div class="section-header">
      <h2 class="section-title">{$lang === 'fr' ? 'Ce que nous expédions' : 'What we ship'}</h2>
      <p class="section-sub">{$lang === 'fr' ? 'Des véhicules aux colis, nous gérons tout avec soin.' : 'From vehicles to packages, we handle everything with care.'}</p>
    </div>
    <div class="gallery-grid">
      <div class="gallery-item gallery-tall">
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="Car shipping" loading="lazy" />
        <div class="gallery-label">{$lang === 'fr' ? 'Expédition de véhicules' : 'Vehicle shipping'}</div>
      </div>
      <div class="gallery-item">
        <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" alt="Cargo containers" loading="lazy" />
        <div class="gallery-label">{$lang === 'fr' ? 'Fret maritime' : 'Sea freight'}</div>
      </div>
      <div class="gallery-item">
        <img src="https://images.unsplash.com/photo-1601598851547-4302969d0614?w=600&q=80" alt="Packages" loading="lazy" />
        <div class="gallery-label">{$lang === 'fr' ? 'Fûts & colis' : 'Barrels & packages'}</div>
      </div>
      <div class="gallery-item gallery-wide">
        <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=900&q=80" alt="Port delivery" loading="lazy" />
        <div class="gallery-label">{$lang === 'fr' ? 'Livraison au Cameroun' : 'Delivery in Cameroon'}</div>
      </div>
    </div>
  </div>
</section>

<!-- Why choose us -->
<section class="why-section">
  <div class="section-inner">
    <div class="section-header">
      <h2 class="section-title">{$lang === 'fr' ? 'Pourquoi nous choisir ?' : 'Why choose Shipway237?'}</h2>
      <p class="section-sub">{$lang === 'fr' ? 'Nous sommes de la diaspora, pour la diaspora.' : 'Built by the diaspora, for the diaspora.'}</p>
    </div>
    <div class="why-grid">
      {#each reasons as r}
        <div class="why-card">
          <span class="why-icon">{r.icon}</span>
          <h3 class="why-title">{r.title[$lang]}</h3>
          <p class="why-desc">{r.desc[$lang]}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="testimonials-section">
  <div class="section-inner">
    <div class="section-header">
      <h2 class="section-title">{$lang === 'fr' ? 'Ce que disent nos clients' : 'What our clients say'}</h2>
      <p class="section-sub">{$lang === 'fr' ? 'Des centaines de familles nous font confiance chaque année.' : 'Hundreds of families trust us every year.'}</p>
    </div>
    <div class="testimonials-grid">
      {#each testimonials as tm}
        <div class="testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">"{tm.text[$lang]}"</p>
          <div class="testimonial-footer">
            <div class="testimonial-avatar">{tm.name[0]}</div>
            <div>
              <span class="testimonial-name">{tm.name}</span>
              <span class="testimonial-city">{tm.city[$lang]} · {tm.service[$lang]}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq-section">
  <div class="section-inner faq-inner">
    <div class="section-header">
      <h2 class="section-title">{$lang === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions'}</h2>
    </div>
    <div class="faq-list">
      {#each faqs as faq, i}
        <div class="faq-item" class:open={openFaq === i}>
          <button class="faq-question" onclick={() => toggleFaq(i)}>
            <span>{faq.q[$lang]}</span>
            <span class="faq-arrow">{openFaq === i ? '−' : '+'}</span>
          </button>
          {#if openFaq === i}
            <div class="faq-answer">{faq.a[$lang]}</div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA banner -->
<section class="cta-banner">
  <div class="section-inner">
    <h2 class="cta-title">{$lang === 'fr' ? 'Prêt à expédier ?' : 'Ready to ship?'}</h2>
    <p class="cta-sub">{$lang === 'fr' ? 'Réservez en ligne ou contactez-nous sur WhatsApp.' : 'Book online or reach us on WhatsApp.'}</p>
    <div class="cta-btns">
      <a href="/book/vehicle" class="btn-primary-light">{$t.home.cta_book}</a>
      <a href={WHATSAPP_URL} target="_blank" class="btn-whatsapp-outline">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
    </div>
  </div>
</section>

<style>
  .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
  .section-header { text-align: center; margin-bottom: 3rem; }
  .section-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #1a1a1a; margin-bottom: 0.5rem; }
  .section-sub { font-size: 1rem; color: var(--gray); }
  .hero { position: relative; overflow: hidden; background: #1a1a1a; color: #fff; padding: 5rem 1.5rem 4rem; }
  .hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #7A0F0F 0%, #1a1a1a 60%); opacity: 0.9; }
  .hero-inner { position: relative; max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 3rem; }
  .hero-content { max-width: 560px; }
  .hero-label { display: inline-block; background: rgba(180,40,20,0.4); border: 1px solid rgba(180,40,20,0.6); color: #ffb3a7; font-size: 0.8rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 0.3rem 0.85rem; border-radius: 20px; margin-bottom: 1.25rem; }
  .hero-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; line-height: 1.05; color: #fff; text-transform: uppercase; letter-spacing: -0.5px; margin-bottom: 1rem; }
  .hero-sub { font-size: 1.05rem; color: #ccc; line-height: 1.6; margin-bottom: 2rem; }
  .hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary { background: var(--red); color: #fff; text-decoration: none; padding: 0.875rem 2rem; border-radius: var(--radius); font-weight: 600; font-size: 0.95rem; transition: background 0.15s, transform 0.1s; display: inline-block; }
  .btn-primary:hover { background: var(--red-dark); transform: translateY(-1px); }
  .btn-whatsapp { background: #1a7c3e; color: #fff; text-decoration: none; padding: 0.875rem 1.5rem; border-radius: var(--radius); font-weight: 600; font-size: 0.95rem; display: inline-flex; align-items: center; gap: 0.5rem; transition: background 0.15s, transform 0.1s; }
  .btn-whatsapp:hover { background: #155f2f; transform: translateY(-1px); }
  .hero-visual { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
  .hero-badge { width: 120px; height: 120px; border-radius: 50%; background: var(--red); display: flex; flex-direction: column; align-items: center; justify-content: center; border: 4px solid rgba(255,255,255,0.15); }
  .badge-num { font-family: 'Barlow Condensed', sans-serif; font-size: 2.5rem; font-weight: 700; color: #fff; line-height: 1; }
  .badge-text { font-size: 0.7rem; color: rgba(255,255,255,0.8); letter-spacing: 1px; text-transform: uppercase; }
  .hero-route { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #999; }
  .route-city { color: #ccc; font-weight: 500; }
  .route-arrow { color: var(--red); }
  .trust { background: var(--red-light); border-top: 1px solid rgba(180,40,20,0.15); border-bottom: 1px solid rgba(180,40,20,0.15); padding: 1.25rem 1.5rem; }
  .trust-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
  .trust-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 500; color: var(--red-deeper); }
  .trust-icon { font-size: 1.1rem; }
  .trust-divider { width: 1px; height: 20px; background: rgba(180,40,20,0.25); }
  .services { padding: 4rem 0; background: #fff; }
  .service-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; }
  .service-card { background: #fff; border: 1.5px solid var(--gray-light); border-radius: var(--radius-lg); padding: 2rem 1.75rem; text-align: left; cursor: pointer; transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s; display: flex; flex-direction: column; gap: 0.5rem; font-family: 'Barlow', sans-serif; }
  .service-card:hover { border-color: var(--red); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(180,40,20,0.1); }
  .service-icon { font-size: 2rem; margin-bottom: 0.25rem; }
  .service-name { font-size: 1.2rem; font-weight: 700; color: #1a1a1a; font-family: 'Barlow Condensed', sans-serif; text-transform: uppercase; letter-spacing: 0.5px; }
  .service-desc { font-size: 0.875rem; color: var(--gray); line-height: 1.5; flex: 1; }
  .service-arrow { font-size: 1.25rem; color: var(--red); margin-top: 0.5rem; transition: transform 0.15s; }
  .service-card:hover .service-arrow { transform: translateX(4px); }
  .stats-section { padding: 3rem 0; background: #1a1a1a; }
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.08); border-radius: var(--radius-lg); overflow: hidden; }
  .stat-card { background: #1a1a1a; padding: 2rem 1.5rem; text-align: center; display: flex; flex-direction: column; gap: 0.4rem; }
  .stat-value { font-family: 'Barlow Condensed', sans-serif; font-size: 2.5rem; font-weight: 700; color: var(--red); line-height: 1; }
  .stat-label { font-size: 0.85rem; color: #999; font-weight: 500; }
  .gallery-section { padding: 4rem 0; background: #f9f9f7; }
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: 200px 200px; gap: 1rem; }
  .gallery-item { position: relative; border-radius: var(--radius-lg); overflow: hidden; }
  .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .gallery-item:hover img { transform: scale(1.04); }
  .gallery-tall { grid-row: span 2; }
  .gallery-wide { grid-column: span 2; }
  .gallery-label { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.7)); color: #fff; padding: 1.5rem 1rem 0.75rem; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .why-section { padding: 4rem 0; background: #fff; }
  .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .why-card { padding: 1.75rem; border: 1.5px solid var(--gray-light); border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: 0.75rem; transition: border-color 0.2s, box-shadow 0.2s; }
  .why-card:hover { border-color: rgba(180,40,20,0.3); box-shadow: 0 4px 16px rgba(180,40,20,0.06); }
  .why-icon { font-size: 2rem; }
  .why-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; }
  .why-desc { font-size: 0.875rem; color: var(--gray); line-height: 1.6; }
  .testimonials-section { padding: 4rem 0; background: var(--red-light); }
  .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .testimonial-card { background: #fff; border-radius: var(--radius-lg); padding: 1.75rem; display: flex; flex-direction: column; gap: 1rem; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
  .testimonial-stars { color: #F59E0B; font-size: 1rem; letter-spacing: 2px; }
  .testimonial-text { font-size: 0.9rem; color: #1a1a1a; line-height: 1.7; flex: 1; font-style: italic; }
  .testimonial-footer { display: flex; align-items: center; gap: 0.75rem; }
  .testimonial-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--red); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; flex-shrink: 0; }
  .testimonial-name { display: block; font-weight: 600; font-size: 0.875rem; color: #1a1a1a; }
  .testimonial-city { display: block; font-size: 0.78rem; color: var(--gray); }
  .faq-section { padding: 4rem 0; background: #fff; }
  .faq-inner { max-width: 720px; }
  .faq-list { display: flex; flex-direction: column; gap: 0; border: 1.5px solid var(--gray-light); border-radius: var(--radius-lg); overflow: hidden; }
  .faq-item { border-bottom: 1px solid var(--gray-light); }
  .faq-item:last-child { border-bottom: none; }
  .faq-question { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.25rem 1.5rem; background: #fff; border: none; font-family: 'Barlow', sans-serif; font-size: 0.95rem; font-weight: 600; color: #1a1a1a; cursor: pointer; text-align: left; transition: background 0.15s; }
  .faq-question:hover { background: #fafaf8; }
  .faq-item.open .faq-question { color: var(--red); background: var(--red-light); }
  .faq-arrow { font-size: 1.25rem; font-weight: 400; color: var(--red); flex-shrink: 0; }
  .faq-answer { padding: 0 1.5rem 1.25rem; font-size: 0.875rem; color: var(--gray); line-height: 1.7; background: #fff; }
  .cta-banner { padding: 4rem 1.5rem; background: #1a1a1a; text-align: center; }
  .cta-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 0.75rem; }
  .cta-sub { color: #999; font-size: 1rem; margin-bottom: 2rem; }
  .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .btn-primary-light { background: var(--red); color: #fff; text-decoration: none; padding: 0.875rem 2rem; border-radius: var(--radius); font-weight: 600; font-size: 0.95rem; transition: background 0.15s; }
  .btn-primary-light:hover { background: var(--red-dark); }
  .btn-whatsapp-outline { background: transparent; border: 1.5px solid #1a7c3e; color: #4ade80; text-decoration: none; padding: 0.875rem 1.5rem; border-radius: var(--radius); font-weight: 600; font-size: 0.95rem; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.15s; }
  .btn-whatsapp-outline:hover { background: #1a7c3e; color: #fff; }
  @media (max-width: 900px) { .why-grid { grid-template-columns: repeat(2, 1fr); } .testimonials-grid { grid-template-columns: repeat(2, 1fr); } .stats-grid { grid-template-columns: repeat(2, 1fr); } .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: 180px 180px 180px; } .gallery-tall { grid-row: span 1; } .gallery-wide { grid-column: span 2; } }
  @media (max-width: 640px) { .hero-visual { display: none; } .trust-divider { display: none; } .trust-inner { gap: 1rem; justify-content: flex-start; } .why-grid { grid-template-columns: 1fr; } .testimonials-grid { grid-template-columns: 1fr; } .stats-grid { grid-template-columns: repeat(2, 1fr); } .gallery-grid { grid-template-columns: 1fr; grid-template-rows: auto; } .gallery-tall, .gallery-wide { grid-row: span 1; grid-column: span 1; } .gallery-item { height: 200px; } }
</style>
