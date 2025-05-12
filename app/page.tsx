import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 bg-gradient-to-b from-blue-50 to-pink-50">
      <main className="flex flex-col gap-10 items-center justify-center max-w-6xl mx-auto pt-10">
        <h1 className="text-6xl md:text-7xl font-black text-center bg-yellow-400 px-6 py-4 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] transform rotate-[-1deg]">
          INSTAGRAM ARCHIVER
        </h1>

        <p className="text-xl md:text-2xl text-center max-w-3xl font-medium">
          A Neo Brutalist approach to archiving Instagram content
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
          <Link
            href="/users"
            className="flex flex-col items-center justify-center p-8 bg-cyan-500 border-4 border-black text-white font-bold text-xl transition-all transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] shadow-[6px_6px_0px_rgba(0,0,0,1)]"
          >
            <div className="w-16 h-16 mb-4 bg-white rounded-full border-4 border-black flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan-500"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span className="text-2xl uppercase">Users</span>
            <span className="text-sm mt-2 opacity-90">Browse Instagram Users</span>
          </Link>

          <Link
            href="/stories"
            className="flex flex-col items-center justify-center p-8 bg-pink-500 border-4 border-black text-white font-bold text-xl transition-all transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] shadow-[6px_6px_0px_rgba(0,0,0,1)]"
          >
            <div className="w-16 h-16 mb-4 bg-white rounded-full border-4 border-black flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-pink-500"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <span className="text-2xl uppercase">Stories</span>
            <span className="text-sm mt-2 opacity-90">View Instagram Stories</span>
          </Link>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="px-6 py-3 bg-black text-white font-bold border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-2">
              <Image
                className="invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              <span>Deploy now</span>
            </div>
          </a>
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center mt-20 border-t-4 border-black pt-8">
        <a
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
