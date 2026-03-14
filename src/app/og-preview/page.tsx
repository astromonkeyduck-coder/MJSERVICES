"use client";

// Local preview page - visit /og-preview when dev server is running
export default function OGPreviewPage() {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-white text-xl font-medium mb-6">OG Image Preview</h1>
      <p className="text-zinc-400 text-sm mb-4">
        This is how your link will look when shared on social media (1200×630)
      </p>
      <div className="border-2 border-zinc-600 rounded-lg overflow-hidden shadow-2xl">
        <img
          src="/api/og"
          alt="OG Preview"
          width={1200}
          height={630}
          className="block max-w-full h-auto"
        />
      </div>
      <p className="text-zinc-500 text-xs mt-6 max-w-lg text-center space-y-2">
        <span className="block">
          If the image doesn&apos;t load: stop dev, then run{" "}
          <code className="bg-zinc-800 px-2 py-1 rounded">npm run preview</code>
        </span>
        <span className="block">
          Or try <code className="bg-zinc-800 px-2 py-1 rounded">npm run dev:webpack</code> instead of{" "}
          <code className="bg-zinc-800 px-2 py-1 rounded">npm run dev</code>
        </span>
      </p>
    </div>
  );
}
