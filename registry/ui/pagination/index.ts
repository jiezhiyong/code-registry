import Pagination from "./pagination";
import PaginationCursor from "./pagination-cursor";
import PaginationItem from "./pagination-item";

// export types
export type { PaginationProps } from "./pagination";
export type { PaginationCursorProps } from "./pagination-cursor";
export type { PaginationItemProps } from "./pagination-item";
export type { PaginationItemRenderProps } from "./use-pagination";

// misc
export { PaginationItemType } from "@/lib/hooks/use-pagination";
export type { PaginationItemValue } from "@/lib/hooks/use-pagination";

// export hooks
export { usePagination } from "./use-pagination";
export { usePaginationItem } from "./use-pagination-item";

// export component
export { Pagination, PaginationCursor, PaginationItem };
