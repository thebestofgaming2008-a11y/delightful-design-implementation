import type { LucideIcon } from "lucide-react";
import { BookOpen, Shirt, Sparkles, Crown, Flower2 } from "lucide-react";

export type CategoryKey = "books" | "clothes" | "essentials" | "kufi" | "women";

export interface Product {
  id: string;
  title: string;
  author: string;
  price: number;
  compareAt?: number;
  category: CategoryKey;
  subject?: string;
  description: string;
  rating: number;
  reviews: number;
  badge?: "Bestseller" | "New" | "Limited";
}

export const CATEGORIES: { key: CategoryKey; label: string; blurb: string; Icon: LucideIcon }[] = [
  { key: "books", label: "Books", blurb: "Authentic titles across Aqeedah, Seerah, Tafsir & more.", Icon: BookOpen },
  { key: "clothes", label: "Clothes", blurb: "Modest, comfortable everyday essentials.", Icon: Shirt },
  { key: "essentials", label: "Essentials", blurb: "Daily companions for the seeker of knowledge.", Icon: Sparkles },
  { key: "kufi", label: "Kufi", blurb: "Refined caps crafted for everyday elegance.", Icon: Crown },
  { key: "women", label: "Women", blurb: "Modest essentials, abayas and accessories for her.", Icon: Flower2 },
];

export const PRODUCTS: Product[] = [
  // Books
  { id: "book-tawhid", title: "The Book of Monotheism", author: "Sh. Muhammad ibn Abdul Wahhab", price: 499, compareAt: 599, category: "books", subject: "Aqeedah", description: "A foundational work on Islamic monotheism, presented with chapter notes and cross-references.", rating: 4.9, reviews: 312, badge: "Bestseller" },
  { id: "book-riyad", title: "Riyad as-Salihin", author: "Imam An-Nawawi", price: 899, category: "books", subject: "Hadith", description: "A celebrated compilation of authentic hadith arranged thematically for daily reading.", rating: 4.9, reviews: 540 },
  { id: "book-fortress", title: "Fortress of the Muslim", author: "Sa'id ibn Ali al-Qahtani", price: 249, category: "books", subject: "Du'a", description: "Pocket-sized collection of authentic supplications for everyday occasions.", rating: 4.8, reviews: 1024, badge: "Bestseller" },
  { id: "book-stories", title: "Stories of the Prophets", author: "Ibn Kathir", price: 749, category: "books", subject: "Seerah", description: "Narratives of the Prophets drawn from Qur'an and authentic tradition.", rating: 4.8, reviews: 287 },
  { id: "book-sealed", title: "The Sealed Nectar", author: "Safi-ur-Rahman al-Mubarakpuri", price: 699, category: "books", subject: "Seerah", description: "Award-winning biography of the Prophet ﷺ, beautifully presented.", rating: 4.9, reviews: 410 },
  { id: "book-tafsir", title: "Tafsir Ibn Kathir (Abridged)", author: "Ibn Kathir", price: 1899, category: "books", subject: "Tafsir", description: "An accessible abridgement of the classical commentary on the Qur'an.", rating: 4.9, reviews: 188, badge: "New" },

  // Clothes
  { id: "thobe-black", title: "Classic Black Thobe", author: "Hurayrah Essentials", price: 1499, category: "clothes", description: "Premium cotton thobe with refined cuffs and tailored cut.", rating: 4.8, reviews: 142, badge: "Bestseller" },
  { id: "thobe-white", title: "White Cotton Thobe", author: "Hurayrah Essentials", price: 1399, category: "clothes", description: "Breathable, crisp white cotton thobe — a wardrobe staple.", rating: 4.8, reviews: 98 },
  { id: "imamah-cream", title: "Imamah Wrap — Cream", author: "Hurayrah Essentials", price: 449, category: "clothes", description: "Soft cotton imamah, easy to wrap and beautifully draped.", rating: 4.7, reviews: 64 },

  // Essentials
  { id: "misbaha-99", title: "Wooden Misbaha (99 beads)", author: "Hurayrah Essentials", price: 349, category: "essentials", description: "Hand-finished wooden tasbih with smooth beads and a tassel.", rating: 4.9, reviews: 220 },
  { id: "mat-travel", title: "Travel Prayer Mat", author: "Hurayrah Essentials", price: 599, category: "essentials", description: "Foldable, lightweight prayer mat for home and travel.", rating: 4.8, reviews: 175, badge: "New" },
  { id: "attar-oud", title: "Attar — Oud Mubarak", author: "Hurayrah Essentials", price: 449, category: "essentials", description: "Long-lasting alcohol-free oud attar in a glass roller.", rating: 4.7, reviews: 88 },
  { id: "miswak-5", title: "Miswak Bundle (5)", author: "Hurayrah Essentials", price: 149, category: "essentials", description: "Fresh-cut natural miswak sticks, sealed for freshness.", rating: 4.8, reviews: 502 },
  { id: "quran-cover", title: "Leather Qur'an Cover", author: "Hurayrah Essentials", price: 799, category: "essentials", description: "Genuine leather cover with reinforced stitching.", rating: 4.9, reviews: 76, badge: "Limited" },

  // Kufi
  { id: "kufi-olive", title: "Olive Linen Kufi", author: "Hurayrah Essentials", price: 299, category: "kufi", description: "Lightweight linen kufi with breathable weave.", rating: 4.8, reviews: 56 },
  { id: "kufi-cream", title: "Cream Cotton Kufi", author: "Hurayrah Essentials", price: 249, category: "kufi", description: "Soft cotton, classic silhouette, perfect for daily wear.", rating: 4.7, reviews: 38 },
  { id: "kufi-black", title: "Black Embroidered Kufi", author: "Hurayrah Essentials", price: 399, category: "kufi", description: "Subtle tonal embroidery on premium black cotton.", rating: 4.9, reviews: 81, badge: "Bestseller" },
  { id: "kufi-white", title: "White Crochet Kufi", author: "Hurayrah Essentials", price: 199, category: "kufi", description: "Hand-crochet white kufi, breathable and lightweight.", rating: 4.6, reviews: 44 },

  // Women
  { id: "abaya-black", title: "Classic Black Abaya", author: "Hurayrah Essentials", price: 1899, category: "women", description: "Flowy, full-length abaya in soft premium fabric.", rating: 4.9, reviews: 122, badge: "Bestseller" },
  { id: "hijab-silk", title: "Silk-blend Hijab — Sage", author: "Hurayrah Essentials", price: 499, category: "women", description: "Lightweight silk-blend hijab with a soft drape.", rating: 4.8, reviews: 89 },
  { id: "khimar-navy", title: "Two-Piece Khimar — Navy", author: "Hurayrah Essentials", price: 1299, category: "women", description: "Comfortable two-piece set with full coverage.", rating: 4.8, reviews: 56, badge: "New" },
  { id: "prayer-set", title: "Women's Prayer Set", author: "Hurayrah Essentials", price: 1599, category: "women", description: "Complete one-piece prayer garment with elegant finishing.", rating: 4.9, reviews: 73 },
];

export const SUBJECTS = [
  "Aqeedah",
  "Seerah",
  "Tafsir",
  "Hadith",
  "Fiqh",
  "Arabic",
  "Tazkiyah",
  "Children",
] as const;

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const productsByCategory = (key: CategoryKey) => PRODUCTS.filter((p) => p.category === key);
export const formatPrice = (n: number) => `₹${n.toLocaleString()}`;