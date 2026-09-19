import Link from "next/link";
import { Page } from "@/components/ui/Page";

export default function NotFound() {
  return (
    <Page>
      <div className="flex min-h-[60svh] flex-col items-center justify-center text-center">
        <p className="text-2xs uppercase text-muted">Error 404</p>
        <h1 className="mt-4 font-logo text-[40px] uppercase leading-none md:text-[64px]">
          Page not found
        </h1>
        <p className="mt-6 max-w-sm text-xs uppercase leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-primary mt-8 min-w-[220px]">
          Back to home
        </Link>
      </div>
    </Page>
  );
}
