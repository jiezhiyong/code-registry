import type { MenuTriggerAction as BaseMenuTriggerAction } from "@react-types/combobox";
import type { ListboxItemProps, ListboxSectionProps } from "../listbox";

import Autocomplete from "./autocomplete";

import { ListboxItem, ListboxSection } from "../listbox";

// export types
export type { AutocompleteProps } from "./autocomplete";
export type { ListboxItemProps as AutocompleteItemProps, ListboxSectionProps as AutocompleteSectionProps };
export type MenuTriggerAction = BaseMenuTriggerAction | undefined;

// export hooks
export { useAutocomplete } from "./use-autocomplete";

// export components
export { Autocomplete, ListboxItem as AutocompleteItem, ListboxSection as AutocompleteSection };
