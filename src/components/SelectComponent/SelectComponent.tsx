"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";

function SelectComponent({
  categories,
  handleValueChange,
  canShowAll = true,
  customStyle = "",
  customPlaceholder = "",
}: {
  categories: string[];
  handleValueChange: (selectedItem: string) => void;
  canShowAll?: boolean;
  customStyle?: string;
  customPlaceholder?: string;
}) {
  const { locale } = useParams();
  const allText = locale === "en" ? "All" : "Tümü";
  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className={customStyle || "w-[180px]"}>
        <SelectValue placeholder={customPlaceholder || allText} />
      </SelectTrigger>
      <SelectContent className="bg-white text-slate-900">
        <SelectGroup>
          {canShowAll && <SelectItem value="All">{allText}</SelectItem>}
          {categories.map((item) => (
            <SelectItem value={item} key={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectComponent;
