import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const ArtistDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>All Songs</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ArtistDialog