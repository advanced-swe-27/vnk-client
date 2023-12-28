import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { tableIconsMap } from "../table/table-icons-map"
import ActionTooltip from "../core/action-tooltip"
import RoleViewProvider from "@/providers/role-view-provider"
import _ from "lodash"
import { Button } from "../ui/button"
import CreateVisitorForm from "../forms/create-visitor-form"

export default function CreateVisitorDialog() {
    return (
        <RoleViewProvider role={"SUDO"}>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="ml-auto">
                        New Visitor
                    </Button>

                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Visitor  </DialogTitle>
                    </DialogHeader>
                    <CreateVisitorForm />
                </DialogContent>
            </Dialog>
        </RoleViewProvider>
    )
}