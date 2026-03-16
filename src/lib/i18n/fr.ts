import type { Translations } from './en';

const fr: Translations = {
  // Navigation
  nav: {
    home: 'Accueil',
    about: 'À propos',
    contact: 'Contact',
    book: 'Réserver un envoi',
  },

  // Homepage
  home: {
    hero_label: 'Cameroun ↔ Canada',
    hero_title: 'Soyez le premier à votre porte',
    hero_sub: 'Expédition fiable de Montréal & Toronto vers le Cameroun',
    select_service: 'Que souhaitez-vous expédier?',
    cta_book: 'Réserver',
    cta_whatsapp: 'Discuter sur WhatsApp',
  },

  // Services
  services: {
    vehicle: 'Véhicule',
    vehicle_desc: 'Voitures, camions et SUV expédiés de porte à port',
    barrel: 'Fût',
    barrel_desc: 'Fûts d\'expédition standard emballés par vous',
    procurement: 'Acheter pour moi',
    procurement_desc: 'Nous l\'achetons au Canada et vous l\'expédions',
  },

  // Booking — shared
  booking: {
    step_service: 'Service',
    step_details: 'Détails',
    step_pickup: 'Collecte',
    step_delivery: 'Livraison',
    step_confirm: 'Confirmer',
    next: 'Continuer',
    back: 'Retour',
    submit: 'Soumettre la réservation',
    no_dates_available: 'Aucune date de collecte disponible dans votre ville.',
    no_dates_whatsapp: 'Contactez-nous sur WhatsApp pour organiser une collecte',
    origin_city: 'Ville d\'origine',
    pickup_date: 'Fenêtre de collecte',
    select_date: 'Sélectionner une date de collecte',
    your_info: 'Vos informations',
    full_name: 'Nom complet',
    email: 'Adresse e-mail',
    phone: 'Numéro de téléphone',
    phone_hint: 'Inclure l\'indicatif pays ex. +1 514 555 0123',
    language: 'Langue préférée',
  },

  // Vehicle form
  vehicle: {
    title: 'Détails du véhicule',
    year: 'Année',
    make: 'Marque',
    model: 'Modèle',
    trim: 'Finition (optionnel)',
    vin: 'NIV (optionnel)',
    condition: 'État',
    condition_runs: 'Fonctionne et roule',
    condition_inop: 'Hors service',
    condition_parts: 'Pièces seulement',
    other_make: 'Autre — saisir manuellement',
    other_model: 'Autre — saisir manuellement',
    select_year: 'Sélectionner l\'année',
    select_make: 'Sélectionner la marque',
    select_model: 'Sélectionner le modèle',
    loading_makes: 'Chargement des marques...',
    loading_models: 'Chargement des modèles...',
  },

  // Barrel form
  barrel: {
    title: 'Détails du fût',
    size: 'Taille du fût',
    quantity: 'Quantité',
    contents: 'Description du contenu',
    contents_hint: 'Décrivez brièvement le contenu ex. vêtements, chaussures, articles alimentaires',
    size_30: '30 gal — Demi-fût',
    size_55: '55 gal — Fût standard',
    size_75: '75 gal — Grand fût',
    size_110: '110 gal — Fût XL',
  },

  // Procurement form
  procurement: {
    title: 'Détails de l\'achat',
    item: 'Description de l\'article ou lien',
    item_hint: 'Décrivez l\'article ou collez un lien ex. Amazon, Best Buy',
    quantity: 'Quantité',
    budget: 'Budget (CFA)',
    budget_hint: 'Montant maximum en francs CFA que vous souhaitez dépenser',
    fee_note: 'Des frais de service seront ajoutés à votre devis',
  },

  // Cameroon address
  address: {
    title: 'Adresse de livraison au Cameroun',
    recipient_name: 'Nom du destinataire',
    recipient_phone: 'Téléphone du destinataire',
    city: 'Ville',
    neighbourhood: 'Quartier (optionnel)',
    landmark: 'Point de repère le plus proche',
    landmark_hint: 'ex. Près du Marché Mokolo, en face de la station Total',
    full_description: 'Description complète de l\'adresse',
    full_description_hint: 'Décrivez l\'adresse avec autant de détails que possible',
  },

  // Confirmation page
  confirm: {
    title: 'Vérifiez votre réservation',
    service: 'Service',
    pickup: 'Collecte',
    delivery: 'Livraison',
    client: 'Vos coordonnées',
    edit: 'Modifier',
    submit: 'Soumettre la réservation',
    disclaimer: 'La soumission ne vous facture pas. Nous examinerons votre demande et vous enverrons un devis sous 24 heures.',
  },

  // Success page
  success: {
    title: 'Réservation reçue!',
    message: 'Nous avons bien reçu votre demande d\'expédition. Vous recevrez un message WhatsApp avec votre numéro de référence.',
    reference: 'Votre référence',
    whatsapp: 'Des questions? Discutez avec nous',
    new_booking: 'Faire une autre réservation',
  },

  // Payment page
  payment: {
    title: 'Finalisez votre paiement',
    amount: 'Montant dû',
    pay_card: 'Payer par carte',
    pay_mobile: 'Payer par Mobile Money',
    pay_interac: 'Payer par virement Interac',
    interac_instructions: 'Envoyez à {email} avec la référence {ref} dans le message.',
    already_paid: 'Déjà payé par Interac? Répondez à notre message WhatsApp pour confirmer.',
  },

  // Admin
  admin: {
    dashboard: 'Tableau de bord',
    orders: 'Commandes',
    clients: 'Clients',
    schedules: 'Calendrier de collecte',
    payments: 'Paiements',
    settings: 'Paramètres',
    logout: 'Se déconnecter',
    total_orders: 'Total des commandes',
    total_revenue: 'Revenu total',
    pending_quotes: 'Devis en attente',
    send_quote: 'Envoyer le devis',
    confirm_payment: 'Confirmer le paiement',
    add_schedule: 'Ajouter une fenêtre de collecte',
    status_submitted: 'Soumis',
    status_quoted: 'Devisé',
    status_paid: 'Payé',
    status_picked_up: 'Collecté',
    status_in_transit: 'En transit',
    status_delivered: 'Livré',
  },

  // Errors
  errors: {
    required: 'Ce champ est obligatoire',
    invalid_email: 'Veuillez entrer une adresse e-mail valide',
    invalid_phone: 'Veuillez entrer un numéro de téléphone valide avec l\'indicatif pays',
    generic: 'Une erreur s\'est produite. Veuillez réessayer.',
    no_schedules: 'Aucune date de collecte disponible pour cette ville.',
  },
};

export default fr;
