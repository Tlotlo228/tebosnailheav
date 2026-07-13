export type Service = {
  id: string;
  category: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
};

export const business = {
  name: "Tebo's Nail Heaven",
  tagline: "the alluring beauty care",
  type: "Nail & Lash Studio",
  whatsapp: "+26777981109",
  whatsappDisplay: "+267 77 981 109",
  email: "tebodimakatso@icloud.com",
  address: "Gaborone, Botswana",
  hours: "Mon – Sat · 8:00 – 18:00 · Sun by appointment",
  instagram: "tebos_nail_heaven",
  instagramUrl: "https://instagram.com/tebos_nail_heaven",
  currency: "P",
  depositAmount: 50,
  bankDetails: {
    mobileMoneyProvider: "Pay-to-Cell / eWallet",
    mobileMoneyNumber: "+267 77 874 024",
    mobileMoneyRaw: "26777874024",
    accountName: "Tebo Dimakatso",
    bankName: "Absa",
    accountNumber: "1188442",
    branch: "Carbo Prestige",
  },
  stats: {
    yearsExperience: 5,
    clientsServed: 1200,
    rating: 4.9,
  },
  bookingEmbedUrl:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1W7FLd7QNWhruyqWof_L1WoMzuXqtY4PXYI32JyuiMr9o9nkqGBgcnJiq6VE_BTLZk7Q6f7WRh?gv=true",
};

