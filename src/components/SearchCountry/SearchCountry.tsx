/* "use client";
import { useEffect, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { allCountries } from "@/lib/helpers";
import { useLanguage } from "@/app/context/SelectedLanguage";
import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";

export function SearchCountry() {
  const language = useLocale() as "en" | "tr";
  const [open, setOpen] = useState(false);
  //const [value, setValue] = useState("");

  const countries = allCountries
    .map((country) => ({
      value: country.name[language],
      label: country.name[language],
      icon: country.flag,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {language === "en" ? "Search for a country..." : "Bir ülke ara..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandInput
            placeholder={
              language === "en" ? "Search for a Country..." : "Bir Ülke Ara..."
            }
          />
          <CommandList>
            <CommandEmpty>
              {language === "en"
                ? "We couldn't find any country."
                : "Herhangi bir ülke bulamadık"}
            </CommandEmpty>
            <CommandGroup>
              {countries.map((framework) => (
                <Link
                  href={`/${allCountries
                    .find(
                      (country) => country.name[language] === framework.label
                    )
                    ?.cca2.toLowerCase()}`}
                  key={framework.value}
                >
                  <CommandItem value={framework.value}>
                    <CheckIcon className={cn("mr-2 h-4 w-4", "opacity-0")} />
                    <Image src={framework.icon} width={20} height={5} alt={`${framework.value} flag`} />
                    {framework.label}
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
 */

"use client";
import { useState } from "react";
import { CheckIcon, ChevronsUpDownIcon, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocale } from "next-intl";
import Image from "next/image";
import { getSortedCountries, handleSelect } from "./SearchCountry.helpers";

export function SearchCountry({
  placeholderTranslation,
  emptyTranslation,
}: {
  placeholderTranslation: string;
  emptyTranslation: string;
}) {
  const language = useLocale() as "en" | "tr";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const sortedCountries = getSortedCountries(language);

  const selectedCountry = sortedCountries.find(
    (country) => country.value === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-14 text-base bg-slate-900/50 border-purple-500/30 hover:border-purple-500/50 hover:bg-slate-900/70 hover:text-secondary text-gray-300"
        >
          <div className="flex items-center gap-3">
            <Search size={20} className="text-purple-400" />
            {selectedCountry ? (
              <>
                <span className="text-white">{selectedCountry.label}</span>
              </>
            ) : (
              <span>{placeholderTranslation}</span>
            )}
          </div>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 bg-slate-900 border-purple-500/30"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command className="bg-slate-900">
          <CommandInput
            placeholder={placeholderTranslation}
            className="text-gray-300"
          />
          <CommandList>
            <CommandEmpty className="text-gray-400 py-6 text-center">
              {emptyTranslation}
            </CommandEmpty>
            <CommandGroup>
              {sortedCountries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(value) =>
                    handleSelect(
                      value,
                      sortedCountries,
                      setValue,
                      setOpen,
                      router,
                      language
                    )
                  }
                  className="cursor-pointer text-gray-300"
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <Image
                    src={country.icon}
                    width={20}
                    height={5}
                    alt={`${country.value} flag`}
                  />
                  <span>{country.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
