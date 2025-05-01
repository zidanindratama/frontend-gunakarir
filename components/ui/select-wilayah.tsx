"use client";

import React from "react";
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
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface SelectWilayahProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { id: string; name: string }[];
  disabled?: boolean;
}

export const SelectWilayah: React.FC<SelectWilayahProps> = ({
  value,
  onChange,
  placeholder,
  options,
  disabled = false,
}) => {
  const selectedLabel = options.find((o) => o.id === value)?.name;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled}
            className={cn(
              "w-full justify-between",
              !value && "text-muted-foreground"
            )}
          >
            {selectedLabel || placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>Tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.id}
                  value={opt.name}
                  onSelect={() => onChange(opt.id)}
                >
                  {opt.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      opt.id === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
