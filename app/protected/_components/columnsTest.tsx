// "use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { SitesProps, CategoryProps } from "@/app/_db/action";

// Correctly define and export the function
export function createColumns(
  categories: CategoryProps[]
): ColumnDef<SitesProps>[] {
  return [
    {
      accessorKey: "site",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sites" />
      ),
      cell: ({ row }) => {
        const site = row.original;
        return (
          <div className="flex items-center space-x-4">
            <img
              src={site.imageUrl}
              alt={site.name}
              className="w-36 h-36 object-cover rounded"
            />
            <div>
              <div className="font-bold text-lg">{site.name}</div>
              <div className="text-sm font-medium text-muted-foreground">
                {site.location}
              </div>
              <div className="text-xs text-muted-foreground">
                {site.description}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        const category = categories.find(
          (cat) => cat.id === row.original.category
        );
        return (
          <div className="flex items-center">
            <span>{category ? category.category : "Unknown"}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];
}
