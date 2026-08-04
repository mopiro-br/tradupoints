import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useActiveSection } from "@/hooks/useActiveSection";
import logoHorizontal from "@/assets/logo-horizontal.png";

interface NavItem {
  label: string;
  href: string;
  anchor?: string;
}

const navItems: NavItem[] = [
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Serviços", href: "/servicos", anchor: "servicos" },
  { label: "Depoimentos", href: "/depoimentos", anchor: "depoimentos" },
  { label: "Blog", href: "/blog", anchor: "blog" },
  { label: "Dúvidas Frequentes", href: "#faq", anchor: "faq" },
  { label: "Cursos", href: "/cursos" },
  { label: "Mentoria", href: "/mentoria/login" },
  { label: "Contato", href: "/contato", anchor: "contato" },
];

interface NavbarProps {
  onRequestQuote: () => void;
}

const Navbar = ({ onRequestQuote }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const activeSection = useActiveSection();

  const handleAnchorClick = (anchor: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);

    if (!isHome) {
      window.location.href = `/#${anchor}`;
      return;
    }

    const element = document.getElementById(anchor);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const isActive = (item: NavItem) => {
    if (!isHome || !item.anchor) return location.pathname === item.href;
    return activeSection === item.anchor;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-gold/10">
      <nav className="container mx-auto flex items-center justify-between h-16 px-6 lg:px-12">
        <Link to="/" className="flex items-center">
          <img src={logoHorizontal} alt="Tradupoints" className="h-8" />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const linkHref = isHome && item.anchor ? `#${item.anchor}` : item.href;
            const active = isActive(item);

            return (
              <li key={item.href}>
                {item.anchor ? (
                  <a
                    href={linkHref}
                    onClick={handleAnchorClick(item.anchor)}
                    className={`text-sm font-body tracking-wide transition-colors duration-300 ${
                      active ? "text-gold" : "text-muted/80 hover:text-gold"
                    }`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-sm font-body tracking-wide transition-colors duration-300 ${
                      active ? "text-gold" : "text-muted/80 hover:text-gold"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Button variant="gold" size="sm" onClick={onRequestQuote}>
            Solicitar Proposta
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-gold"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy border-t border-gold/10"
          >
            <ul className="flex flex-col p-6 gap-4">
              {navItems.map((item) => {
                const linkHref = isHome && item.anchor ? `#${item.anchor}` : item.href;
                const active = isActive(item);

                return (
                  <li key={item.href}>
                    {item.anchor ? (
                      <a
                        href={linkHref}
                        onClick={handleAnchorClick(item.anchor)}
                        className={`text-sm font-body transition-colors ${
                          active ? "text-gold" : "text-muted/80 hover:text-gold"
                        }`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className={`text-sm font-body transition-colors ${
                          active ? "text-gold" : "text-muted/80 hover:text-gold"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
              <li>
                <Button
                  variant="gold"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => {
                    setOpen(false);
                    onRequestQuote();
                  }}
                >
                  Solicitar Proposta
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
