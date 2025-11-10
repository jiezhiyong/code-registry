export type {
  As,
  CapitalizedDOMElements,
  DOMAttributes,
  DOMElement,
  DOMElements,
  ExtendVariantProps,
  ExtendVariants,
  ExtendVariantWithSlotsProps,
  HTMLHeroUIProps,
  InternalForwardRefRenderFunction,
  Merge,
  MergeWithAs,
  OmitCommonProps,
  PropGetter,
  PropsOf,
  RightJoinProps,
  SharedSelection,
} from "../system-rsc";

export {
  extendVariants,
  forwardRef,
  isHeroUIEl,
  mapPropsVariants,
  mapPropsVariantsWithCommon,
  toIterator,
} from "../system-rsc";

export type { HeroUIProviderProps } from "./provider";
export type { ProviderContextProps } from "./provider-context";

export { HeroUIProvider } from "./provider";
export { ProviderContext, useProviderContext } from "./provider-context";

export { useInputLabelPlacement, useLabelPlacement } from "./use-label-placement";
