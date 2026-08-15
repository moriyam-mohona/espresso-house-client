export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  distance: string;
  hours: string;
  isOpen: boolean;
  closingTime: string;
  rating: number;
  reviewsCount: number;
  lat: number;
  lng: number;
  imageSrc: string;
  amenities: string[];
  crowdLevel: "Quiet" | "Moderate" | "Busy";
}

export const mockBranches: Branch[] = [
  {
    id: "br-1",
    name: "Isomyy Joensuu",
    address: "Shopping centre Iso Myy, Kauppakatu 26",
    city: "80100 Joensuu",
    country: "Finland",
    distance: "1.2 km",
    hours: "09:00 - 19:00",
    isOpen: true,
    closingTime: "19:00",
    rating: 4.9,
    reviewsCount: 184,
    lat: 62.601,
    lng: 29.763,
    imageSrc: "/coffee-shop.jpg",
    amenities: ["Free High-Speed Wifi", "Child-Friendly Area", "Express Pickup", "Outdoor Terrace"],
    crowdLevel: "Quiet",
  },
  {
    id: "br-2",
    name: "Iso Kristiina",
    address: "Kaivokatu 5 B",
    city: "53100 Lappeenranta",
    country: "Finland",
    distance: "3.5 km",
    hours: "08:00 - 19:30",
    isOpen: true,
    closingTime: "19:30",
    rating: 4.8,
    reviewsCount: 142,
    lat: 61.058,
    lng: 28.188,
    imageSrc: "/coffee-shop.jpg",
    amenities: ["Free High-Speed Wifi", "Outdoor Seating", "Express Pickup", "Wheelchair Access"],
    crowdLevel: "Moderate",
  },
  {
    id: "br-3",
    name: "Pasaati Kotka",
    address: "Keskuskatu 10",
    city: "48100 Kotka",
    country: "Finland",
    distance: "5.8 km",
    hours: "09:00 - 20:00",
    isOpen: true,
    closingTime: "20:00",
    rating: 4.7,
    reviewsCount: 96,
    lat: 60.466,
    lng: 26.946,
    imageSrc: "/coffee-shop.jpg",
    amenities: ["Free High-Speed Wifi", "Child-Friendly Area", "Quiet Workspace"],
    crowdLevel: "Quiet",
  },
  {
    id: "br-4",
    name: "Sergelstorg Stockholm",
    address: "Sergelstorg 14",
    city: "111 57 Stockholm",
    country: "Sweden",
    distance: "0.8 km",
    hours: "07:00 - 21:00",
    isOpen: true,
    closingTime: "21:00",
    rating: 4.9,
    reviewsCount: 310,
    lat: 59.332,
    lng: 18.064,
    imageSrc: "/coffee-shop.jpg",
    amenities: ["Free High-Speed Wifi", "Express Pickup", "Outdoor Terrace", "Power Outlets"],
    crowdLevel: "Busy",
  },
  {
    id: "br-5",
    name: "Drottninggatan Fika",
    address: "Drottninggatan 71",
    city: "111 36 Stockholm",
    country: "Sweden",
    distance: "1.4 km",
    hours: "07:30 - 20:30",
    isOpen: true,
    closingTime: "20:30",
    rating: 4.8,
    reviewsCount: 215,
    lat: 59.336,
    lng: 18.059,
    imageSrc: "/coffee-shop.jpg",
    amenities: ["Free High-Speed Wifi", "Express Pickup", "Wheelchair Access"],
    crowdLevel: "Moderate",
  },
];

export function getBranchById(id: string): Branch {
  return mockBranches.find((b) => b.id === id) || mockBranches[0];
}
