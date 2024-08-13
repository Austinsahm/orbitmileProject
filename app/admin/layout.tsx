import AuthButton from "@/components/AuthButton";
import Logo from "@/components/LogoButton";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full  flex justify-between items-center py-3 px-10 text-sm">
            {/* <DeployButton /> */}
            <Logo className="mr-2 h-10 w-10" />
            <AuthButton />
          </div>
        </nav>
      </div>
      <div className="my-6 px-10">{children}</div>
    </>
  );
}
