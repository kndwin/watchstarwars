"use client";

import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Table as TTable,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Text } from "@/components/text";
import { StarWarItem } from "../_api";

interface DataTableProps<TValue> {
  columns: ColumnDef<StarWarItem, TValue>[];
  data: StarWarItem[];
}

const selectedRowAtom = atomWithStorage("watched", {});

export function StarwarDataTable<TValue>({
  columns,
  data,
}: DataTableProps<TValue>) {
  const [rowSelection, setRowSelection] = useAtom(selectedRowAtom);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        <TotalTimeWatched table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// convert minutes to days, hours and minutes
const formatMinutes = (minutes: number) => {
  if (minutes === 0) return "0m";

  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = Math.floor(minutes % 60);

  // if 0 days, don't show it
  // if 0 hours, don't show it
  // if 0 minutes, don't show it

  return `${days ? `${days}d ` : ""}${hours ? `${hours}h ` : ""}${
    mins ? `${mins}m` : ""
  }`;
};

function TotalTimeWatched({ table }: { table: TTable<StarWarItem> }) {
  const totalMinutes = table.getSelectedRowModel().rows.reduce((acc, row) => {
    return acc + row.original.minutes;
  }, 0);
  return (
    <div className="flex items-center gap-2 p-2 border rounded">
      <Text variant="mutedText">
        {`Total time watched: `}
        <Text as="span" variant="smallText">
          {formatMinutes(totalMinutes)}
        </Text>
      </Text>
    </div>
  );
}
