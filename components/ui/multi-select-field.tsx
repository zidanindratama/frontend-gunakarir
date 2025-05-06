"use client";

import { useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { ChevronsUpDown } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type MultiSelectFieldProps<
  TOption extends Record<string, unknown>,
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>
> = {
  options: TOption[];
  field: ControllerRenderProps<TFormValues, TFieldName>;
  valueKey: keyof TOption & string;
  labelKey: keyof TOption & string;
  placeholder?: string;
  disabled?: boolean;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  fetchMore?: () => void;
  hasMore?: boolean;
};

export function MultiSelectField<
  TOption extends Record<string, unknown>,
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>
>({
  options,
  field,
  valueKey,
  labelKey,
  placeholder = "Select...",
  disabled = false,
  searchValue,
  onSearchChange,
  fetchMore,
  hasMore,
}: MultiSelectFieldProps<TOption, TFormValues, TFieldName>) {
  const [open, setOpen] = useState(false);

  const toggleSelect = (id: string) => {
    const currentValue = (field.value ?? []) as string[];
    const newValue = currentValue.includes(id)
      ? currentValue.filter((v) => v !== id)
      : [...currentValue, id];
    field.onChange(newValue);
  };

  const selectedOptions = options.filter((opt) =>
    (field.value ?? []).includes(opt[valueKey] as never)
  );

  const selectedLabels = selectedOptions
    .slice(0, 2)
    .map((opt) => String(opt[labelKey]))
    .join(", ");

  const displayLabel =
    selectedOptions.length > 2
      ? `${selectedLabels}, +${selectedOptions.length - 2} lainnya`
      : selectedLabels;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          className="w-full justify-between truncate font-normal"
        >
          <span className="truncate">{displayLabel || placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 max-h-72" // Hapus overflow-y-auto di sini
        align="start"
      >
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(val) => onSearchChange?.(val)}
            placeholder="Cari..."
          />
          <CommandList
            className="max-h-60 overflow-y-auto" // Tambahkan scroll di sini
            onScroll={(e) => {
              const bottom =
                e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
                e.currentTarget.clientHeight;
              if (bottom && hasMore) {
                fetchMore?.();
              }
            }}
          >
            <CommandEmpty>Tidak ada opsi ditemukan.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => {
                const value = item[valueKey] as string;
                const label = item[labelKey] as string;
                const isSelected = (field.value ?? []).includes(value as never);

                return (
                  <CommandItem
                    key={value}
                    value={label}
                    aria-selected={false}
                    onSelect={() => toggleSelect(value)}
                    className={cn(isSelected && "bg-muted dark:bg-muted/70")}
                  >
                    <Checkbox checked={isSelected} className="mr-2" />
                    {label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
