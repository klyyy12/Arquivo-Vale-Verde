# Modo 3D Explorável com Alternância Dinâmica (2D / 3D) — Vale Verde (1983)

Implementação de um motor de renderização 3D complementar em Three.js para o jogo investigativo *Vale Verde*, permitindo ao jogador alternar instantaneamente entre a visão terminal 2D original e uma perspectiva 3D imersiva em terceira pessoa com gráficos low-poly estilizados e iluminação suave, preservando 100% do progresso, narrativa, documentos e colisões da cidade.

## Decisões Críticas e Preferências do Usuário

> [!IMPORTANT]
> As decisões de design e jogabilidade foram alinhadas com as preferências confirmadas:
> - **Perspectiva de Câmera 3D**: Terceira pessoa acompanhando o protagonista Lucas por trás, com amortecimento suave e opção de giro de ângulo.
> - **Estilo Visual 3D**: Low-poly estilizado com iluminação atmosférica, sombras suaves (`PCFSoftShadowMap`), atmosfera retrô condizente com 1983 e brilho fosforescente em terminais e luminárias.
> - **Mecanismo de Alternância**: Botão dedicado e acessível no HUD principal (com tecla de atalho rápida `V`), além de opção no Menu de Pausa, permitindo alternar entre 2D e 3D a qualquer instante sem perder posição ou estado.

---

## 1. Visão Geral e Conceito Central

- **O Que Faz**: Adiciona um componente de visualização 3D em tempo real (`GameCanvas3D.tsx`) construído sobre Three.js que compartilha exatamente o mesmo loop de estado, posição, física e dados de *Vale Verde* com o `GameCanvas.tsx` (2D).
- **Público e Experiência**: O jogador pode desfrutar da nostalgia clássica de terminal em 2D ou mergulhar nos recintos do Zoológico, nas ruas calçadas, no Lago enevoado e no Laboratório secreto em 3D tridimensional.
- **Continuidade Absoluta**: Nenhuma mecânica existente é quebrada: todos os 20 documentos, diálogos, áudio, menu de Arquivo, movimentação, colisões e segredos funcionam de forma idêntica em ambos os modos.

---

## 2. Experiência do Usuário e Design Visual

### Fluxos do Jogador
1. **Alternância Imediata**: No topo direito do HUD e nas opções, há um botão estilizado `[ 2.5D / 3D ]` e a tecla de atalho `V`. Ao clicar, a transição ocorre em frações de segundo, mantendo as coordenadas exatas $(x, y)$ de Lucas no mapa.
2. **Navegação em Terceira Pessoa**: Lucas caminha pelas ruas e corredores; a câmera acompanha sua movimentação por trás com suavização cinemática (`THREE.MathUtils.damp`), evitando solavancos. No desktop, o jogador pode rotacionar a câmera livremente com o mouse; no mobile, controles de toque integrados continuam operantes.
3. **Interação com Objetos e Documentos**: Ao se aproximar de móveis, placas do Zoológico ou terminais no modo 3D, um marcador flutuante de interação no estilo retro-terminal surge sobre o objeto (`[E] INTERAGIR`). O acionamento abre os mesmos modais ricos com efeito typewriter e os 20 documentos originais intactos.

### Identidade Visual e Atmosfera 3D
- **Paleta de Cores e Iluminação**:
  - Iluminação suave ambiente com contraste de temperatura: luz hemisférica com base verde-oliva profunda / ardósia e topo suave.
  - Luz direcional solar suave projetando sombras suaves no asfalto e na grama.
  - Pontos de luz locais (`PointLight` e `SpotLight`) em postes de iluminação pública, lâmpadas de varanda e letreiros.
  - Brilho fosforescente verde esmeralda característico nos terminais de computador, no Laboratório e no Quarentena (DOC-20).
- **Modelagem Low-Poly Procedural (Sem dependências 404)**:
  - **Lucas**: Personagem com casaco/sobretudo, calças escuras, silhueta reconhecível e animação procedural de passos (balanço de pernas e braços sincronizado com a velocidade).
  - **Prédios e Casas**: Fachadas poligonais limpas com telhados em duas águas ou planos, janelas iluminadas com tons quentes/frios, portas abertas para os interiores detalhados e placas indicativas.
  - **Zoológico**: Grande portal em arco `PARQUE ZOOLÓGICO VALE VERDE`, bilheteria, caminhos de cascalho, quiosque com toldo, lago com efeito de ondulação procedural, recintos temáticos com árvores poligonais, rochas e silhuetas animais.
  - **Laboratório Restrito**: Cerca de contenção, portão de alerta com faixas amarelas e pretas, computadores com tubos CRT emitindo brilho verde e racks de servidores.