export const services: Service[] = [
  // ----- GEL NAILS -----
  { id: "gel-hand-rubber", category: "Gel Nails — Hand Extensions", name: "Rubber Base Extensions", description: "Full hand gel extensions with strengthening rubber base.", duration: 90, price: 200 },
  { id: "gel-hand-solid", category: "Gel Nails — Hand Extensions", name: "Solid Color Extensions", description: "Hand extensions finished in your chosen solid gel color.", duration: 90, price: 210 },
  { id: "gel-hand-french", category: "Gel Nails — Hand Extensions", name: "Classic French Tip Extensions", description: "Timeless French tip on full hand extensions.", duration: 105, price: 250 },
  { id: "gel-overlay-rubber", category: "Gel Nails — Overlay", name: "Rubber Base Overlay", description: "Strengthening gel overlay on your natural nails.", duration: 60, price: 150 },
  { id: "gel-overlay-solid", category: "Gel Nails — Overlay", name: "Solid Color Overlay", description: "Gel overlay finished in a single solid shade.", duration: 60, price: 160 },
  { id: "gel-overlay-french", category: "Gel Nails — Overlay", name: "Classic French Tip Overlay", description: "Crisp French tip on a gel overlay.", duration: 75, price: 180 },
  { id: "gel-toe-natural-rubber", category: "Gel Nails — Toes (gel on natural)", name: "Toes · Rubber Base", description: "Rubber base gel on natural toe nails.", duration: 45, price: 150 },
  { id: "gel-toe-natural-solid", category: "Gel Nails — Toes (gel on natural)", name: "Toes · Solid Color", description: "Solid color gel on natural toe nails.", duration: 45, price: 160 },
  { id: "gel-toe-natural-french", category: "Gel Nails — Toes (gel on natural)", name: "Toes · Classic French Tip", description: "French tip on natural toe nails.", duration: 60, price: 180 },
  { id: "gel-toe-ext-rubber", category: "Gel Nails — Toes (extensions)", name: "Toe Extensions · Rubber Base", description: "Toe gel extensions with rubber base.", duration: 75, price: 200 },
  { id: "gel-toe-ext-solid", category: "Gel Nails — Toes (extensions)", name: "Toe Extensions · Solid Color", description: "Toe gel extensions in solid color.", duration: 75, price: 210 },
  { id: "gel-toe-ext-french", category: "Gel Nails — Toes (extensions)", name: "Toe Extensions · Classic French Tip", description: "French tip toe gel extensions.", duration: 90, price: 230 },
  { id: "gel-combo-solid", category: "Gel Nails — Combo (hands + toes)", name: "Combo · Solid Color", description: "Hands & toes solid color combo set.", duration: 120, price: 350 },
  { id: "gel-combo-french", category: "Gel Nails — Combo (hands + toes)", name: "Combo · Classic French Tips", description: "Hands & toes French tip combo set.", duration: 135, price: 360 },
  { id: "gel-combo-art", category: "Gel Nails — Combo (hands + toes)", name: "Combo · Complex Art", description: "Hands & toes combo set with complex art included.", duration: 150, price: 400 },

  // ----- POLYGEL NAILS -----
  { id: "poly-hand-rubber", category: "Polygel — Hand Extensions", name: "Rubber Base Extensions", description: "Polygel hand extensions with rubber base.", duration: 105, price: 220 },
  { id: "poly-hand-solid", category: "Polygel — Hand Extensions", name: "Solid Color Extensions", description: "Polygel hand extensions in solid color.", duration: 105, price: 230 },
  { id: "poly-hand-french", category: "Polygel — Hand Extensions", name: "Classic French Tip Extensions", description: "French tip polygel hand extensions.", duration: 120, price: 270 },
  { id: "poly-overlay-rubber", category: "Polygel — Overlay", name: "Rubber Base Overlay", description: "Polygel overlay with rubber base on natural nails.", duration: 75, price: 170 },
  { id: "poly-overlay-solid", category: "Polygel — Overlay", name: "Solid Color Overlay", description: "Polygel overlay in a single solid shade.", duration: 75, price: 180 },
  { id: "poly-overlay-french", category: "Polygel — Overlay", name: "Classic French Tip Overlay", description: "French tip polygel overlay.", duration: 90, price: 200 },
  { id: "poly-toe-natural-rubber", category: "Polygel — Toes (gel on natural)", name: "Toes · Rubber Base", description: "Polygel rubber base on natural toes.", duration: 60, price: 170 },
  { id: "poly-toe-natural-solid", category: "Polygel — Toes (gel on natural)", name: "Toes · Solid Color", description: "Polygel solid color on natural toes.", duration: 60, price: 180 },
  { id: "poly-toe-natural-french", category: "Polygel — Toes (gel on natural)", name: "Toes · Classic French Tip", description: "French tip polygel on natural toes.", duration: 75, price: 200 },
  { id: "poly-toe-ext-rubber", category: "Polygel — Toes (extensions)", name: "Toe Extensions · Rubber Base", description: "Polygel toe extensions with rubber base.", duration: 90, price: 220 },
  { id: "poly-toe-ext-solid", category: "Polygel — Toes (extensions)", name: "Toe Extensions · Solid Color", description: "Polygel toe extensions in solid color.", duration: 90, price: 230 },
  { id: "poly-toe-ext-french", category: "Polygel — Toes (extensions)", name: "Toe Extensions · Classic French Tip", description: "French tip polygel toe extensions.", duration: 105, price: 250 },
  { id: "poly-combo-solid", category: "Polygel — Combo (hands + toes)", name: "Combo · Solid Color", description: "Hands & toes polygel combo set.", duration: 135, price: 370 },
  { id: "poly-combo-french", category: "Polygel — Combo (hands + toes)", name: "Combo · Classic French Tips", description: "Hands & toes French tip polygel combo.", duration: 150, price: 400 },
  { id: "poly-combo-art", category: "Polygel — Combo (hands + toes)", name: "Combo · Complex Art", description: "Hands & toes polygel combo with complex art.", duration: 165, price: 420 },

  // ----- CLUSTER LASHES -----
  { id: "lash-nat-classic", category: "Cluster Lashes — Natural Looks", name: "Natural · Classic", description: "Soft, natural classic cluster lash set.", duration: 45, price: 100 },
  { id: "lash-nat-hybrid", category: "Cluster Lashes — Natural Looks", name: "Natural · Hybrid", description: "Natural hybrid cluster lashes.", duration: 50, price: 120 },
  { id: "lash-nat-volume", category: "Cluster Lashes — Natural Looks", name: "Natural · Volume", description: "Natural volume cluster lashes.", duration: 60, price: 150 },
  { id: "lash-cat-classic", category: "Cluster Lashes — Cat Eye Looks", name: "Cat Eye · Classic", description: "Classic cluster lashes shaped to cat eye.", duration: 50, price: 130 },
  { id: "lash-cat-hybrid", category: "Cluster Lashes — Cat Eye Looks", name: "Cat Eye · Hybrid", description: "Hybrid cluster lashes in cat eye shape.", duration: 55, price: 150 },
  { id: "lash-cat-volume", category: "Cluster Lashes — Cat Eye Looks", name: "Cat Eye · Volume", description: "Volume cluster cat eye lashes.", duration: 65, price: 180 },
  { id: "lash-cat-mega", category: "Cluster Lashes — Cat Eye Looks", name: "Cat Eye · Mega Volume", description: "Dramatic mega volume cat eye lashes.", duration: 75, price: 250 },
  { id: "lash-open-classic", category: "Cluster Lashes — Open Eye Looks", name: "Open Eye · Classic", description: "Eye-opening classic cluster set.", duration: 55, price: 220 },
  { id: "lash-open-hybrid", category: "Cluster Lashes — Open Eye Looks", name: "Open Eye · Hybrid", description: "Eye-opening hybrid cluster set.", duration: 60, price: 230 },
  { id: "lash-open-volume", category: "Cluster Lashes — Open Eye Looks", name: "Open Eye · Volume", description: "Eye-opening volume cluster set.", duration: 70, price: 250 },
  { id: "lash-removal", category: "Cluster Lashes — Removal", name: "Lash Removal", description: "Gentle, safe cluster lash removal.", duration: 20, price: 50 },
    // ----- PEDICURE -----
  {
    id: "pedicure-foot-scrubbing",
    category: "Pedicure",
    name: "Foot Scrubbing",
    description: "Professional foot scrub treatment leaving your feet soft, smooth and refreshed.",
    duration: 60,
    price: 200,
  },

  // ----- MAKE UP -----
  {
    id: "makeup-soft-glam",
    category: "Make Up",
    name: "Soft Glam",
    description: "Elegant soft glam makeup perfect for everyday events and special occasions.",
    duration: 90,
    price: 250,
  },

  {
    id: "makeup-full-glam",
    category: "Make Up",
    name: "Full Glam",
    description: "Full coverage glamorous makeup for weddings, parties and photoshoots.",
    duration: 120,
    price: 350,
  },
    // ----- HAIR -----
  {
    id: "hair-installation",
    category: "Hair",
    name: "Hair Installation",
    description: "Professional hair installation for a neat, secure and natural-looking finish.",
    duration: 120,
    price: 200,
  },
];

