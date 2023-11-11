import * as React from "react"
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const DialogItem = React.forwardRef((props: any, forwardedRef) => {
    const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } = props;

    return (
        <Dialog onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    {...itemProps}
                    ref={forwardedRef}
                    onSelect={(event: any) => {
                        event.preventDefault();
                        onSelect && onSelect();
                      }}
                >
                    {triggerChildren}
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                    {children}
                </DialogContent>
            </DialogPortal>

        </Dialog>
    )
})

DialogItem.displayName = "DialogItem"

export default DialogItem