import React from "react";
import { Tag } from "./tag";
import { cn } from "@/lib/utils";

export const TagList = ({
  tags,
  customTagRenderer,
  direction,
  ...tagProps
}) => {
  return (
    <div
      className={cn("rounded-md max-w-[450px]", {
        "flex flex-wrap gap-2": direction === "row",
        "flex flex-col gap-2": direction === "column",
      })}
    >
      {tags.map((tagObj) =>
        customTagRenderer ? (
          customTagRenderer(tagObj)
        ) : (
          <Tag key={tagObj.id} tagObj={tagObj} {...tagProps} />
        )
      )}
    </div>
  );
};
