<script lang="ts">
  import { lang } from '$lib/stores/lang';
</script>

<svelte:head>
  <title>{$lang === 'fr' ? 'Politique de confidentialité' : 'Privacy policy'} — Shipway237</title>
  <meta name="description" content="Shipway237 privacy policy — how we collect, use and protect your personal information." />
</svelte:head>

<div class="privacy-page">
  <div class="privacy-hero">
    <div class="hero-inner">
      <span class="hero-label">{$lang === 'fr' ? 'Légal' : 'Legal'}</span>
      <h1 class="hero-title">{$lang === 'fr' ? 'Politique de confidentialité' : 'Privacy policy'}</h1>
      <p class="hero-date">{$lang === 'fr' ? 'Dernière mise à jour : Mars 2026' : 'Last updated: March 2026'}</p>
    </div>
  </div>

  <div class="privacy-body">
    <div class="privacy-intro">
      <p>
        {$lang === 'fr'
          ? 'Shipway237 Transport & Logistics (« nous », « notre ») s\'engage à protéger la vie privée des personnes qui utilisent nos services. Cette politique explique comment nous collectons, utilisons et protégeons vos informations personnelles conformément à la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE) du Canada.'
          : 'Shipway237 Transport & Logistics ("we", "our") is committed to protecting the privacy of individuals who use our services. This policy explains how we collect, use, and protect your personal information in accordance with Canada\'s Personal Information Protection and Electronic Documents Act (PIPEDA).'}
      </p>
    </div>

    <div class="privacy-sections">

      <div class="privacy-section">
        <h2>{$lang === 'fr' ? '1. Informations que nous collectons' : '1. Information we collect'}</h2>
        <p>{$lang === 'fr'
          ? 'Lorsque vous effectuez une réservation sur notre site, nous collectons les informations suivantes :'
          : 'When you make a booking on our site, we collect the following information:'}</p>
        <ul>
          <li>{$lang === 'fr' ? 'Nom complet' : 'Full name'}</li>
          <li>{$lang === 'fr' ? 'Adresse e-mail' : 'Email address'}</li>
          <li>{$lang === 'fr' ? 'Numéro de téléphone' : 'Phone number'}</li>
          <li>{$lang === 'fr' ? 'Ville d\'origine (pour la collecte)' : 'Origin city (for pickup)'}</li>
          <li>{$lang === 'fr' ? 'Adresse de livraison au Cameroun' : 'Delivery address in Cameroon'}</li>
          <li>{$lang === 'fr' ? 'Détails de l\'expédition (véhicule, fûts, articles d\'achat)' : 'Shipment details (vehicle, barrels, procurement items)'}</li>
        </ul>
        <p>{$lang === 'fr'
          ? 'Nous ne collectons pas de données de paiement directement. Les paiements sont traités par Stripe (carte) et Flutterwave (Mobile Money), qui ont leurs propres politiques de confidentialité.'
          : 'We do not directly collect payment data. Payments are processed by Stripe (card) and Flutterwave (Mobile Money), which have their own privacy policies.'}</p>
      </div>

      <div class="privacy-section">
        <h2>{$lang === 'fr' ? '2. Comment nous utilisons vos informations' : '2. How we use your information'}</h2>
        <p>{$lang === 'fr' ? 'Vos informations sont utilisées exclusivement pour :' : 'Your information is used exclusively to:'}</p>
        <ul>
          <li>{$lang === 'fr' ? 'Traiter et gérer votre commande d\'expédition' : 'Process and manage your shipping order'}</li>
          <li>{$lang === 'fr' ? 'Vous contacter via WhatsApp ou e-mail concernant votre commande' : 'Contact you via WhatsApp or email regarding your order'}</li>
          <li>{$lang === 'fr' ? 'Envoyer des devis et liens de paiement' : 'Send quotes and payment links'}</li>
          <li>{$lang === 'fr' ? 'Coordonner la collecte et la livraison' : 'Coordinate pickup and delivery'}</li>
          <li>{$lang === 'fr' ? 'Améliorer nos services' : 'Improve our services'}</li>
        </ul>
        <p>{$lang === 'fr'
          ? 'Nous ne vendons, ne louons ni ne partageons vos informations personnelles avec des tiers à des fins commerciales.'
          : 'We do not sell, rent, or share your personal information with third parties for commercial purposes.'}</p>
      </div>

      <div class="privacy-section">
        <h2>{$lang === 'fr' ? '3. Stockage et sécurité' : '3. Storage and security'}</h2>
        <p>{$lang === 'fr'
          ? 'Vos données sont stockées de manière sécurisée via Supabase, hébergé sur des serveurs en Amérique du Nord. Toutes les communications entre votre navigateur et notre site sont chiffrées via HTTPS. Nous conservons vos données aussi longtemps que nécessaire pour fournir nos services et nous conformer aux exigences légales.'
          : 'Your data is stored securely via Supabase, hosted on servers in North America. All communications between your browser and our site are encrypted via HTTPS. We retain your data for as long as necessary to provide our services and comply with legal requirements.'}</p>
      </div>

      <div class="privacy-section">
        <h2>{$lang === 'fr' ? '4. Partage des données' : '4. Data sharing'}</h2>
        <p>{$lang === 'fr'
          ? 'Nous ne partageons vos données qu\'avec les prestataires de services nécessaires au traitement de votre commande :'
          : 'We only share your data with service providers necessary to process your order:'}</p>
        <ul>
          <li><strong>Twilio</strong> — {$lang === 'fr' ? 'pour l\'envoi de messages WhatsApp' : 'for sending WhatsApp messages'}</li>
          <li><strong>Stripe</strong> — {$lang === 'fr' ? 'pour le traitement des paiements par carte' : 'for card payment processing'}</li>
          <li><strong>Flutterwave</strong> — {$lang === 'fr' ? 'pour le traitement des paiements Mobile Money' : 'for Mobile Money payment processing'}</li>
        </ul>
        <p>{$lang === 'fr'
          ? 'Ces prestataires ne sont autorisés à utiliser vos données que dans la mesure nécessaire pour fournir leurs services respectifs.'
          : 'These providers are only authorized to use your data to the extent necessary to provide their respective services.'}</p>
      </div>

      <div class="privacy-section">
        <h2>{$lang === 'fr' ? '5. Vos droits (LPRPDE)' : '5. Your rights (PIPEDA)'}</h2>
        <p>{$lang === 'fr'
          ? 'Conformément à la LPRPDE, vous avez le droit de :'
          : 'In accordance with PIPEDA, you have the right to:'}</p>
        <ul>
          <li>{$lang === 'fr' ? 'Accéder à vos informations personnelles que nous détenons' : 'Access the personal information we hold about you'}</li>
          <li>{$lang === 'fr' ? 'Corriger toute inexactitude dans vos informations' : 'Correct any inaccuracies in your information'}</li>
          <li>{$lang === 'fr' ? 'Demander la suppression de vos données' : 'Request deletion of your data'}</li>
          <li>{$lang === 'fr' ? 'Retirer votre consentement à tout moment' : 'Withdraw your consent at any time'}</li>
        </ul>
        <p>{$lang === 'fr'
          ? 'Pour exercer ces droits, contactez-nous à info@shipway237.com. Nous répondrons dans les 30 jours.'
          : 'To exercise these rights, contact us at info@shipway237.com. We will respond within 30 days.'}</p>
      </div>

      <div class="privacy-section">
        <h2>{$lang === 'fr' ? '6. Modifications de cette politique' : '6. Changes to this policy'}</h2>
        <p>{$lang === 'fr'
          ? 'Nous pouvons mettre à jour cette politique de temps à autre. Toute modification importante sera communiquée via notre site web. Nous vous encourageons à consulter cette page périodiquement.'
          : 'We may update this policy from time to time. Any significant changes will be communicated via our website. We encourage you to review this page periodically.'}</p>
      </div>

      <div class="privacy-section">
        <h2>{$lang === 'fr' ? '7. Nous contacter' : '7. Contact us'}</h2>
        <p>{$lang === 'fr'
          ? 'Pour toute question concernant cette politique de confidentialité ou la gestion de vos données personnelles, contactez-nous :'
          : 'For any questions about this privacy policy or how we handle your personal data, contact us:'}</p>
        <div class="contact-info">
          <p><strong>Shipway237 Transport & Logistics</strong></p>
          <p>📧 info@shipway237.com</p>
          <p>💬 <a href="https://wa.me/1514XXXXXXX" target="_blank">WhatsApp</a></p>
          <p>📍 Montréal, QC, Canada</p>
        </div>
      </div>

    </div>
  </div>
