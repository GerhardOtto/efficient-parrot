import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-10 pt-6">
      <h1>Recipes</h1>
      <div className="flex flex-col gap-4">
        <Link href="/recipes/meals">Meals</Link>
        <Link href="/recipes/desserts">Desserts</Link>
        <Link href="/recipes/drinks">Drinks</Link>
      </div>
    </div>
  );
}
