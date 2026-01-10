import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-3">
            {/* Left Side - Brand Panel (Hidden on Mobile) */}
            <div className="hidden h-full flex-col justify-between bg-rcf-navy p-10 text-white lg:flex ">
                <div className="flex items-center gap-2 justify-center">
                    <Logo variant="white" width={130} asLink/>
                </div>

                <div className="space-y-4">
                    <blockquote className="space-y-2">
                        <p className="text-lg font-medium leading-relaxed">
                            &ldquo;But ye are a chosen generation, a royal
                            priesthood, an holy nation, a peculiar people; that
                            ye should shew forth the praises of him who hath
                            called you out of darkness into his marvellous
                            light.&rdquo;
                        </p>
                        <footer className="text-sm text-gray-400">
                            — 1 Peter 2:9 (KJV)
                        </footer>
                    </blockquote>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-400">
                    <p>© 2026 ICT Unit</p>
                    <div className="h-1 w-1 rounded-full bg-gray-600"></div>
                    <p>Rebranding Tenure</p>
                </div>
            </div>

            {/* Right Side - Form Area */}
            <div className="flex items-center justify-center bg-white p-8 md:p-12 lg:col-span-2">
                <div className="w-full space-y-6">{children}</div>
            </div>
        </div>
    );
}
