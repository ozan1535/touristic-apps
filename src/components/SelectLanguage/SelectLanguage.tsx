// "use client";

// import React from "react";
// import Image from "next/image";
// import { ChevronDown } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { usePathname, useRouter } from "@/i18n/navigation";
// import { useParams } from "next/navigation";
// /* import { useLanguage } from "@/app/context/SelectedLanguage";
//  */
// function SelectLanguage() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const params = useParams();
//   const { locale } = params;
//   /* const { language, setLanguage } = useLanguage(); */
//   const languages = [
//     { code: "EN", name: "English", flag: "/english-flag.png" },
//     { code: "TR", name: "Türkçe", flag: "/turkish-flag.webp" },
//   ];

//   /* useEffect(() => {
//     const storedLang = localStorage.getItem("language");
//     if (storedLang) {
//       setLanguage(storedLang.toLocaleLowerCase() as "en" | "tr");
//     }
//   }, []); */

//   const handleLanguageSelect = (code: "en" | "tr") => {
//     router.replace(
//       // @ts-expect-error -- TypeScript will validate that only known `params`
//       // are used in combination with a given `pathname`. Since the two will
//       // always match for the current route, we can skip runtime checks.
//       { pathname, params },
//       { locale: code.toLowerCase() }
//     );
//   };

//   /*  const selected =
//     languages.find(
//       (lang) => lang.code.toLocaleLowerCase() === language.toLocaleLowerCase()
//     ) || languages[0]; */
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger className="flex items-center gap-2.5 px-4 py-2 rounded-lg border border-purple-primary hover:bg-gray-50 transition-colors duration-200 shadow-sm outline-none focus:ring-2 focus:ring-gray-300 bg-white">
//         <div className="relative w-7 h-5 rounded overflow-hidden shadow-sm">
//           <Image
//             fill
//             src={
//               languages.find(
//                 (language) => language.code.toLowerCase() === locale
//               )?.flag || ""
//             }
//             alt={`${
//               languages.find(
//                 (language) => language.code.toLowerCase() === locale
//               )?.name || ""
//             } flag`}
//             className="object-cover"
//           />
//         </div>
//         <span className="font-medium text-gray-700 text-sm">
//           {
//             languages.find((language) => language.code.toLowerCase() === locale)
//               ?.code
//           }
//         </span>
//         <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-44 p-1">
//         {languages.map((lang) => (
//           <DropdownMenuItem
//             key={lang.code}
//             onClick={() => handleLanguageSelect(lang.code as "en" | "tr")}
//             className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md focus:bg-gray-100"
//           >
//             <div className="relative w-7 h-5 rounded overflow-hidden shadow-sm flex-shrink-0">
//               <Image
//                 fill
//                 src={lang.flag}
//                 alt={`${lang.name} flag`}
//                 className="object-cover"
//               />
//             </div>
//             <div className="flex flex-col">
//               <span className="font-medium text-gray-900 text-sm">
//                 {lang.code}
//               </span>
//               <span className="text-xs text-gray-500">{lang.name}</span>
//             </div>
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// export default SelectLanguage;

"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";

function SelectLanguage() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const { locale } = params;

  const languages = [
    { code: "EN", name: "English", flag: "/english-flag.png" },
    { code: "TR", name: "Türkçe", flag: "/turkish-flag.webp" },
  ];

  const handleLanguageSelect = (code: "en" | "tr") => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      { pathname, params },
      { locale: code.toLowerCase() }
    );
  };

  const selectedLanguage = languages.find(
    (lang) => lang.code.toLowerCase() === locale
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg border border-purple-400/30 hover:border-purple-400/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-200 outline-none focus:ring-2 focus:ring-purple-400/50">
        <div className="relative w-6 h-4 rounded overflow-hidden">
          <Image
            fill
            src={selectedLanguage?.flag || ""}
            alt={`${selectedLanguage?.name || ""} flag`}
            className="object-cover"
          />
        </div>
        <span className="font-medium text-gray-200 text-sm">
          {selectedLanguage?.code}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-slate-800 border-purple-400/30">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code as "en" | "tr")}
            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md hover:bg-slate-700/50 focus:bg-slate-700/50 text-gray-200"
          >
            <div className="relative w-7 h-5 rounded overflow-hidden flex-shrink-0">
              <Image
                fill
                src={lang.flag}
                alt={`${lang.name} flag`}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{lang.code}</span>
              <span className="text-xs text-gray-400">{lang.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SelectLanguage;
