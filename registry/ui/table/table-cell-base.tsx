import type { HTMLHeroUIProps } from "@/lib/system";
import type { CellProps } from "@react-types/table";

import { Cell } from "@react-stately/table";
import { JSX } from "react";

export type TableCellProps = CellProps & HTMLHeroUIProps<"td">;

const TableCell = Cell as (props: TableCellProps) => JSX.Element;

export default TableCell;
