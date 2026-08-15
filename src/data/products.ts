export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  imageSrc: string;
  calories?: number;
  badge?: string;
  isPopular?: boolean;
}

export const mockProducts: ProductItem[] = [
  {
    id: "p1",
    name: "Peach Please Frapino",
    description: "Ice-blended refreshing peach frapino topped with light whipped cream and peach drizzle.",
    price: 78,
    category: "Barista's Choice",
    subCategory: "Seasonal Favourites",
    imageSrc: "/frapino_passion.png",
    calories: 280,
    badge: "Seasonal",
    isPopular: true,
  },
  {
    id: "p2",
    name: "Iced Salted Caramel Cold Brew",
    description: "Slow-steeped cold brew layered with velvety salted caramel cold foam.",
    price: 65,
    category: "Barista's Choice",
    subCategory: "Seasonal Favourites",
    imageSrc: "/iced_offer.png",
    calories: 190,
    badge: "Bestseller",
    isPopular: true,
  },
  {
    id: "p3",
    name: "Peach Frapino & Cinnamon Roll Combo",
    description: "Pair our summer signature Peach Frapino with a warm freshly baked Swedish cinnamon fika bun.",
    price: 95,
    category: "App deals",
    subCategory: "Combos",
    imageSrc: "/frapino_passion.png",
    calories: 540,
    badge: "Save 20%",
    isPopular: true,
  },
  {
    id: "p4",
    name: "Double Espresso Shot & Croissant",
    description: "Rich dark roast double espresso shot paired with a flaky butter croissant.",
    price: 58,
    category: "App deals",
    subCategory: "Combos",
    imageSrc: "/espresso_shot.png",
    calories: 310,
    badge: "Morning Special",
  },
  {
    id: "p5",
    name: "Passion Fruit Refresher",
    description: "Hand-shaken iced green tea infusion with tangy passion fruit juice and real fruit seeds.",
    price: 68,
    category: "Cold drinks",
    subCategory: "Drink Of The Month",
    imageSrc: "/iced_offer.png",
    calories: 140,
    badge: "Drink of Month",
  },
  {
    id: "p6",
    name: "Signature Espresso Latte",
    description: "Smooth double shot of Espresso House master roast poured over velvety steamed milk.",
    price: 54,
    category: "Hot drinks",
    subCategory: "Classic Coffee",
    imageSrc: "/espresso_shot.png",
    calories: 180,
    isPopular: true,
  },
  {
    id: "p7",
    name: "Iced Vanilla Oat Flat White",
    description: "Quad-shot ristretto over ice with creamy oat milk and natural Madagascar vanilla.",
    price: 72,
    category: "Cold drinks",
    subCategory: "Iced Classics",
    imageSrc: "/iced_offer.png",
    calories: 160,
  },
];

export function getProductById(id: string): ProductItem | undefined {
  return mockProducts.find((p) => p.id === id);
}
