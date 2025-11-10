import type { ListboxItemProps, ListboxSectionProps } from "@/registry/ui/listbox";

import { HiddenSelect } from "./hidden-select";
import Select from "./select";

import { ListboxItem, ListboxSection } from "@/registry/ui/listbox";

// export types
export type { SelectProps } from "./select";
export type { SelectedItemProps, SelectedItems, UseSelectProps } from "./use-select";
export type { ListboxItemProps as SelectItemProps, ListboxSectionProps as SelectSectionProps };

// export hooks
export { useSelect } from "./use-select";

// export component
export { HiddenSelect, Select, ListboxItem as SelectItem, ListboxSection as SelectSection };
