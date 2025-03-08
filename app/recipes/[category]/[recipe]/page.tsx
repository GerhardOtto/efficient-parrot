import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import { Recipe } from "@/types/recipe";

const recipesDir = path.join(process.cwd(), "data", "recipes");


export async function generateStaticParams() {
  const categories = ["meals", "desserts", "drinks"];
  const allParams: { category: string; recipe: string }[] = [];

  for (const category of categories) {
    const dirPath = path.join(recipesDir, category);
    try {
      const files = await fs.readdir(dirPath);
      const markdownFiles = files.filter((file) => file.endsWith(".md"));

      const recipeParams = markdownFiles.map((file) => ({
        category,
        recipe: file.replace(".md", ""),
      }));

      allParams.push(...recipeParams);
    } catch (error) {
      console.error(`Error reading recipes from ${category}:`, error);
    }
  }

  return allParams;
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ category: string; recipe: string }>;
}) {
  const { category, recipe } = await params;

  const filePath = path.join(recipesDir, category, `${recipe}.md`);
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const recipeData: Recipe = {
      slug: recipe,
      title: data.title as string,
      category: data.category as "drinks" | "desserts" | "meals",
      prepTime: data.prepTime as string | undefined,
      content: content.trim(),
    };

    return (
      <div>
        <h1>{recipeData.title}</h1>
        <p>Prep Time: {recipeData.prepTime || "N/A"}</p>
        <Markdown>{recipeData.content}</Markdown>
      </div>
    );
  } catch (error) {
    console.error(`Error loading recipe ${recipe} in ${category}:`, error);
    return <div>Recipe not found</div>;
  }
}