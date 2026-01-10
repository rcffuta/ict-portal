import {
    User,
    MapPin,
    BookOpen,
    Shield,
} from "lucide-react";

export function ProfileView() {
    // Mock Data (Replace with @rcffuta/ict-lib later)
    const user = {
        firstName: "Oluwaseyi",
        lastName: "David",
        email: "david.o@futa.edu.ng",
        phone: "08123456789",
        gender: "Male",

        // Academic
        matric: "MEE/19/8821",
        dept: "Mechanical Engineering",
        faculty: "SEET",
        level: "500L",
        family: "Army of Light", // Calculated from Entry Year

        // Location
        hostel: "South Gate, Success Lodge",
        home: "Ikeja, Lagos",

        // Fellowship
        unit: "ICT Unit",
        role: "Coordinator",
    };

    return (
        <div className="grid gap-6 md:grid-cols-3">
            {/* 1. The Digital ID Card (Left Column) */}
            <div className="md:col-span-1 space-y-6">
                <div className="relative overflow-hidden rounded-2xl bg-rcf-navy text-white shadow-xl">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/5 blur-3xl"></div>

                    <div className="p-6 flex flex-col items-center text-center">
                        {/* Avatar */}
                        <div className="h-24 w-24 rounded-full border-4 border-white/20 bg-white/10 flex items-center justify-center text-3xl font-bold mb-4">
                            {user.firstName[0]}
                            {user.lastName[0]}
                        </div>

                        <h2 className="text-xl font-bold">
                            {user.firstName} {user.lastName}
                        </h2>
                        <p className="text-sm text-gray-300 mb-4">
                            {user.matric}
                        </p>

                        <div className="inline-flex items-center rounded-full bg-rcf-gold px-3 py-1 text-xs font-bold text-rcf-navy mb-6">
                            {user.role}
                        </div>

                        <div className="w-full border-t border-white/10 pt-4 grid grid-cols-2 gap-2 text-sm">
                            <div className="text-center">
                                <p className="text-xs text-gray-400">Level</p>
                                <p className="font-semibold">{user.level}</p>
                            </div>
                            <div className="text-center border-l border-white/10">
                                <p className="text-xs text-gray-400">Unit</p>
                                <p className="font-semibold">{user.unit}</p>
                            </div>
                        </div>
                    </div>

                    {/* ID Footer */}
                    <div className="bg-rcf-navy-light p-3 text-center text-[10px] text-gray-500 tracking-widest uppercase">
                        RCF FUTA Digital Identity
                    </div>
                </div>

                {/* Family Badge */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                        Class Set / Family
                    </p>
                    <p className="text-lg font-bold text-rcf-navy">
                        {user.family}
                    </p>
                </div>
            </div>

            {/* 2. Detailed Info (Right Column) */}
            <div className="md:col-span-2 space-y-6">
                {/* Bio Data Section */}
                <InfoSection title="Personal Information" icon={User}>
                    <InfoItem
                        label="Full Name"
                        value={`${user.firstName} ${user.lastName}`}
                    />
                    <InfoItem label="Email Address" value={user.email} />
                    <InfoItem label="Phone Number" value={user.phone} />
                    <InfoItem label="Gender" value={user.gender} />
                </InfoSection>

                {/* Academic Section */}
                <InfoSection title="Academic Details" icon={BookOpen}>
                    <InfoItem label="Department" value={user.dept} />
                    <InfoItem label="Faculty" value={user.faculty} />
                    <InfoItem label="Matric Number" value={user.matric} />
                    <InfoItem label="Current Level" value={user.level} />
                </InfoSection>

                {/* Location Section */}
                <InfoSection title="Location" icon={MapPin}>
                    <InfoItem
                        label="School Residence (Hostel)"
                        value={user.hostel}
                    />
                    <InfoItem label="Home Address" value={user.home} />
                </InfoSection>

                {/* Emergency Section */}
                <InfoSection title="Fellowship Data" icon={Shield}>
                    <InfoItem label="Workforce Unit" value={user.unit} />
                    <InfoItem label="Current Role" value={user.role} />
                </InfoSection>
            </div>
        </div>
    );
}

// Helper Components for clean code
function InfoSection({ title, icon: Icon, children }: any) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center gap-2">
                <Icon className="h-4 w-4 text-slate-500" />
                <h3 className="font-semibold text-slate-900">{title}</h3>
            </div>
            <div className="p-6 grid gap-6 sm:grid-cols-2">{children}</div>
        </div>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className="text-sm font-medium text-slate-900">
                {value || "Not Set"}
            </p>
        </div>
    );
}
