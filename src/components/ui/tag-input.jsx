"use client";

import React, { forwardRef, useState, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { tagVariants } from "./tag";
import { CommandInput } from "@/components/ui/command";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { TagPopover } from "./tag-popover";
import { TagList } from "./tag-list";
import { Autocomplete } from "./auto-complete";

export const Delimiter = {
  Comma: ",",
  Enter: "Enter",
  Space: " ",
};

const TagInput = forwardRef((props, ref) => {
  const {
    id,
    placeholder,
    tags,
    setTags,
    variant,
    size,
    shape,
    className,
    enableAutocomplete,
    autocompleteOptions,
    maxTags,
    delimiter = Delimiter.Comma,
    onTagAdd,
    onTagRemove,
    allowDuplicates,
    showCount,
    validateTag,
    placeholderWhenFull = "Max tags reached",
    sortTags,
    delimiterList,
    truncate,
    autocompleteFilter,
    borderStyle,
    textCase,
    interaction,
    animation,
    textStyle,
    minLength,
    maxLength,
    direction = "row",
    onInputChange,
    customTagRenderer,
    onFocus,
    onBlur,
    onTagClick,
    draggable = false,
    inputFieldPostion = "bottom",
    clearAll = false,
    onClearAll,
    usePopoverForTags = false,
    inputProps = {},
  } = props;

  const [inputValue, setInputValue] = useState("");
  const [tagCount, setTagCount] = useState(Math.max(0, tags.length));
  const inputRef = useRef(null);
  const [draggedTagId, setDraggedTagId] = useState(null);

  if (
    (maxTags !== undefined && maxTags < 0) ||
    (props.minTags !== undefined && props.minTags < 0)
  ) {
    console.warn("maxTags and minTags cannot be less than 0");
    toast({
      title: "maxTags and minTags cannot be less than 0",
      description:
        "Please set maxTags and minTags to a value greater than or equal to 0",
      variant: "destructive",
    });
    return null;
  }

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onInputChange?.(newValue);
  };

  const handleKeyDown = (e) => {
    if (
      delimiterList
        ? delimiterList.includes(e.key)
        : e.key === delimiter || e.key === Delimiter.Enter
    ) {
      e.preventDefault();
      const newTagText = inputValue.trim();

      if (validateTag && !validateTag(newTagText)) {
        return;
      }

      if (minLength && newTagText.length < minLength) {
        console.warn("Tag is too short");
        toast({
          title: "Tag is too short",
          description: "Please enter a tag with more characters",
          variant: "destructive",
        });
        return;
      }

      // Validate maxLength
      if (maxLength && newTagText.length > maxLength) {
        toast({
          title: "Tag is too long",
          description: "Please enter a tag with less characters",
          variant: "destructive",
        });
        console.warn("Tag is too long");
        return;
      }

      const newTagId = uuid();

      if (
        newTagText &&
        (allowDuplicates || !tags.some((tag) => tag.text === newTagText)) &&
        (maxTags === undefined || tags.length < maxTags)
      ) {
        setTags([...tags, { id: newTagId, text: newTagText }]);
        onTagAdd?.(newTagText);
        setTagCount((prevTagCount) => prevTagCount + 1);
      }
      setInputValue("");
    }
  };

  const removeTag = (idToRemove) => {
    setTags(tags.filter((tag) => tag.id !== idToRemove));
    onTagRemove?.(tags.find((tag) => tag.id === idToRemove)?.text || "");
    setTagCount((prevTagCount) => prevTagCount - 1);
  };

  const handleDragStart = (id) => {
    setDraggedTagId(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (id) => {
    if (draggedTagId === null) return;

    const draggedTagIndex = tags.findIndex((tag) => tag.id === draggedTagId);
    const dropTargetIndex = tags.findIndex((tag) => tag.id === id);

    if (draggedTagIndex === dropTargetIndex) return;

    const newTags = [...tags];
    const [reorderedTag] = newTags.splice(draggedTagIndex, 1);
    newTags.splice(dropTargetIndex, 0, reorderedTag);

    setTags(newTags);
    setDraggedTagId(null);
  };

  const handleClearAll = () => {
    onClearAll?.();
  };

  const filteredAutocompleteOptions = autocompleteFilter
    ? autocompleteOptions?.filter((option) => autocompleteFilter(option.text))
    : autocompleteOptions;

  const displayedTags = sortTags ? [...tags].sort() : tags;

  const truncatedTags = truncate
    ? tags.map((tag) => ({
        id: tag.id,
        text:
          tag.text?.length > truncate
            ? `${tag.text.substring(0, truncate)}...`
            : tag.text,
      }))
    : displayedTags;

  return (
    <div
      className={`w-full flex gap-3 ${
        inputFieldPostion === "bottom"
          ? "flex-col"
          : inputFieldPostion === "top"
          ? "flex-col-reverse"
          : "flex-row"
      }`}
    >
      {!usePopoverForTags ? (
        <TagList
          tags={truncatedTags}
          customTagRenderer={customTagRenderer}
          variant={variant}
          size={size}
          shape={shape}
          borderStyle={borderStyle}
          textCase={textCase}
          interaction={interaction}
          animation={animation}
          textStyle={textStyle}
          onTagClick={onTagClick}
          draggable={draggable}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          onRemoveTag={removeTag}
          direction={direction}
        />
      ) : null}
      {enableAutocomplete ? (
        <div className="w-full max-w-[450px]">
          <Autocomplete
            tags={tags}
            setTags={setTags}
            autocompleteOptions={filteredAutocompleteOptions}
            maxTags={maxTags}
            onTagAdd={onTagAdd}
            allowDuplicates={allowDuplicates ?? false}
          >
            {!usePopoverForTags ? (
              <CommandInput
                placeholder={
                  maxTags !== undefined && tags.length >= maxTags
                    ? placeholderWhenFull
                    : placeholder
                }
                ref={inputRef}
                value={inputValue}
                disabled={maxTags !== undefined && tags.length >= maxTags}
                onChangeCapture={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                className="w-full"
              />
            ) : (
              <TagPopover
                tags={truncatedTags}
                customTagRenderer={customTagRenderer}
                variant={variant}
                size={size}
                shape={shape}
                borderStyle={borderStyle}
                textCase={textCase}
                interaction={interaction}
                animation={animation}
                textStyle={textStyle}
                onTagClick={onTagClick}
                draggable={draggable}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                onRemoveTag={removeTag}
                direction={direction}
              >
                <CommandInput
                  placeholder={
                    maxTags !== undefined && tags.length >= maxTags
                      ? placeholderWhenFull
                      : placeholder
                  }
                  ref={inputRef}
                  value={inputValue}
                  disabled={maxTags !== undefined && tags.length >= maxTags}
                  onChangeCapture={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  className="w-full"
                />
              </TagPopover>
            )}
          </Autocomplete>
        </div>
      ) : (
        <div className="w-full">
          {!usePopoverForTags ? (
            <Input
              ref={inputRef}
              id={id}
              type="text"
              placeholder={
                maxTags !== undefined && tags.length >= maxTags
                  ? placeholderWhenFull
                  : placeholder
              }
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
              {...inputProps}
              className={className}
              autoComplete={enableAutocomplete ? "on" : "off"}
              list={enableAutocomplete ? "autocomplete-options" : undefined}
              disabled={maxTags !== undefined && tags.length >= maxTags}
            />
          ) : (
            <TagPopover
              tags={truncatedTags}
              customTagRenderer={customTagRenderer}
              variant={variant}
              size={size}
              shape={shape}
              borderStyle={borderStyle}
              textCase={textCase}
              interaction={interaction}
              animation={animation}
              textStyle={textStyle}
              onTagClick={onTagClick}
              draggable={draggable}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              onRemoveTag={removeTag}
              direction={direction}
            >
              <Input
                ref={inputRef}
                id={id}
                type="text"
                placeholder={
                  maxTags !== undefined && tags.length >= maxTags
                    ? placeholderWhenFull
                    : placeholder
                }
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                {...inputProps}
                className={className}
                autoComplete={enableAutocomplete ? "on" : "off"}
                list={enableAutocomplete ? "autocomplete-options" : undefined}
                disabled={maxTags !== undefined && tags.length >= maxTags}
              />
            </TagPopover>
          )}
        </div>
      )}
      {showCount && maxTags && (
        <div className="flex">
          <span className="text-muted-foreground text-sm mt-1 ml-auto">
            {`${tagCount}`}/{`${maxTags}`}
          </span>
        </div>
      )}
      {clearAll && (
        <Button type="button" onClick={handleClearAll} className="mt-2">
          Clear All
        </Button>
      )}
    </div>
  );
});

TagInput.displayName = "TagInput";

export { TagInput };
