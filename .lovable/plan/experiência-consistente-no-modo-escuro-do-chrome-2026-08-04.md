# Experiência consistente no modo escuro do Chrome

## O que está acontecendo

Hoje o site declara que suporta **apenas o tema claro** (`color-scheme: only light` no CSS e nas metatags). Quando o usuário liga o modo escuro no macOS/Windows, o Chrome ativa o recurso "Auto Dark Mode": ele aplica uma inversão automática de cores em páginas que não oferecem tema escuro próprio.

Essa inversão é feita pelo navegador, fora do controle do CSS. É por isso que, no seu print, o degradê navy sobre a foto do hero some (ele é invertido para claro) e a arte fica lavada. Não existe uma propriedade CSS capaz de "desligar" essa inversão.

O caminho que funciona é o contrário do atual: **oferecer um tema escuro nosso**. O Chrome só aplica o Auto Dark em sites que não declaram suporte a dark; quando o site tem tema escuro próprio, o navegador respeita as cores como foram desenhadas.

## O que será feito

1. Passar a declarar `color-scheme: light dark` (CSS + metatags), removendo o bloqueio `only light`.
2. Ativar o tema escuro já existente no projeto (bloco `.dark` do `index.css`) também via `prefers-color-scheme: dark`, para que ele entre automaticamente quando o sistema está em modo escuro.
3. Ajustar os tokens escuros para reproduzir a mesma identidade do site: fundos em navy profundo, texto claro, dourado #E4B94A como acento e vermelho apenas em hovers/badges. Nada de inversão: o visual continua sendo o mesmo desenho, só com as superfícies claras trocadas por navy.
4. Revisar as seções que hoje usam fundo claro (Serviços, Blog, FAQ, Depoimentos, Cursos, formulário de proposta, rodapé, banner LGPD, botão WhatsApp) para que usem tokens semânticos e fiquem corretas nos dois temas.
5. Remover os "remendos" atuais criados para o Auto Dark (fallback de gradiente forçado dentro de `prefers-color-scheme: dark`), que deixam de ser necessários.
6. Validar com o Chrome em modo escuro real (sistema dark) e com o Auto Dark forçado, comparando hero, títulos com degradê dourado, cards e formulários.

## Resultado esperado

- Usuários em modo escuro (Mac e Windows) veem uma versão escura desenhada por nós, coerente com a marca, com o degradê do hero preservado.
- Usuários em modo claro continuam vendo exatamente o site atual, sem mudança.

## Detalhes técnicos

- `index.html`: `<meta name="color-scheme" content="light dark">`, remoção de `supported-color-schemes: light`.
- `src/index.css`: `color-scheme: light dark` em `:root`/`html`/`body`; adicionar `@media (prefers-color-scheme: dark) { :root { ...tokens do bloco .dark... } }` mantendo também a classe `.dark`.
- Hero: overlay `from-navy-dark/95 via-navy/90 to-navy/75` permanece igual nos dois temas (navy já é escuro), sem inversão do navegador.
- Componentes que usam `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card` seguem automaticamente; qualquer cor fixa encontrada será migrada para token.
