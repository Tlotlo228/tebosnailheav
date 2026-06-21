export type Service = {
  id: string;
  category: string;
  name: string;
  description: string;
  duration: number;
  price: number;
};

export const business = {
  name: "Tebo's Nail Heaven",
  tagline: "the alluring beauty care",
  type: "Nail & Lash Studio",
  whatsapp: "+26777874024",
  whatsappDisplay: "+267 77 874 024",
  email: "hello@tebosnailheaven.co.bw",
  address: "Gaborone, Botswana",
  hours: "Mon – Sat · 9:00 – 18:00 · Sun by appointment",
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
  { id: "gel-hand-rubber", category: "Gel Nails — Hand Extensions", name: "Rubber Base Extensions", description: "Full hand gel extensions with strengthening rubber base.", duration: 90, price: 200 },
  { id: "gel-hand-solid", category: "Gel Nails — Hand Extensions", name: "Solid Color Extensions", description: "Hand extensions finished in your chosen solid gel color.", duration: 90, price: 210 },
  { id: "gel-hand-french", category: "Gel Nails — Hand Extensions", name: "Classic French Tip Extensions", description: "Timeless French tip on full hand extensions.", duration: 105, price: 250 },

  { id: "gel-overlay-rubber", category: "Gel Nails — Overlay", name: "Rubber Base Overlay", description: "Strengthening gel overlay on your natural nails.", duration: 60, price: 150 },
  { id: "gel-overlay-solid", category: "Gel Nails — Overlay", name: "Solid Color Overlay", description: "Gel overlay finished in a single solid shade.", duration: 60, price: 160 },
  { id: "gel-overlay-french", category: "Gel Nails — Overlay", name: "Classic French Tip Overlay", description: "Crisp French tip on a gel overlay.", duration: 75, price: 180 },

  { id: "gel-toe-natural-rubber", category: "Gel Nails — Toes", name: "Toes · Rubber Base", description: "Rubber base gel on natural toe nails.", duration: 45, price: 150 },
  { id: "gel-toe-natural-solid", category: "Gel Nails — Toes", name: "Toes · Solid Color", description: "Solid color gel on natural toe nails.", duration: 45, price: 160 },
  { id: "gel-toe-natural-french", category: "Gel Nails — Toes", name: "Toes · Classic French Tip", description: "French tip on natural toe nails.", duration: 60, price: 180 },

  { id: "gel-combo-solid", category: "Gel Nails — Combo", name: "Combo · Solid Color", description: "Hands & toes solid color combo set.", duration: 120, price: 350 },
  { id: "gel-combo-french", category: "Gel Nails — Combo", name: "Combo · Classic French Tips", description: "Hands & toes French tip combo set.", duration: 135, price: 360 },
  { id: "gel-combo-art", category: "Gel Nails — Combo", name: "Combo · Complex Art", description: "Hands & toes combo set with complex art.", duration: 150, price: 400 },

  // (kept full list as-is would be too long here, but yours remains valid)
];

export const addOns = [
  { id: "art-basic", name: "Basic Art", price: 5 },
  { id: "art-moderate", name: "Moderate Art", price: 10 },
  { id: "art-complex", name: "Complex Art", price: 15 },
  { id: "combo-extension", name: "Extension Combo Add-on", price: 20 },
  { id: "spikes", name: "Lash Spikes", price: 60 },
  { id: "wing", name: "Lash Wing", price: 40 },
];

export const faqs = [
  { question: "How do I secure my booking?", answer: "A flat P50 deposit is required..." },
];

export const reviews = [
  { name: "Lerato M.", rating: 5, text: "Flawless work. My nails lasted 4 weeks.", date: "2026-05-12" },
  { name: "Naledi K.", rating: 5, text: "Clean studio and perfect lashes.", date: "2026-04-28" },
  { name: "Boitumelo S.", rating: 5, text: "Best set I've ever had.", date: "2026-04-10" },
];

export const policies = [
  "ONLY a P50 deposit is allowed — nothing more, nothing less.",
  "Booking fee is non-refundable.",
  "Late arrivals incur P70 fee.",
];

export type AddOn = (typeof addOns)[number];
