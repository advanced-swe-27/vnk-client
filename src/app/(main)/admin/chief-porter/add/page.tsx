import UnderDevelopment from "@/components/core/under-development";
import RoleViewProvider from "@/providers/role-view-provider";

export default function ChiefPorterPage() {
    return (
        <RoleViewProvider role="SUDO">
            <div className="h-full">
                <UnderDevelopment />
            </div>
        </RoleViewProvider>
    )
}