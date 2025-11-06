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
          className="w-full justify-between h-14 text-base bg-white border-indigo-200 hover:border-indigo-400 hover:bg-blue-50 text-slate-800 hover:text-slate-800"
        >
          <div className="flex items-center gap-3">
            <Search size={20} className="text-blue-500" />
            {selectedCountry ? (
              <>
                <span className="text-slate-900">{selectedCountry.label}</span>
              </>
            ) : (
              <span>{placeholderTranslation}</span>
            )}
          </div>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 bg-white border-indigo-200"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command className="bg-white">
          <CommandInput
            placeholder={placeholderTranslation}
            className="text-slate-800"
          />
          <CommandList>
            <CommandEmpty className="text-slate-500 py-6 text-center">
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
                  className="cursor-pointer text-slate-800"
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
