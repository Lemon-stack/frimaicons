"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Cancel01Icon, LinkSquare02Icon } from "@hugeicons/core-free-icons";
import type { FrimaIcon } from "@frimaicons/core";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { ColorMode } from "@/hooks/use-color-mode";
import { SECTOR_LABELS } from "@/lib/labels";
import { IconPanel } from "./icon-panel";

interface IconDialogProps {
  icon: FrimaIcon | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  colorMode: ColorMode;
}

export function IconDialog({ icon, open, onOpenChange, colorMode }: IconDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100dvh-2rem)] gap-6 overflow-y-auto p-6 text-sm sm:max-w-3xl"
      >
        {icon && (
          <>
            <DialogHeader className="flex-row items-center gap-2 text-muted-foreground">
              <span>{SECTOR_LABELS[icon.sector]}</span>
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              <DialogTitle className="text-sm font-medium text-foreground">{icon.slug}</DialogTitle>
              <div className="ml-auto flex items-center gap-1">
                <Link
                  href={`/icons/${icon.slug}`}
                  aria-label={`Open ${icon.title} page`}
                  className={buttonVariants({ variant: "ghost", size: "icon-lg" })}
                >
                  <HugeiconsIcon icon={LinkSquare02Icon} />
                </Link>
                <DialogClose render={<Button variant="ghost" size="icon-lg" aria-label="Close" />}>
                  <HugeiconsIcon icon={Cancel01Icon} />
                </DialogClose>
              </div>
            </DialogHeader>
            <IconPanel key={icon.slug} icon={icon} initialMode={colorMode} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
