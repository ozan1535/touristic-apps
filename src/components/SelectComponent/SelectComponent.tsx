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
  return (
    // TODO: Fix SelectValue color after selecting and item
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className={customStyle || "w-[180px]"}>
        <SelectValue placeholder={customPlaceholder || "All"} />
      </SelectTrigger>
      <SelectContent className="bg-slate-900 text-secondary">
        <SelectGroup>
          {canShowAll && <SelectItem value="All">All</SelectItem>}
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
