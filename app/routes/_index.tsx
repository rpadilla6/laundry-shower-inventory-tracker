import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="object-cover w-full h-full"
                src="https://images.squarespace-cdn.com/content/v1/5bfc306ac258b431923c4b3b/1698797633285-M2N840JFY35DGFDOIMTD/_MG_2935%252B%2525281%252529.jpg?format=2500w"
                alt="BTS playing on stage with the group leaving in action poses"
              />
              <div className="absolute inset-0 bg-[color:rgba(139,92,246,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pt-16 pb-8 lg:pb-18 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
              <h1 className="text-6xl font-extrabold tracking-tight text-center sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-violet-200 drop-shadow-md">
                  Laundry Shower Resource Tracker
                </span>
              </h1>
              <div className="max-w-sm mx-auto mt-10 sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/entries"
                    className="flex items-center justify-center px-4 py-3 text-lg font-medium bg-white border border-transparent rounded-md shadow-sm text-violet-700 hover:bg-violet-50 sm:px-8"
                  >
                    Start Tracking
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center px-4 py-3 text-base font-medium bg-white border border-transparent rounded-md shadow-sm text-violet-700 hover:bg-violet-50 sm:px-8"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center px-4 py-3 font-medium text-white rounded-md bg-violet-500 hover:bg-violet-600 "
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
              <a href="https://remix.run">
                <img
                  src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                  alt="Remix"
                  className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            {[
              {
                src: "https://user-images.githubusercontent.com/43764894/223575102-b784690b-19a6-4e7a-b72c-8ac42c736a71.png",
                alt: "Netlify",
                href: "https://netlify.com",
              },
              {
                src: "https://user-images.githubusercontent.com/8431042/158711352-746c52cf-433e-4823-987a-c9d6f4349ce7.svg",
                alt: "Supabase",
                href: "https://supabase.com",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg",
                alt: "Tailwind",
                href: "https://tailwindcss.com",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
                alt: "Cypress",
                href: "https://www.cypress.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
                alt: "Testing Library",
                href: "https://testing-library.com",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
                alt: "Prettier",
                href: "https://prettier.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
                alt: "ESLint",
                href: "https://eslint.org",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
                alt: "TypeScript",
                href: "https://typescriptlang.org",
              },
            ].map((img) => (
              <a
                key={img.href}
                href={img.href}
                className="flex justify-center w-32 h-16 p-1 transition grayscale hover:grayscale-0 focus:grayscale-0"
              >
                <img alt={img.alt} src={img.src} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
