export interface ChallengeItem {
  id: string;
  badge?: string;
  points: number;
  title: string;
  subtitle: string;
  currentProgress: number;
  totalRequired: number;
  status: "active" | "completed";
  descriptionHeader: string;
  descriptionBody: string;
}

export const DUMMY_CHALLENGES: ChallengeItem[] = [
  {
    id: "ch-1",
    badge: "New",
    points: 3,
    title: "Visit Espresso Club 2 times in 10 days",
    subtitle: "Ends in 20 days",
    currentProgress: 0,
    totalRequired: 2,
    status: "active",
    descriptionHeader:
      "When is Espresso Club enough Espresso Club? We haven't found our limit yet! To complete this challenge, visit us 2 times within 10 days.",
    descriptionBody:
      "For your visit to count in this challenge, you must complete 2 point-earning purchases in our coffee shops within 10 days. You can order both in the shop or pre order to skip the queue.",
  },
  {
    id: "ch-2",
    badge: "Featured",
    points: 5,
    title: "Try 3 Seasonal Frapino Drinks",
    subtitle: "Ends in 14 days",
    currentProgress: 1,
    totalRequired: 3,
    status: "active",
    descriptionHeader:
      "Cool down this summer! Taste 3 of our new handcrafted summer frapinos to unlock bonus loyalty points.",
    descriptionBody:
      "Valid on Beach Babe Frapino, Mango Passion Iced Tea, and Cold Brew Caramel. Purchases must be made within the campaign validity window.",
  },
  {
    id: "ch-3",
    badge: "Special",
    points: 4,
    title: "Morning Coffee Streak (3 Days)",
    subtitle: "Ends in 7 days",
    currentProgress: 0,
    totalRequired: 3,
    status: "active",
    descriptionHeader:
      "Start your morning with freshly brewed coffee! Buy any morning beverage before 11:00 AM on 3 different days.",
    descriptionBody:
      "Orders placed before 11:00 AM local time at any branch or via pre-order will count towards your streak.",
  },
];
