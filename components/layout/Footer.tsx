import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/5 bg-black/20">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <Logo className="h-7 w-7" />
              <span className="font-semibold">Skin Picker</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              An open-source Windows app that auto-picks, rerolls and
              synchronizes League of Legends skins with your team during champ
              select.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Product
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-ink/80 hover:text-ink">
                  Features
                </a>
              </li>
              <li>
                <a href="#download" className="text-ink/80 hover:text-ink">
                  Download
                </a>
              </li>
              <li>
                <a href="#install" className="text-ink/80 hover:text-ink">
                  Install guide
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Project
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/Nano315/lol-skin-picker"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ink/80 hover:text-ink"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Nano315/lol-skin-picker/releases"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ink/80 hover:text-ink"
                >
                  Releases
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Nano315/lol-skin-picker/issues"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ink/80 hover:text-ink"
                >
                  Report an issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider my-10" />

        <div className="flex flex-col-reverse items-start justify-between gap-4 text-xs text-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Skin Picker. Free & open-source.
          </p>
          <p className="max-w-md leading-relaxed">
            Skin Picker isn&apos;t endorsed by Riot Games and doesn&apos;t
            reflect the views or opinions of Riot Games or anyone officially
            involved in producing or managing League of Legends.
          </p>
        </div>
      </div>
    </footer>
  );
}
