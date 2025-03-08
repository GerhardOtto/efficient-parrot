export type Recipe = {
  slug: string;
  title: string;
  category: "drinks" | "desserts" | "meals";
  prepTime?: string;
  content: string;
}