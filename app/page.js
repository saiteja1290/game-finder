import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto max-w-2xl mt-20 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Game Finder</h1>
      <p className="text-xl mb-8">Find and join local games in your area!</p>
      <div className="space-x-4">
        <Link href="/register">
          <Button size="lg">Register</Button>
        </Link>
        <Link href="/login">
          <Button size="lg" variant="outline">Login</Button>
        </Link>
      </div>
    </div>
  );
}