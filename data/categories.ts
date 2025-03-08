import { Category } from "@/types/category";

export const meals: Category = {
    slug: "meals",
    title: "Meals",
    description: "Hearty and filling meals for the whole family.",
};

export const desserts: Category = {
    slug: "desserts",
    title: "Desserts",
    description: "Sweet treats to satisfy your sweet tooth.",
};

export const drinks: Category = {
    slug: "drinks",
    title: "Drinks",
    description: "Refreshing beverages to quench your thirst.",
};

export const categories = [meals, desserts, drinks];