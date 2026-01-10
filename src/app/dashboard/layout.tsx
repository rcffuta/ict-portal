import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 md:p-10">
                <div className="mx-auto max-w-6xl">{children}</div>
            </main>
        </div>
    );
}
