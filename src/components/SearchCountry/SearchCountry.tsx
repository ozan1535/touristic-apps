"use client";
import { useState } from "react";
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
import { allCountriesEN } from "@/lib/helpers";
import { useLanguage } from "@/app/context/SelectedLanguage";

const countries = allCountriesEN
  .map((country) => ({
    value: country.name,
    label: country.name,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export function SearchCountry() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const handleCountryUpdate = (selectedCountry: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("country", selectedCountry.toLocaleLowerCase());

    router.replace(`?${params.toString()}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? countries.find((framework) => framework.value === value)?.label
            : language === "en"
            ? "Search a Country..."
            : "Bir ülke ara"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput
            placeholder={
              language === "en" ? "Search a Country..." : "Bir ülke ara"
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
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    handleCountryUpdate(
                      currentValue === value ? "" : currentValue
                    );
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
