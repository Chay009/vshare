import React from "react";
import {
  Command,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";

export const Autocomplete = ({
  tags,
  setTags,
  autocompleteOptions,
  maxTags,
  onTagAdd,
  allowDuplicates,
  children,
}) => {
  return (
    <Command className="border">
      {children}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {autocompleteOptions.map((option) => (
            <CommandItem key={option.id}>
              <div
                onClick={() => {
                  if (maxTags && tags.length >= maxTags) return;
                  if (
                    !allowDuplicates &&
                    tags.some((tag) => tag.text === option.text)
                  )
                    return;
                  setTags([...tags, option]);
                  onTagAdd?.(option.text);
                }}
              >
                {option.text}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
