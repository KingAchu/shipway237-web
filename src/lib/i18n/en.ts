const en = {
  // Navigation
  nav: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    book: 'Book a shipment',
  },

  // Homepage
  home: {
    hero_label: 'Cameroon ↔ Canada',
    hero_title: 'Be the first at your door',
    hero_sub: 'Reliable shipping from Montreal & Toronto to Cameroon',
    select_service: 'What are you shipping?',
    cta_book: 'Book now',
    cta_whatsapp: 'Chat on WhatsApp',
  },

  // Services
  services: {
    vehicle: 'Vehicle',
    vehicle_desc: 'Cars, trucks and SUVs shipped door to port',
    barrel: 'Barrel',
    barrel_desc: 'Standard shipping barrels packed by you',
    procurement: 'Buy for me',
    procurement_desc: 'We buy it in Canada and ship it to you',
  },

  // Booking — shared
  booking: {
    step_service: 'Service',
    step_details: 'Details',
    step_pickup: 'Pickup',
    step_delivery: 'Delivery',
    step_confirm: 'Confirm',
    next: 'Continue',
    back: 'Back',
    submit: 'Submit booking',
    no_dates_available: 'No pickup dates available in your city yet.',
    no_dates_whatsapp: 'Contact us on WhatsApp to arrange a pickup',
    origin_city: 'Origin city',
    pickup_date: 'Pickup window',
    select_date: 'Select a pickup date',
    your_info: 'Your information',
    full_name: 'Full name',
    email: 'Email address',
    phone: 'Phone number',
    phone_hint: 'Include country code e.g. +1 514 555 0123',
    language: 'Preferred language',
  },

  // Vehicle form
  vehicle: {
    title: 'Vehicle details',
    year: 'Year',
    make: 'Make',
    model: 'Model',
    trim: 'Trim (optional)',
    vin: 'VIN (optional)',
    condition: 'Condition',
    condition_runs: 'Runs & drives',
    condition_inop: 'Inoperable',
    condition_parts: 'Parts only',
    other_make: 'Other — type manually',
    other_model: 'Other — type manually',
    select_year: 'Select year',
    select_make: 'Select make',
    select_model: 'Select model',
    loading_makes: 'Loading makes...',
    loading_models: 'Loading models...',
  },

  // Barrel form
  barrel: {
    title: 'Barrel details',
    size: 'Barrel size',
    quantity: 'Quantity',
    contents: 'Contents description',
    contents_hint: 'Briefly describe what is inside e.g. clothes, shoes, food items',
    size_30: '30 gal — Half barrel',
    size_55: '55 gal — Standard barrel',
    size_75: '75 gal — Large barrel',
    size_110: '110 gal — XL barrel',
  },

  // Procurement form
  procurement: {
    title: 'Procurement details',
    item: 'Item description or link',
    item_hint: 'Describe the item or paste a link e.g. Amazon, Best Buy',
    quantity: 'Quantity',
    budget: 'Budget (CFA)',
    budget_hint: 'Maximum amount in CFA you want to spend on this item',
    fee_note: 'A service fee will be added to your quote',
  },

  // Cameroon address
  address: {
    title: 'Delivery address in Cameroon',
    recipient_name: 'Recipient name',
    recipient_phone: 'Recipient phone',
    city: 'City',
    neighbourhood: 'Neighbourhood (optional)',
    landmark: 'Nearest landmark',
    landmark_hint: 'e.g. Near Marché Mokolo, opposite Total station',
    full_description: 'Full address description',
    full_description_hint: 'Describe the address in as much detail as possible',
  },

  // Confirmation page
  confirm: {
    title: 'Review your booking',
    service: 'Service',
    pickup: 'Pickup',
    delivery: 'Delivery',
    client: 'Your details',
    edit: 'Edit',
    submit: 'Submit booking',
    disclaimer: 'Submitting does not charge you. We will review your request and send you a quote within 24 hours.',
  },

  // Success page
  success: {
    title: 'Booking received!',
    message: 'We have received your shipment request. You will receive a WhatsApp message shortly with your reference number.',
    reference: 'Your reference',
    whatsapp: 'Questions? Chat with us',
    new_booking: 'Make another booking',
  },

  // Payment page
  payment: {
    title: 'Complete your payment',
    amount: 'Amount due',
    pay_card: 'Pay by card',
    pay_mobile: 'Pay by Mobile Money',
    pay_interac: 'Pay by Interac e-Transfer',
    interac_instructions: 'Send to {email} with reference {ref} in the message.',
    already_paid: 'Already paid by Interac? Reply to our WhatsApp message to confirm.',
  },

  // Admin
  admin: {
    dashboard: 'Dashboard',
    orders: 'Orders',
    clients: 'Clients',
    schedules: 'Pickup schedules',
    payments: 'Payments',
    settings: 'Settings',
    logout: 'Log out',
    total_orders: 'Total orders',
    total_revenue: 'Total revenue',
    pending_quotes: 'Pending quotes',
    send_quote: 'Send quote',
    confirm_payment: 'Confirm payment',
    add_schedule: 'Add pickup window',
    status_submitted: 'Submitted',
    status_quoted: 'Quoted',
    status_paid: 'Paid',
    status_picked_up: 'Picked up',
    status_in_transit: 'In transit',
    status_delivered: 'Delivered',
  },

  // Errors
  errors: {
    required: 'This field is required',
    invalid_email: 'Please enter a valid email address',
    invalid_phone: 'Please enter a valid phone number with country code',
    generic: 'Something went wrong. Please try again.',
    no_schedules: 'No pickup dates available for this city.',
  },
};

export default en;
export type Translations = typeof en;
