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
  whatsapp: "+26777874024",
  address: "Gaborone, Botswana",
  depositAmount: 50,
  stats: {
    yearsExperience: 5,
    clientsServed: 1200,
    rating: 4.9,
  },
};

export const services: Service[] = [
  {
    id: "gel-hand-rubber",
    category: "Gel Nails",
    name: "Rubber Base Extensions",
    description: "Full hand gel extensions",
    duration: 90,
    price: 200,
  },
  {
    id: "gel-hand-solid",
    category: "Gel Nails",
    name: "Solid Color Extensions",
    description: "Gel extensions with color",
    duration: 90,
    price: 210,
  },
  {
    id: "gel-hand-french",
    category: "Gel Nails",
    name: "French Tip Extensions",
    description: "Classic French tips",
    duration: 105,
    price: 250,
  },
];

export const reviews = [
  {
    name: "Lerato M.",
    rating: 5,
    text: "Perfect nails every time.",
  },
  {
    name: "Naledi K.",
    rating: 5,
    text: "Amazing lash work.",
  },
];
