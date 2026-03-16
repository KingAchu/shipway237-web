<script lang="ts">
  import { lang } from '$lib/stores/lang';
</script>

<svelte:head>
  <title>{$lang === 'fr' ? 'À propos' : 'About us'} — Shipway237</title>
  <meta name="description" content="Learn about Shipway237, founded by Leyou Gabin, serving the Cameroonian diaspora in Canada." />
</svelte:head>

<div class="about-page">

  <!-- Hero -->
  <section class="about-hero">
    <div class="hero-inner">
      <span class="hero-label">{$lang === 'fr' ? 'Notre histoire' : 'Our story'}</span>
      <h1 class="about-title">
        {$lang === 'fr' ? 'Nés de la diaspora,\npour la diaspora.' : 'Born from the diaspora,\nfor the diaspora.'}
      </h1>
      <p class="about-intro">
        {$lang === 'fr'
          ? 'Shipway237 a été fondé par Leyou Gabin, un entrepreneur camerounais établi au Canada avec une vision claire : rendre l\'expédition entre le Canada et le Cameroun fiable, transparente et accessible à toute la diaspora. Ayant lui-même vécu les frustrations des transporteurs peu fiables, des délais imprévisibles et des frais cachés, il a décidé de bâtir la solution qu\'il aurait voulu avoir.'
          : 'Shipway237 was founded by Leyou Gabin, a Cameroonian entrepreneur based in Canada with a clear vision: to make shipping between Canada and Cameroon reliable, transparent, and accessible to the entire diaspora. Having personally experienced the frustrations of unreliable carriers, unpredictable delays, and hidden fees, he decided to build the solution he wished had existed.'}
      </p>

      <div class="founder-card">
        <div class="founder-avatar">LG</div>
        <div class="founder-bio">
          <h3 class="founder-name">Leyou Gabin</h3>
          <span class="founder-role">{$lang === 'fr' ? 'Fondateur & Directeur général' : 'Founder & CEO'}</span>
          <p>
            {$lang === 'fr'
              ? 'Gabin est titulaire d\'un diplôme de l\'Université Catholique d\'Afrique Centrale (UCAC) à Yaoundé, au Cameroun, et d\'un MBA obtenu au Royaume-Uni. Il possède une solide expertise en finance internationale et cumule de nombreuses années d\'expérience en logistique et en expédition internationale. Résidant au Canada depuis plusieurs années, il comprend intimement les défis auxquels font face les familles camerounaises qui souhaitent maintenir des liens matériels avec leurs proches restés au pays. C\'est cette combinaison unique de formation académique rigoureuse, d\'expertise financière et de vécu de la diaspora qui a donné naissance à Shipway237 — une entreprise construite avec le cœur, gérée avec rigueur.'
              : 'Gabin holds a degree from the Catholic University of Central Africa (UCAC) in Yaoundé, Cameroon, and an MBA from the United Kingdom. He brings deep expertise in international finance and many years of hands-on experience in logistics and international shipping. A long-time Canadian resident, he intimately understands the challenges Cameroonian families face when trying to maintain material ties with loved ones back home. It is this unique combination of rigorous academic training, financial expertise, and lived diaspora experience that gave birth to Shipway237 — a company built with heart, managed with precision.'}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Mission / Vision / Values -->
  <section class="mission-section">
    <div class="page-inner">
      <div class="mission-grid">
        <div class="mission-card">
          <span class="mission-icon">🎯</span>
          <h3>{$lang === 'fr' ? 'Notre mission' : 'Our mission'}</h3>
          <p>{$lang === 'fr' ? 'Rendre l\'expédition entre le Canada et le Cameroun aussi simple qu\'un message WhatsApp. Fiable, transparent, et humain.' : 'Make shipping between Canada and Cameroon as simple as a WhatsApp message. Reliable, transparent, and human.'}</p>
        </div>
        <div class="mission-card">
          <span class="mission-icon">👁️</span>
          <h3>{$lang === 'fr' ? 'Notre vision' : 'Our vision'}</h3>
          <p>{$lang === 'fr' ? 'Devenir le partenaire logistique de référence pour la diaspora camerounaise et africaine au Canada.' : 'Become the go-to logistics partner for the Cameroonian and African diaspora in Canada.'}</p>
        </div>
        <div class="mission-card">
          <span class="mission-icon">💎</span>
          <h3>{$lang === 'fr' ? 'Nos valeurs' : 'Our values'}</h3>
          <p>{$lang === 'fr' ? 'Honnêteté, ponctualité, respect. Chaque colis est traité comme s\'il appartenait à notre propre famille.' : 'Honesty, punctuality, respect. Every shipment is handled as if it belonged to our own family.'}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Coverage -->
  <section class="coverage-section">
    <div class="page-inner">
      <div class="coverage-grid">
        <div class="coverage-side">
          <h2 class="coverage-title">{$lang === 'fr' ? '🇨🇦 Au Canada' : '🇨🇦 In Canada'}</h2>
          <p>{$lang === 'fr' ? 'Nous collectons vos marchandises directement chez vous dans toutes les grandes villes du Québec et de l\'Ontario, selon nos fenêtres de collecte planifiées.' : 'We pick up your goods directly from you in all major cities across Quebec and Ontario, based on our scheduled pickup windows.'}</p>
          <div class="coverage-cities">
            <span>Montréal</span><span>Toronto</span><span>Laval</span><span>Ottawa</span>
            <span>Mississauga</span><span>Brampton</span><span>Gatineau</span><span>+ more</span>
          </div>
        </div>
        <div class="coverage-divider"></div>
        <div class="coverage-side">
          <h2 class="coverage-title">{$lang === 'fr' ? '🇨🇲 Au Cameroun' : '🇨🇲 In Cameroon'}</h2>
          <p>{$lang === 'fr' ? 'Nous livrons à domicile dans toutes les grandes villes du Cameroun. Vous nous donnez une adresse, un point de repère, et nous nous occupons du reste.' : 'We deliver to the door in all major Cameroonian cities. You give us an address, a landmark, and we handle the rest.'}</p>
          <div class="coverage-cities">
            <span>Douala</span><span>Yaoundé</span><span>Bafoussam</span><span>Bamenda</span>
            <span>Garoua</span><span>Ngaoundéré</span><span>Kribi</span><span>+ more</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="about-cta">
    <div class="page-inner">
      <h2>{$lang === 'fr' ? 'Prêt à expédier ?' : 'Ready to ship?'}</h2>
      <p>{$lang === 'fr' ? 'Réservez en ligne en moins de 5 minutes.' : 'Book online in less than 5 minutes.'}</p>
      <div class="cta-btns">
        <a href="/book" class="btn-primary">{$lang === 'fr' ? 'Réserver maintenant' : 'Book now'}</a>
        <a href="/contact" class="btn-secondary">{$lang === 'fr' ? 'Nous contacter' : 'Contact us'}</a>
      </div>
    </div>
  </section>

