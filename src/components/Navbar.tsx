import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoHorizontal from "@/assets/logo-horizontal.png";

const navItems = [
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

interface NavbarProps {
  onRequestQuote: () => void;
}

const Navbar = ({ onRequestQuote }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-gold/10">
      <nav className="container mx-auto flex items-center justify-between h-16 px-6 lg:px-12">
        <a href="#" className="flex items-center">
          <img src={logoHorizontal} alt="Tradupoints" className="h-8 mix-blend-screen brightness-200" />
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-body tracking-wide text-muted/80 hover:text-gold transition-colors duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button variant="gold" size="sm" onClick={onRequestQuote}>
            Solicitar Orçamento
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
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-body text-muted/80 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Button variant="gold" size="sm" className="w-full mt-2" onClick={() => { setOpen(false); onRequestQuote(); }}>
                  Solicitar Orçamento
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
