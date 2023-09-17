"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { StarWarItem } from "../_api";
import { Text } from "@/components/text";
import { cx } from "class-variance-authority";

export const columns: ColumnDef<StarWarItem>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <Badge>{row.original.type}</Badge>,
  },
  {
    accessorKey: "series",
    header: "Series",
    cell: ({ row }) => (
      <>
        <div
          className={cx(
            "w-2 h-2 rounded-full inline-block mr-2",
            seriesColors[row.original.series]
          )}
        />
        {row.original.series}
      </>
    ),
  },
  {
    accessorKey: "number",
    header: "No #",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "minutes",
    header: "Minutes",
  },
  {
    accessorKey: "haveWatched",
    header: "Watched?",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
  },
];

export const seriesColors = {
  "Tales of the Jedi": "bg-yellow-500",
  Episode: "bg-blue-500",
  "The Clone Wars": "bg-green-500",
  "The Bad Batch": "bg-lime-500",
  "A Star Wars Story": "bg-purple-500",
  "Obi-Wan Kenobi": "bg-rose-500",
  "Star Wars Rebels": "bg-pink-500",
  Andor: "bg-amber-500",
  "The Mandalorian": "bg-orange-500",
  "The Book of Boba Fett": "bg-violet-500",
  Ahsoka: "bg-cyan-500",
  "Skeleton Crew": "bg-gray-500",
  "Star Wars Resistance": "bg-sky-500",
};
