import * as Collapsible from "@radix-ui/react-collapsible";

import { Cross2Icon, RowSpacingIcon } from "@radix-ui/react-icons";

import { useState } from "react";

export function AdvancedOptionsCollapsible({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <div>
        <div className="flex justify-between items-center">
          <h6 className="block text-xs font-normal text-slate-500">
            Advanced Options
          </h6>
          <Collapsible.Trigger asChild>
            <button
              type="button"
              className="text-slate-600 hover:text-slate-900 p-2 rounded-full border border-slate-200 active:ring focus:ring ring-indigo-200 bg-white drop-shadow-lg"
            >
              {open ? <Cross2Icon /> : <RowSpacingIcon />}
            </button>
          </Collapsible.Trigger>
        </div>
        <Collapsible.Content>{children}</Collapsible.Content>
      </div>
    </Collapsible.Root>
  );
}