</div>

<style>
  .page-inner { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }
  .about-hero { background: #1a1a1a; padding: 5rem 1.5rem 4rem; }
  .hero-inner { max-width: 760px; margin: 0 auto; }
  .hero-label { display: inline-block; background: rgba(180,40,20,0.3); color: #ffb3a7; font-size: 0.8rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 0.3rem 0.85rem; border-radius: 20px; margin-bottom: 1.25rem; }
  .about-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; text-transform: uppercase; color: #fff; line-height: 1.1; margin-bottom: 1.5rem; white-space: pre-line; }
  .about-intro { font-size: 1.05rem; color: #ccc; line-height: 1.8; margin-bottom: 2rem; }
  .founder-card { display: flex; gap: 1.5rem; align-items: flex-start; padding: 1.75rem; background: rgba(255,255,255,0.05); border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.1); }
  .founder-avatar { width: 64px; height: 64px; border-radius: 50%; background: var(--red); color: #fff; display: flex; align-items: center; justify-content: center; font-family: 'Barlow Condensed', sans-serif; font-size: 1.3rem; font-weight: 700; flex-shrink: 0; border: 2px solid rgba(255,255,255,0.15); }
  .founder-bio { display: flex; flex-direction: column; gap: 0.35rem; }
  .founder-name { font-family: 'Barlow Condensed', sans-serif; font-size: 1.2rem; font-weight: 700; text-transform: uppercase; color: #fff; margin: 0; }
  .founder-role { font-size: 0.75rem; color: #ffb3a7; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
  .founder-bio p { font-size: 0.875rem; color: #bbb; line-height: 1.8; margin-top: 0.25rem; }
  .mission-section { padding: 4rem 0; background: #f9f9f7; }
  .mission-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .mission-card { background: #fff; border-radius: var(--radius-lg); border: 1.5px solid var(--gray-light); padding: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
  .mission-icon { font-size: 2rem; }
  .mission-card h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; }
  .mission-card p { font-size: 0.875rem; color: var(--gray); line-height: 1.6; }
  .coverage-section { padding: 4rem 0; background: #fff; }
  .coverage-grid { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 3rem; align-items: start; }
  .coverage-divider { background: var(--gray-light); height: 100%; min-height: 200px; }
  .coverage-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.3rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; margin-bottom: 0.75rem; }
  .coverage-side p { font-size: 0.875rem; color: var(--gray); line-height: 1.7; margin-bottom: 1.25rem; }
  .coverage-cities { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .coverage-cities span { padding: 0.3rem 0.75rem; background: var(--red-light); color: var(--red-deeper); border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
  .about-cta { padding: 4rem 1.5rem; background: #1a1a1a; text-align: center; }
  .about-cta h2 { font-family: 'Barlow Condensed', sans-serif; font-size: 2rem; font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 0.5rem; }
  .about-cta p { color: #999; font-size: 1rem; margin-bottom: 2rem; }
  .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .btn-primary { background: var(--red); color: #fff; text-decoration: none; padding: 0.875rem 2rem; border-radius: var(--radius); font-weight: 600; font-size: 0.95rem; transition: background 0.15s; }
  .btn-primary:hover { background: var(--red-dark); }
  .btn-secondary { background: transparent; border: 1.5px solid rgba(255,255,255,0.2); color: #ccc; text-decoration: none; padding: 0.875rem 2rem; border-radius: var(--radius); font-weight: 600; font-size: 0.95rem; transition: all 0.15s; }
  .btn-secondary:hover { border-color: #fff; color: #fff; }
  @media (max-width: 768px) {
    .mission-grid { grid-template-columns: 1fr; }
    .coverage-grid { grid-template-columns: 1fr; }
    .coverage-divider { display: none; }
    .founder-card { flex-direction: column; }
  }
</style>