export const addOns = [
  { id: "art-basic", name: "Basic Art (flowers, stars, hearts, charms, aura)", price: 5 },
  { id: "art-moderate", name: "Moderate Art (chrome, marble, ombré, animal prints)", price: 10 },
  { id: "art-complex", name: "Complex Art (3D / art combinations)", price: 15 },
  { id: "combo-extension", name: "Extension on both hands + toes (combo add-on)", price: 20 },
  { id: "spikes", name: "Lash Spikes", price: 60 },
  { id: "wing", name: "Lash Wing", price: 40 },
];

export const faqs = [
  { question: "How do I secure my booking?", answer: "A flat P50 deposit is required — nothing more, nothing less. Your slot is held on a pending basis until we verify your deposit, after which we confirm via WhatsApp." },
  { question: "Is the deposit refundable?", answer: "The P50 booking fee is non-refundable. It is transferable if you reschedule with 24+ hours notice. No-shows or cancellations inside 24 hours forfeit the deposit." },
  { question: "What happens if I'm late?", answer: "Late arrivals incur an extra P70 charge. Arriving more than 15 minutes late is an automatic cancellation." },
  { question: "Can I book multiple services in one appointment?", answer: "Yes — please appoint for ALL services you need when booking (e.g. lashes + soak off, hands only, etc.) so we can hold the right amount of time." },
  { question: "Is art included with combo sets?", answer: "Yes — art is FREE in combo sets. An extra P20 applies if you do extensions on both hands and toes for a combo." },
  { question: "Can I record or take photos during my appointment?", answer: "Absolutely — shooting content is allowed and encouraged." },
  { question: "Do you do soak-offs?", answer: "Yes. Cluster lash removal is P50. Please book soak-offs as a separate service so we reserve the time." },
];

export const reviews = [
  { name: "Lerato M.", rating: 5, text: "Tebo's work is absolutely flawless. My gel French tips lasted 4 weeks with zero lifting.", date: "2026-05-12" },
  { name: "Naledi K.", rating: 5, text: "The studio is so clean and calming. I left with the prettiest cat eye lashes — couldn't stop staring at myself.", date: "2026-04-28" },
  { name: "Boitumelo S.", rating: 5, text: "Best polygel combo set I've ever had. Worth every Pula.", date: "2026-04-10" },
  { name: "Aobakwe T.", rating: 5, text: "Tebo really listens. I came with a Pinterest screenshot and she nailed it — pun intended.", date: "2026-03-22" },
  { name: "Refilwe D.", rating: 4, text: "Lovely service and beautiful results. Booking via WhatsApp was super quick.", date: "2026-03-05" },
  { name: "Onkemetse P.", rating: 5, text: "The chrome art is unreal. Already booked my next appointment.", date: "2026-02-18" },
];

export const policies = [
  "ONLY a P50 deposit is allowed — nothing more, nothing less.",
  "Do NOT deposit the full amount.",
  "The booking fee is non-refundable.",
  "Failure to secure a slot within 30 minutes means it can be given away.",
  "When you book, appoint for ALL the services you will need (e.g. lashes + soak off).",
  "Late coming is an extra P70 charge. Automatic cancellation if 15+ minutes late.",
  "Shooting content is allowed.",
];

export type AddOn = (typeof addOns)[number];



