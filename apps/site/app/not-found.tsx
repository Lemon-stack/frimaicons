import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-2xl font-semibold">Logo not found</h1>
      <p className="mt-2 text-muted">We don&apos;t have that one yet.</p>
      <Link href="/" className="mt-6 inline-block text-accent hover:underline">
        Browse all icons
      </Link>
    </div>
  );
}
