// Listbox is based on menu component

////////

/**
 * Listbox wrapper **Tailwind Variants** component
 *
 * const classNames = listbox({...})
 */
export { menu as listbox } from "@/registry/ui/menu/theme";

/**
 * ListboxItem wrapper **Tailwind Variants** component
 *
 * const {base, heading, indicator, trigger, leftIndicator, title, subtitle, content } = listboxItem({...})
 *
 * @example
 * <div className={base())} data-focus-visible={boolean} data-hover={boolean}>
 *   <div className={heading())}>
 *    <button className={trigger())}>
 *      <div className={leftIndicator()}>
 *         // content
 *      </div>
 *      <div className={titleWrapper()}>
 *        <h3 className={title())}>Title</h3>
 *        <span className={subtitle())}>Subtitle</span>
 *      </div>
 *      <span className={indicator())}>Indicator</span>
 *    </button>
 *  </div>
 *  <div className={content())}>Content</div>
 * </div>
 */
export { menuItem as listboxItem } from "@/registry/ui/menu/theme";

/**
 * Listbox section wrapper **Tailwind Variants** component
 *
 * const { base, section, heading } = listboxSection({...})
 *
 * @example
 * <div className={base()}>
 *  <button className={trigger()} aria-expanded="true/false">your trigger</button>
 *  <div className={section()}>
 *    // menu content
 *    <span className={arrow()} data-placement="top/bottom/left/right..." /> // arrow
 *  </div>
 * </div>
 */
export { menuSection as listboxSection } from "@/registry/ui/menu/theme";

// export types
export type {
  MenuItemSlots as ListboxItemSlots, MenuItemVariantProps as ListboxItemVariantProps, MenuSectionSlots as ListboxSectionSlots, MenuSectionVariantProps as ListboxSectionVariantProps,
  MenuSlots as ListboxSlots, MenuVariantProps as ListboxVariantProps
} from "@/registry/ui/menu/theme";

