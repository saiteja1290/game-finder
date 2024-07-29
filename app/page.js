// import Link from 'next/link';
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   return (
//     <div className="container mx-auto max-w-2xl mt-20 text-center">
//       <h1 className="text-4xl font-bold mb-6">Welcome to Game Finder</h1>
//       <p className="text-xl mb-8">Find and join local games in your area!</p>
//       <div className="space-x-4">
//         <Link href="/register">
//           <Button size="lg">Register</Button>
//         </Link>
//         <Link href="/login">
//           <Button size="lg" variant="outline">Login</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useScroll, useTransform } from "framer-motion";
// import React from "react";
// // import { GoogleGeminiEffect } from "../ui/google-gemini-effect";
// // import { GoogleGeminiEffect } from "./components/ui/google-gemini-effect";
// // import { GoogleGeminiEffect } from "./components/ui/google-gemini-effect";
// import { GoogleGeminiEffect } from "./components/ui/google-gemini-effect";

// export default function GoogleGeminiEffectDemo() {
//   const ref = React.useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });

//   const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
//   const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
//   const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
//   const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
//   const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

//   return (
//     <div
//       className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
//       ref={ref}
//     >
//       <GoogleGeminiEffect
//         pathLengths={[
//           pathLengthFirst,
//           pathLengthSecond,
//           pathLengthThird,
//           pathLengthFourth,
//           pathLengthFifth,
//         ]}
//       />
//     </div>
//   );
// }
// import React from "react";
// // import { Vortex } from "../ui/vortex";
// import { Vortex } from "./components/ui/vortex";

// export default function VortexDemo() {
//   return (
//     <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
//       <Vortex
//         backgroundColor="black"
//         className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
//       >
//         <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
//           The hell is this?
//         </h2>
//         <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
//           This is chemical burn. It&apos;ll hurt more than you&apos;ve ever been
//           burned and you&apos;ll have a scar.
//         </p>
//         <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
//           <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
//             Order now
//           </button>
//           <button className="px-4 py-2  text-white ">Watch trailer</button>
//         </div>
//       </Vortex>
//     </div>
//   );
// }
"use client";
// import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import Link from 'next/link';
import { TypewriterEffectSmooth } from "./components/ui/typewriter-effect";
export default function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Play",
    },
    {
      text: "with",
    },
    {
      text: "Random",
    },
    {
      text: "People",
    },
    {
      text: "Aceternity.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Make new homies
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href="/register">
          <button className="w-40 h-10 rounded-xl  border dark:border-white border-black text-white text-sm">
            Join now
          </button>
        </Link>
        <Link href="/login">
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm" href='/login'>
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
}
