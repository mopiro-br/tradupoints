# Plano: Rolagem suave e destaque de seção ativa

## Objetivo
Adicionar rolagem suave com âncoras para cada seção da página inicial e destacar no menu de navegação a seção atualmente visível conforme o usuário rola a página.

## Escopo
- Alteração de apresentação/frontend; não envolve backend.

## Como será feito

### 1. Âncoras em todas as seções da home
Garantir que cada seção da página inicial tenha um `id` único e estável:
- Hero: `#inicio`
- Differentials: `#diferenciais`
- Services: `#servicos`
- SocialProof: `#depoimentos`
- CTASection: `#contato`
- BlogPodcast: `#blog`
- AISolutionsFAQ: `#faq`

### 2. Hook personalizado para detectar seção ativa
Criar `src/hooks/useActiveSection.ts` baseado em `IntersectionObserver` para identificar qual seção está mais visível no viewport. O hook retornará o `id` da seção ativa.

### 3. Menu de navegação com links híbridos
Atualizar `src/components/Navbar.tsx` para que, na página inicial (`/`), os links de "Serviços", "Depoimentos", "Blog", "Contato" e "Dúvidas Frequentes" apontem para as âncoras correspondentes e realizem rolagem suave. Os demais itens (Quem Somos, Cursos, Mentoria) continuam navegando para suas páginas próprias. Em outras páginas, o menu se comporta como hoje.

Aplicar classe visual (`text-gold`) ao item de menu cujo `href` corresponde à seção ativa.

### 4. Rolagem suave
Implementar uma função `scrollToSection` que use `element.scrollIntoView({ behavior: 'smooth' })` e evite o comportamento padrão de salto abrupto dos links de âncora.

### 5. Verificação
- Build deve passar sem erros.
- Testar no preview: clicar em cada link do menu deve rolar suavemente até a seção e o item correto deve ficar destacado.

## Arquivos alterados
- `src/pages/Index.tsx` (ordem/confirmação de seções, se necessário)
- `src/components/Hero.tsx` (adicionar `id="inicio"`)
- `src/components/Navbar.tsx` (links híbridos + destaque ativo)
- `src/hooks/useActiveSection.ts` (novo hook)
