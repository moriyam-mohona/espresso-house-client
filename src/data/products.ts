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
  // ==========================================
  // BARISTA'S CHOICE
  // ==========================================
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

  // ==========================================
  // APP DEALS
  // ==========================================
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

  // ==========================================
  // COLD DRINKS
  // ==========================================
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
    id: "p7",
    name: "Iced Vanilla Oat Flat White",
    description: "Quad-shot ristretto over ice with creamy oat milk and natural Madagascar vanilla.",
    price: 72,
    category: "Cold drinks",
    subCategory: "Iced Classics",
    imageSrc: "/iced_offer.png",
    calories: 160,
  },

  // ==========================================
  // HOT DRINKS
  // ==========================================
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
    id: "p8",
    name: "Cardamom Spiced Cappuccino",
    description: "Rich espresso with dense milk foam infused with aromatic Scandinavian ground cardamom.",
    price: 58,
    category: "Hot drinks",
    subCategory: "Specialty Coffee",
    imageSrc: "/espresso_shot.png",
    calories: 195,
    badge: "Nordic Fav",
  },

  // ==========================================
  // BREAK FAST
  // ==========================================
  {
    id: "p9",
    name: "Avocado & Poached Egg Toast",
    description: "Smashed avocado with lime, poached egg, and chilli flakes on toasted artisanal sourdough.",
    price: 75,
    category: "Break Fast",
    subCategory: "Hot Breakfast",
    imageSrc: "/coffee-shop.jpg",
    calories: 380,
    badge: "Breakfast Fave",
    isPopular: true,
  },
  {
    id: "p10",
    name: "Salmon & Cream Cheese Bagel",
    description: "Smoked Atlantic salmon with cream cheese, capers, and fresh dill on a toasted sesame bagel.",
    price: 82,
    category: "Break Fast",
    subCategory: "Bagels & Toast",
    imageSrc: "/coffee-shop.jpg",
    calories: 420,
    badge: "Chef Special",
  },
  {
    id: "p11",
    name: "Overnight Oats with Berries & Honey",
    description: "Creamy oat bowl topped with fresh blueberries, raspberries, chia seeds, and wild honey.",
    price: 48,
    category: "Break Fast",
    subCategory: "Healthy Start",
    imageSrc: "/iced_offer.png",
    calories: 260,
    badge: "Healthy Choice",
  },

  // ==========================================
  // FOOD
  // ==========================================
  {
    id: "p12",
    name: "Grilled Mozzarella & Pesto Panini",
    description: "Melted mozzarella, sundried tomatoes, and fresh basil pesto grilled in artisan focaccia.",
    price: 85,
    category: "Food",
    subCategory: "Warm Paninis",
    imageSrc: "/coffee-shop.jpg",
    calories: 490,
    badge: "Hot Grilled",
    isPopular: true,
  },
  {
    id: "p13",
    name: "Chipotle Chicken & Bacon Wrap",
    description: "Tender grilled chicken, crispy bacon, avocado, and smoked chipotle mayo in a tortilla wrap.",
    price: 89,
    category: "Food",
    subCategory: "Wraps & Bowls",
    imageSrc: "/coffee-shop.jpg",
    calories: 520,
    badge: "Popular Lunch",
  },

  // ==========================================
  // PASTRY
  // ==========================================
  {
    id: "p14",
    name: "Swedish Kanelbulle (Cinnamon Roll)",
    description: "Traditional Swedish cinnamon roll baked fresh daily with pearl sugar sprinkles.",
    price: 38,
    category: "Pastry",
    subCategory: "Fika Bakery",
    imageSrc: "/frapino_passion.png",
    calories: 320,
    badge: "Fika Classic",
    isPopular: true,
  },
  {
    id: "p15",
    name: "Cardamom & Almond Bun",
    description: "Flaky buttery pastry filled with rich almond paste and freshly ground cardamom.",
    price: 42,
    category: "Pastry",
    subCategory: "Fika Bakery",
    imageSrc: "/frapino_passion.png",
    calories: 310,
  },

  // ==========================================
  // READY TO DRINK
  // ==========================================
  {
    id: "p16",
    name: "Cold Pressed Orange Juice 330ml",
    description: "100% natural cold pressed Valencia orange juice. No added sugar or preservatives.",
    price: 42,
    category: "Ready To Drink",
    subCategory: "Juices & Waters",
    imageSrc: "/iced_offer.png",
    calories: 130,
    badge: "100% Juice",
  },
  {
    id: "p17",
    name: "Nitro Cold Brew Coffee Can 250ml",
    description: "Velvety nitrogen-infused black cold brew coffee in a portable ready-to-drink can.",
    price: 45,
    category: "Ready To Drink",
    subCategory: "Canned Coffee",
    imageSrc: "/espresso_shot.png",
    calories: 5,
    badge: "Zero Sugar",
  },

  // ==========================================
  // ENJOY AT HOME
  // ==========================================
  {
    id: "p18",
    name: "Master Roast Whole Beans 500g",
    description: "Espresso House signature dark roast whole coffee beans sourced from sustainable farms.",
    price: 145,
    category: "Enjoy At Home",
    subCategory: "Coffee Beans",
    imageSrc: "/espresso_shot.png",
    badge: "Signature Blend",
    isPopular: true,
  },
  {
    id: "p19",
    name: "Espresso House Vanilla Syrup 250ml",
    description: "Recreate your favourite vanilla lattes at home with our authentic barista syrup bottle.",
    price: 85,
    category: "Enjoy At Home",
    subCategory: "Barista Syrups",
    imageSrc: "/frapino_passion.png",
    badge: "Barista Quality",
  },
];

export function getProductById(id: string): ProductItem | undefined {
  return mockProducts.find((p) => p.id === id);
}
