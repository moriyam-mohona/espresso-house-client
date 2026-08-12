export interface RewardItem {
  id: string;
  title: string;
  pointsCost: number;
  imageSrc: string;
  subtitle: string;
  description: string;
  category: string;
}

export const DUMMY_REWARDS: RewardItem[] = [
  {
    id: "rw-1",
    title: "Extra Espresso Shot",
    pointsCost: 1,
    imageSrc: "/espresso_shot.png",
    subtitle: "Use your Fika Points to add an extra espresso shot to your drink!",
    description:
      "How much coffee is enough coffee? We haven't reached our limit yet! Use this to add an extra shot of espresso to your drink of choice.",
    category: "Customization",
  },
  {
    id: "rw-2",
    title: "Oat or Soy Milk Upgrade",
    pointsCost: 1,
    imageSrc: "/espresso_shot.png",
    subtitle: "Customize your drink with plant-based milk alternatives for free!",
    description:
      "Upgrade your favorite latte or cold brew with rich oat, soy, or almond milk without extra charge.",
    category: "Customization",
  },
  {
    id: "rw-3",
    title: "Flavored Syrup Shot",
    pointsCost: 1,
    imageSrc: "/espresso_shot.png",
    subtitle: "Add a splash of vanilla, caramel, or hazelnut syrup.",
    description:
      "Enhance your coffee experience with a shot of premium artisanal syrup of your choice.",
    category: "Customization",
  },
  {
    id: "rw-4",
    title: "Fresh Baked Croissant",
    pointsCost: 3,
    imageSrc: "/coffee-shop.jpg",
    subtitle: "Flaky butter croissant fresh from our bakery oven.",
    description:
      "Enjoy a warm, golden butter croissant handcrafted daily at your local Espresso Club.",
    category: "Bakery",
  },
  {
    id: "rw-5",
    title: "50% Off Any Iced Drink",
    pointsCost: 4,
    imageSrc: "/iced_offer.png",
    subtitle: "Half price on any handcrafted iced beverage or cold brew.",
    description:
      "Treat yourself to 50% discount on any cold brew, iced latte, or lemonade from our summer menu.",
    category: "Voucher",
  },
  {
    id: "rw-6",
    title: "Free Beach Babe Frapino",
    pointsCost: 6,
    imageSrc: "/frapino_passion.png",
    subtitle: "Redeem 1 full Beach Babe Frapino summer drink.",
    description:
      "Redeem a complimentary large Beach Babe Frapino made with real passionfruit, mango, and strawberry.",
    category: "Free Beverage",
  },
];

export interface PointsHistoryItem {
  id: string;
  title: string;
  date: string;
  points: number; // positive for earned, negative for redeemed
  type: "earned" | "redeemed";
}

export const DUMMY_POINTS_HISTORY: PointsHistoryItem[] = [
  {
    id: "hist-1",
    title: "Visit Espresso Club 2 times Challenge",
    date: "Aug 10, 2026",
    points: 3,
    type: "earned",
  },
  {
    id: "hist-2",
    title: "In-App Wallet Top Up (300 kr)",
    date: "Aug 08, 2026",
    points: 6,
    type: "earned",
  },
  {
    id: "hist-3",
    title: "Redeemed: Extra Espresso Shot",
    date: "Aug 05, 2026",
    points: -1,
    type: "redeemed",
  },
];
