import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prompt Rock by Xenon',
  description: 'Refine your prompts with advanced optimization powered by OpenRouter',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Geist+Mono:wght@400;500&display=swap" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" defer></script>
      </head>
      <body className="antialiased bg-surface text-on-surface">
        {children}
      </body>
    </html>
  );
}
