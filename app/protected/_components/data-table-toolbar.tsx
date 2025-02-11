"use client";

import { useEffect, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "../_data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { getCategories } from "@/app/_db/action";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

interface CategoryOption {
  id: string;
  category: string;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const isFiltered = table.getState().columnFilters.length > 0;

  useEffect(() => {
    async function fetchCategories() {
      const categoriesData = await getCategories();
      setCategories(categoriesData ?? []);
    }
    fetchCategories();
  }, []);

  const categoryOptions = categories.map((cat) => ({
    id: cat.id,
    category: cat.category,
  }));

  // console.log(categoryOptions, "Here");

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Category"
            options={categories}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
