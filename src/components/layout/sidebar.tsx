"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    UserCircle,
    QrCode,
    BookOpen,
    Vote,
    Wallet,
    CalendarCheck,
    LogOut,
    Settings,
} from "lucide-react";
import clsx from "clsx";
import { Logo } from "../ui/logo";

const sidebarItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Identity", href: "/dashboard/profile", icon: UserCircle },
    { name: "Attendance", href: "/dashboard/attendance", icon: QrCode },
    { name: "Academics", href: "/dashboard/academics", icon: BookOpen },
    { name: "Elections", href: "/dashboard/voting", icon: Vote },
    { name: "Events", href: "/dashboard/events", icon: CalendarCheck },
    { name: "Financials", href: "/dashboard/dues", icon: Wallet },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleSignOut = () => {
        router.replace('/');
    }

    return (
        <aside className="hidden h-screen w-64 flex-col border-r border-gray-200 bg-rcf-navy text-white md:flex">
            {/* 1. Brand / Logo Area */}
            <div className="flex h-16 items-center justify-center gap-3 border-b border-white/10">
                <Logo variant="white" width={80} />
            </div>

            {/* 2. Navigation Items */}
            <div className="flex-1 overflow-y-auto py-6 px-3">
                <nav className="space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-white text-rcf-navy shadow-sm" // Active State
                                        : "text-gray-300 hover:bg-white/10 hover:text-white" // Inactive State
                                )}
                            >
                                <item.icon
                                    className={clsx(
                                        "h-5 w-5 flex-shrink-0 transition-colors",
                                        isActive
                                            ? "text-rcf-navy"
                                            : "text-gray-400 group-hover:text-white"
                                    )}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* 3. Footer / User Actions */}
            <div className="border-t border-white/10 p-4">
                <div className="flex flex-col gap-1">
                    <button className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white">
                        <Settings className="h-5 w-5 text-gray-400 group-hover:text-white" />
                        Settings
                    </button>

                    <button onClick={handleSignOut} className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>

                {/* Mini Profile Summary */}
                <div className="mt-4 flex items-center gap-3 rounded-lg bg-white/5 p-3">
                    <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
                        OD
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">Oluwaseyi</span>
                        <span className="text-xs text-gray-400">
                            ICT Coordinator
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
