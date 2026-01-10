import { Menu } from "lucide-react";

export function MobileHeader() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-rcf-navy"></div>
                <span className="font-bold text-rcf-navy">RCF FUTA</span>
            </div>
            <button className="rounded p-2 text-gray-600 hover:bg-gray-100">
                <Menu className="h-6 w-6" />
            </button>
        </header>
    );
}