</div>

<style>
  .privacy-hero { background: #1a1a1a; padding: 4rem 1.5rem 3rem; }
  .hero-inner { max-width: 760px; margin: 0 auto; }
  .hero-label { display: inline-block; background: rgba(180,40,20,0.3); color: #ffb3a7; font-size: 0.8rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 0.3rem 0.85rem; border-radius: 20px; margin-bottom: 1rem; }
  .hero-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 0.5rem; }
  .hero-date { font-size: 0.85rem; color: #888; }
  .privacy-body { max-width: 760px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
  .privacy-intro { background: var(--red-light); border-left: 4px solid var(--red); border-radius: 0 var(--radius) var(--radius) 0; padding: 1.25rem 1.5rem; margin-bottom: 2.5rem; font-size: 0.9rem; color: #1a1a1a; line-height: 1.7; }
  .privacy-sections { display: flex; flex-direction: column; gap: 2.5rem; }
  .privacy-section { padding-bottom: 2.5rem; border-bottom: 1px solid var(--gray-light); }
  .privacy-section:last-child { border-bottom: none; padding-bottom: 0; }
  .privacy-section h2 { font-family: 'Barlow Condensed', sans-serif; font-size: 1.2rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; margin-bottom: 1rem; }
  .privacy-section p { font-size: 0.9rem; color: var(--gray); line-height: 1.8; margin-bottom: 0.75rem; }
  .privacy-section p:last-child { margin-bottom: 0; }
  .privacy-section ul { margin: 0.75rem 0 0.75rem 1.5rem; display: flex; flex-direction: column; gap: 0.4rem; }
  .privacy-section ul li { font-size: 0.875rem; color: var(--gray); line-height: 1.6; }
  .contact-info { background: #f9f9f7; border-radius: var(--radius); padding: 1.25rem; margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.875rem; color: var(--gray); }
  .contact-info strong { color: #1a1a1a; font-size: 0.95rem; }
  .contact-info a { color: var(--red); text-decoration: none; font-weight: 500; }
  .contact-info a:hover { text-decoration: underline; }
</style>
