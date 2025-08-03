import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FileQuestionMark, Files, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { getBackendUrl } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function SortSongsDialog({unmatched}: {unmatched: string[]}) {
  const [secret, setSecret] = useState("");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  return (
    <div className="flex items-center gap-2">
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileQuestionMark className="mr-2 h-4 w-4" />
          View Unmatched Songs
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-3xl">
        <DialogHeader>
          <DialogTitle>Unmatched Songs</DialogTitle>
          <DialogDescription>
            These songs did not match with your database structure. Please review them below.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">#</TableHead>
                <TableHead>Song (Raw String)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unmatched.length > 0 ? (
                unmatched.map((song, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="text-sm">{song}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground">
                    No unmatched songs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <TriangleAlert className="mr-2 h-4 w-4" />
            Sort Songs
          </Button>
        </DialogTrigger>

        {/* ⛳ FIX: Put Header inside Content */}
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-500/85">
              Warning: Permanent Action
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Sorting your songs will be <strong>permanent</strong>. If you want
              to keep a backup, make a copy first. To continue, enter the
              10-character secret key below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 pt-4">
            <label htmlFor="secret" className="text-sm font-medium">
              Secret Key
            </label>
            <Input
              id="secret"
              maxLength={10}
              type="password"
              placeholder="Enter 10-character key"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="border-destructive/40 focus-visible:ring-destructive mt-2"
            />
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setSecret("")}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={secret.length !== 10}
              onClick={async () => {
                console.log("Sorting with secret:", secret);
                toast.loading("Sorting Songs", { id: "songs" });
                try {
                  const res = await fetch(getBackendUrl() + "/api/rename", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ secret }),
                  });
                  setSecret("");
                  const data = await res.json();
                  if (res.ok) {
                    toast.success(data.message, {
                      id: "songs",
                    });
                  } else {
                    toast.error("Error: " + data.message, {
                      id: "songs",
                    });
                  }
                } catch (error: any) {
                  console.error("Error sorting songs:", error);
                  toast.error("Failed to sort songs " + error?.message, {
                    id: "songs",
                  });
                } finally {
                  setOpen(false);
                  queryClient.refetchQueries({
                    queryKey: ["songs"],
                  });
                }
              }}
            >
              Confirm Sort
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