---

## 3. Decisões de Produto e Arquitetura

### Decisão 1: Sincronização Unificada de Estado entre 2D e 3D
- **Abordagem Escolhida**: `App.tsx` mantém o estado centralizado do jogador (`playerPos`, `direction`, `discoveredRecordIds`, `activeModal`, etc.). Os componentes `GameCanvas.tsx` e `GameCanvas3D.tsx` recebem as mesmas props e retornam eventos idênticos (`onMove`, `onInteract`, `onOpenRecord`).
- **Motivo**: Garante que alternar entre 2D e 3D seja instantâneo, sem perda de posição, inventário ou estado do jogo, permitindo comparar os ambientes a qualquer segundo.

### Decisão 2: Motor 3D Baseado em Three.js com Modelagem Procedural Completa
- **Abordagem Escolhida**: Utilizar `three` e `@types/three` com geração geométrica 100% procedural (usando `THREE.BoxGeometry`, `CylinderGeometry`, `ExtrudeGeometry`, `BufferGeometry` e texturas geradas via Canvas 2D / `DataTexture`).
- **Motivo**: Elimina qualquer risco de erro 404 ou falha de carregamento de arquivos `.glb` externos, garantindo inicialização imediata e desempenho estável em qualquer dispositivo e ambiente headless/sandbox.

### Decisão 3: Reutilização do Sistema de Colisão e Navegação
- **Abordagem Escolhida**: O motor 3D utiliza as mesmas caixas de colisão `getCollisionBoxes()` do `worldMap.ts` e a mesma rotina de deslizamento suave em cantos (`corner-slide assist`).
- **Motivo**: Garante que o jogador nunca atravesse paredes nem fique preso em portas no 3D se a área for sólida no 2D, mantendo total paridade espacial.

---

## 4. Arquitetura Técnica e Mapeamento de Componentes

```
┌────────────────────────────────────────────────────────┐
│                        App.tsx                         │
│  - playerPos {x, y}, direction                         │
│  - viewMode: '2D' | '3D'                               │
│  - discoveredRecordIds, activeDocument                 │
└───────────────┬────────────────────────┬───────────────┘
                │                        │
       [viewMode === '2D']      [viewMode === '3D']
                ▼                        ▼
     ┌─────────────────────┐  ┌──────────────────────────┐
     │   GameCanvas.tsx    │  │     GameCanvas3D.tsx     │
     │ - Canvas 2D Context │  │ - Three.js WebGLRenderer │
     │ - Top-Down CRT 1983 │  │ - 3rd Person Follow Cam  │
     │ - Phosphor Scanline │  │ - Low-Poly Town & Zoo    │
     └──────────┬──────────┘  └──────────┬───────────────┘
                │                        │
                └───────────┬────────────┘
                            ▼
              ┌───────────────────────────┐
              │    HUD.tsx & Overlays     │
              │ - Toggle View [ 2D / 3D ] │
              │ - Botão [V]               │
              │ - InteractionModal        │
              │ - ArchiveModal            │
              └───────────────────────────┘
```

### Roteiro de Execução Técnica

1. **Instalação das Dependências**:
   - Adicionar `three` e `@types/three` via `install_applet_package`.
2. **Criação do Módulo de Cenário 3D (`src/components/3d/`)**:
   - `SceneBuilder.ts`: Converte os dados de `BUILDINGS`, `ROADS`, `ZOO_WALKWAYS`, `LAKE_AREA` e `FURNITURE_LIST` em malhas Three.js otimizadas (instanciando elementos repetidos como árvores, postes, bancos e luminárias com `THREE.InstancedMesh`).
   - `CharacterMesh.ts`: Criação do modelo procedural de Lucas (proporções low-poly, texturas retrô de roupas, rig de membros com cinemática de caminhada).
   - `GameCanvas3D.tsx`: Componente React com container canvas isolado via `useRef`, ciclo de vida limpo com cancelamento de rAF, iluminação estúdio/ambiente, sombras suaves, detecção de software WebGL (`isSoftwareGl`), câmera em terceira pessoa e sincronização de controles de teclado/toque.
3. **Integração no HUD e Navegação**:
   - Adicionar botão seletor de modo `[ 2D / 3D ]` no topo da tela junto aos botões de Arquivo e Pausa.
   - Suporte à tecla de atalho `V` para alternar rapidamente durante o gameplay.
   - Manter os controles de toque virtuais no mobile perfeitamente sincronizados com o movimento no modo 3D.
4. **Verificação e Testes**:
   - Executar `compile_applet` e testes para garantir que a compilação passe sem erros e que a taxa de quadros e jogabilidade permaneçam estáveis em ambos os modos.
