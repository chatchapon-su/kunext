import Image from "next/image";
//npx next start -p 5000

export default function Home() {
  return (
    <div className="bg-black grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="flex text-5xl">
          <h1 className="text-gray-100">We</h1>
          <h1 className="text-gray-200 text-4xl">lc</h1>
          <h1 className="text-gray-300 text-3xl">o</h1>
          <h1 className="text-gray-400 text-2xl">m</h1>
          <h1 className="text-gray-500 text-xl">e</h1>
          <h1 className="text-gray-600 mx-5 text-lg">to</h1>

          <h1 className="text-gray-100">Tsunami</h1>
          <Image
            className="invert"
            src="/tsunami.png"
            alt="Tsunami logo"
            width={50}
            height={50}
            priority
          />
        </div>
        
        
 
      </main>
    </div>
  );
}
