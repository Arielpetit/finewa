import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateRequest } from "@/hooks/useInventoryMutations";
import { RequestStatus } from "@/types/inventory";
import type { InventoryRequest, Item } from "@/types/inventory";

type DialogType = "approve" | "partial" | "decline" | null;

interface ApprovalActionsProps {
  request: InventoryRequest;
  items: Item[];
  onDone: () => void;
}

export function useApprovalActions({ items }: { items: Item[] }) {
  const updateRequest = useUpdateRequest();
  const [dialog, setDialog] = useState<DialogType>(null);
  const [activeRequest, setActiveRequest] = useState<InventoryRequest | null>(null);
  const [declineReason, setDeclineReason] = useState("");
  const [partialQtys, setPartialQtys] = useState<Record<string, number>>({});

  const itemMap = new Map(items.map((i) => [i.id, i]));

  function openApprove(req: InventoryRequest) {
    setActiveRequest(req);
    setDialog("approve");
  }

  function openDecline(req: InventoryRequest) {
    setActiveRequest(req);
    setDeclineReason("");
    setDialog("decline");
  }

  function openPartial(req: InventoryRequest) {
    setActiveRequest(req);
    const initial: Record<string, number> = {};
    for (const li of req.items) {
      initial[li.id] = li.quantity;
    }
    setPartialQtys(initial);
    setDialog("partial");
  }

  function confirmApprove() {
    if (!activeRequest) return;
    const now = new Date().toISOString();
    updateRequest.mutate(
      {
        id: activeRequest.id,
        updates: {
          status: RequestStatus.Approved,
          approvedBy: "demo-admin",
          updatedAt: now,
        },
      },
      {
        onSuccess: () => {
          toast.success(`${activeRequest.requestNumber} approved`);
          setDialog(null);
          setActiveRequest(null);
        },
      },
    );
  }

  function confirmDecline() {
    if (!activeRequest || !declineReason.trim()) return;
    const now = new Date().toISOString();
    updateRequest.mutate(
      {
        id: activeRequest.id,
        updates: {
          status: RequestStatus.Declined,
          approvedBy: "demo-admin",
          declineReason: declineReason.trim(),
          updatedAt: now,
        },
      },
      {
        onSuccess: () => {
          toast.success(`${activeRequest.requestNumber} declined`);
          setDialog(null);
          setActiveRequest(null);
        },
      },
    );
  }

  function confirmPartial() {
    if (!activeRequest) return;
    const now = new Date().toISOString();
    const allFull = activeRequest.items.every((li) => (partialQtys[li.id] ?? 0) >= li.quantity);
    const allZero = activeRequest.items.every((li) => (partialQtys[li.id] ?? 0) === 0);

    if (allZero) {
      toast.error("Approve at least one item quantity");
      return;
    }

    const newStatus = allFull ? RequestStatus.Approved : RequestStatus.PartiallyFulfilled;

    updateRequest.mutate(
      {
        id: activeRequest.id,
        updates: {
          status: newStatus,
          approvedBy: "demo-admin",
          updatedAt: now,
        },
      },
      {
        onSuccess: () => {
          toast.success(
            `${activeRequest.requestNumber} ${allFull ? "approved" : "partially fulfilled"}`,
          );
          setDialog(null);
          setActiveRequest(null);
        },
      },
    );
  }

  function renderDialogs() {
    return (
      <>
        {/* Approve confirm */}
        <AlertDialog open={dialog === "approve"} onOpenChange={(o) => !o && setDialog(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve {activeRequest?.requestNumber}?</AlertDialogTitle>
              <AlertDialogDescription>
                This will approve all requested quantities.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmApprove}>
                Confirm Approve
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Decline dialog */}
        <AlertDialog open={dialog === "decline"} onOpenChange={(o) => !o && setDialog(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Decline {activeRequest?.requestNumber}?</AlertDialogTitle>
              <AlertDialogDescription>
                Please provide a reason for declining this request.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-2">
              <Label htmlFor="decline-reason">Reason *</Label>
              <Textarea
                id="decline-reason"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Why is this request being declined?"
                rows={3}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={confirmDecline}
                disabled={!declineReason.trim()}
              >
                Confirm Decline
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Partial fulfill dialog */}
        <AlertDialog open={dialog === "partial"} onOpenChange={(o) => !o && setDialog(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Partial Fulfill {activeRequest?.requestNumber}</AlertDialogTitle>
              <AlertDialogDescription>
                Enter the approved quantity for each line item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-3 py-2">
              {activeRequest?.items.map((li) => {
                const item = itemMap.get(li.itemId);
                return (
                  <div key={li.id} className="flex items-center gap-3">
                    <span className="flex-1 text-sm font-medium">
                      {item?.name ?? li.itemId}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      of {li.quantity}
                    </span>
                    <Input
                      type="number"
                      min={0}
                      max={li.quantity}
                      value={partialQtys[li.id] ?? 0}
                      onChange={(e) =>
                        setPartialQtys((prev) => ({
                          ...prev,
                          [li.id]: Math.max(0, Math.min(li.quantity, Number(e.target.value))),
                        }))
                      }
                      className="w-20 font-mono"
                    />
                  </div>
                );
              })}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmPartial}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return { openApprove, openDecline, openPartial, renderDialogs, isLoading: updateRequest.isLoading };
}
