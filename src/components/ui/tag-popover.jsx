import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TagList } from "./tag-list";

export const TagPopover = ({ children, tags, customTagRenderer, ...tagProps }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-full max-w-[450px] space-y-3">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Entered Tags</h4>
          <p className="text-sm text-muted-foreground text-left">
            These are the tags you&apos;ve entered.
          </p>
        </div>
        <TagList
          tags={tags}
          customTagRenderer={customTagRenderer}
          {...tagProps}
        />
      </PopoverContent>
    </Popover>
  );
};
