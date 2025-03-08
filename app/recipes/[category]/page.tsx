import { categories } from "@/data/categories";
import { Recipe } from "@/types/recipe";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import Link from "next/link";

const recipesDir = path.join(process.cwd(), "data", "recipes");

// Fetch all recipes from Markdown files
async function getRecipes(): Promise<Recipe[]> {
  const categories = ["meals", "desserts", "drinks"];
  const allRecipes: Recipe[] = [];

  for (const category of categories) {
    const dirPath = path.join(recipesDir, category);
    try {
      const files = await fs.readdir(dirPath);
      const markdownFiles = files.filter((file) => file.endsWith(".md"));

      const recipes = await Promise.all(
        markdownFiles.map(async (file) => {
          const filePath = path.join(dirPath, file);
          const fileContent = await fs.readFile(filePath, "utf-8");
          const { data, content } = matter(fileContent);

          return {
            slug: file.replace(".md", ""), // e.g., "gochujang-chicken"
            title: data.title as string,
            category: data.category as "drinks" | "desserts" | "meals",
            prepTime: data.prepTime as string | undefined,
            content: content.trim(),
          };
        })
      );

      allRecipes.push(...recipes);
    } catch (error) {
      console.error(`Error reading recipes from ${category}:`, error);
    }
  }

  return allRecipes;
}

let cachedRecipes: Recipe[] | null = null;
async function getCachedRecipes() {
  if (!cachedRecipes) {
    cachedRecipes = await getRecipes();
  }
  return cachedRecipes;
}

export async function generateStaticParams() {
    return categories.map((category) => ({
      category: category.slug,
    }));
  }

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = categories.find((c) => c.slug === category);

  if (!categoryData) {
    return { notFound: true };
  }

  const recipes = await getCachedRecipes();
  const categoryRecipes = recipes.filter((recipe) => recipe.category === category);
  const topRecipes = categoryRecipes.slice(0, 3);

  return (
    <div>
      <h1>{categoryData.title}</h1>
      <p>{categoryData.description}</p>
      <h2>Top Recipes</h2>
      {topRecipes.length > 0 ? (
        <ul>
          {topRecipes.map((recipe) => (
            <li key={recipe.slug}>
              <Link href={`/recipes/${category}/${recipe.slug}`}>
                {recipe.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes available in this category.</p>
      )}
    </div>
  );
}