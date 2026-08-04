import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import logoColorida from "@/assets/logo-colorida.png";
import logoHorizontal from "@/assets/logo-horizontal.png";
import logo from "@/assets/logo.png";

const colorTokens = [
  { name: "Navy", var: "--navy", hsl: "220 30% 22%", hex: "#283550", usage: "Backgrounds principais, navbar, footer" },
  { name: "Navy Light", var: "--navy-light", hsl: "220 25% 30%", hex: "#39455C", usage: "Backgrounds secundários, hover states" },
  { name: "Navy Dark", var: "--navy-dark", hsl: "220 35% 15%", hex: "#191F2E", usage: "Footer, áreas profundas" },
  { name: "Gold", var: "--gold", hsl: "42 80% 65%", hex: "#E4B94A", usage: "Destaques, botões primários, links" },
  { name: "Gold Light", var: "--gold-light", hsl: "42 80% 78%", hex: "#F0D47E", usage: "Gradientes, brilhos" },
  { name: "Gold Dark", var: "--gold-dark", hsl: "42 80% 50%", hex: "#C89C1A", usage: "Hover em botões dourados" },
  { name: "Red Accent", var: "--red-accent", hsl: "5 70% 55%", hex: "#D04B3A", usage: "Hover em ícones, badges, bullets" },
  { name: "Background", var: "--background", hsl: "220 20% 97%", hex: "#F3F4F7", usage: "Fundo geral do site (light)" },
  { name: "Foreground", var: "--foreground", hsl: "220 30% 18%", hex: "#212D42", usage: "Texto principal" },
  { name: "Muted", var: "--muted", hsl: "220 15% 92%", hex: "#E8EAF0", usage: "Fundos sutis, cards leves" },
  { name: "Muted FG", var: "--muted-foreground", hsl: "220 10% 50%", hex: "#737D8C", usage: "Textos secundários" },
];

const StyleGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-navy py-16 px-6">
        <div className="container mx-auto text-center">
          <img src={logoColorida} alt="Tradupoints" className="h-12 mx-auto mb-6" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gold mb-3">
            Guia de Identidade Visual
          </h1>
          <p className="font-body text-muted/60 text-lg max-w-2xl mx-auto">
            Referência completa de cores, tipografias e componentes do site Tradupoints.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 lg:px-12 py-16 space-y-20">

        {/* ─── LOGOTIPOS ─── */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Logotipos</h2>
          <p className="font-body text-muted-foreground mb-8">Versões aprovadas da marca para diferentes contextos.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { src: logoHorizontal, label: "Horizontal (branca)", bg: "bg-navy" },
              { src: logoColorida, label: "Colorida (fundo claro)", bg: "bg-muted" },
              { src: logo, label: "Ícone / Favicon", bg: "bg-navy" },
            ].map((l) => (
              <div key={l.label} className="text-center">
                <div className={`${l.bg} rounded-lg p-8 flex items-center justify-center h-32 mb-3`}>
                  <img src={l.src} alt={l.label} className="max-h-16 object-contain" />
                </div>
                <span className="font-body text-sm text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* ─── PALETA DE CORES ─── */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Paleta de Cores</h2>
          <p className="font-body text-muted-foreground mb-8">Tokens de cor definidos em HSL no index.css e tailwind.config.ts.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorTokens.map((c) => (
              <div key={c.var} className="border border-border rounded-lg overflow-hidden">
                <div className="h-20" style={{ backgroundColor: `hsl(${c.hsl})` }} />
                <div className="p-4 space-y-1">
                  <p className="font-display text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="font-body text-xs text-muted-foreground font-mono">{c.var}</p>
                  <p className="font-body text-xs text-muted-foreground">HSL: {c.hsl}</p>
                  <p className="font-body text-xs text-muted-foreground">≈ {c.hex}</p>
                  <p className="font-body text-xs text-foreground/70 mt-2">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient */}
          <div className="mt-8">
            <h3 className="font-display text-lg font-semibold text-foreground mb-3">Gradiente Gold</h3>
            <div className="h-16 rounded-lg text-gradient-gold flex items-center justify-center">
              <span className="text-gradient-gold text-2xl font-display font-bold">Texto com Gradiente Gold</span>
            </div>
            <div className="h-16 rounded-lg mt-3" style={{ background: "linear-gradient(135deg, hsl(42 80% 65%) 0%, hsl(42 80% 78%) 100%)" }} />
            <p className="font-body text-xs text-muted-foreground mt-2 font-mono">
              linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-light)) 100%)
            </p>
          </div>
        </section>

        <Separator />

        {/* ─── TIPOGRAFIA ─── */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Tipografia</h2>
          <p className="font-body text-muted-foreground mb-8">Duas fontes do Google Fonts combinadas para hierarquia clara.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Sora</CardTitle>
                <CardDescription>Display / Títulos: font-display</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-display text-4xl font-bold text-foreground">Aa Bb Cc 123</p>
                <p className="font-display text-xl font-semibold text-foreground">The quick brown fox</p>
                <p className="font-display text-base font-medium text-muted-foreground">Pesos: 300 · 400 · 500 · 600 · 700 · 800</p>
                <div className="space-y-1 pt-2">
                  <p className="font-display text-3xl font-bold">H1: 3xl Bold</p>
                  <p className="font-display text-2xl font-bold">H2: 2xl Bold</p>
                  <p className="font-display text-xl font-semibold">H3: xl Semibold</p>
                  <p className="font-display text-lg font-semibold">H4: lg Semibold</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display">Inter</CardTitle>
                <CardDescription>Body / Texto corrido: font-body</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-4xl font-bold text-foreground">Aa Bb Cc 123</p>
                <p className="font-body text-xl font-medium text-foreground">The quick brown fox</p>
                <p className="font-body text-base text-muted-foreground">Pesos: 300 · 400 · 500 · 600 · 700</p>
                <div className="space-y-1 pt-2">
                  <p className="font-body text-base">Body: base Regular</p>
                  <p className="font-body text-sm text-muted-foreground">Small: sm Muted</p>
                  <p className="font-body text-xs text-muted-foreground">Caption: xs Muted</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* ─── BOTÕES ─── */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Botões</h2>
          <p className="font-body text-muted-foreground mb-8">Variantes customizadas com tokens da marca.</p>

          <div className="space-y-6">
            <div>
              <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Variantes de Marca</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="gold">Gold (Primário)</Button>
                <Button variant="gold-outline">Gold Outline</Button>
                <Button variant="navy">Navy</Button>
              </div>
            </div>

            <div>
              <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Variantes Padrão</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Tamanhos</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="gold" size="sm">Small</Button>
                <Button variant="gold" size="default">Default</Button>
                <Button variant="gold" size="lg">Large</Button>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ─── CARDS ─── */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Cards</h2>
          <p className="font-body text-muted-foreground mb-8">Componentes de card com variações de uso.</p>

          <div className="grid sm:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Padrão</CardTitle>
                <CardDescription>Fundo branco com borda sutil.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-body text-sm text-muted-foreground">Conteúdo do card com texto em muted-foreground.</p>
              </CardContent>
            </Card>

            <Card className="bg-navy text-gold border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">Card Navy</CardTitle>
                <CardDescription className="text-muted/60">Fundo navy com texto dourado.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-body text-sm text-muted/50">Ideal para destaques e CTAs.</p>
              </CardContent>
            </Card>

            <Card className="border-gold/30 hover:border-red-accent/50 transition-all duration-300">
              <CardHeader>
                <CardTitle>Card com Hover</CardTitle>
                <CardDescription>Borda muda para vermelho no hover.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-body text-sm text-muted-foreground">Padrão usado nos cards de serviços.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* ─── FORMULÁRIOS ─── */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Formulários</h2>
          <p className="font-body text-muted-foreground mb-8">Inputs e labels com tokens do design system.</p>

          <Card className="max-w-md">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo-name">Nome</Label>
                <Input id="demo-name" placeholder="Seu nome completo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-email">E-mail</Label>
                <Input id="demo-email" type="email" placeholder="seu@email.com" />
              </div>
              <Button variant="gold" className="w-full">Enviar</Button>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* ─── BADGES ─── */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Badges</h2>
          <p className="font-body text-muted-foreground mb-8">Etiquetas para categorias e status.</p>

          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-gold text-navy-dark">Gold Custom</Badge>
            <Badge className="bg-red-accent text-white">Red Accent</Badge>
          </div>
        </section>

        <Separator />

        {/* ─── ESPAÇAMENTOS ─── */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Espaçamentos</h2>
          <p className="font-body text-muted-foreground mb-8">Classes utilitárias para seções e containers.</p>

          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4">
              <code className="font-mono text-sm text-foreground">.section-padding</code>
              <p className="font-body text-sm text-muted-foreground mt-1">px-6 py-20 md:px-12 lg:px-20 lg:py-28</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <code className="font-mono text-sm text-foreground">.container</code>
              <p className="font-body text-sm text-muted-foreground mt-1">max-width: 1400px, center, padding: 2rem</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <code className="font-mono text-sm text-foreground">border-radius</code>
              <p className="font-body text-sm text-muted-foreground mt-1">lg: 0.5rem · md: calc(0.5rem - 2px) · sm: calc(0.5rem - 4px)</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-navy py-8 text-center">
        <p className="font-body text-xs text-muted/40">
          Guia de Identidade Visual | Tradupoints © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default StyleGuide;
