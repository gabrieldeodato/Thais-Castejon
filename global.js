/**
 * Dra. Thais Castejon - Global Premium Interactions (Scroll Reveal Animation)
 * Implemented using IntersectionObserver and MutationObserver for dynamic layouts.
 */

(function() {
  // Seletores de elementos que devem ter animação de scroll
  const SELECTORS = [
    'main section',
    '#featured-treatments-grid > article',
    '#featured-treatments-grid > div',
    '#treatments-grid > article',
    '#treatments-grid > div',
    '.grid > div.rounded-xl',
    '.grid > div.border',
    'main iframe',
    'main form',
    '.grid-cols-1.md\\:grid-cols-3.gap-6 > div',
    '.flex-col.md\\:flex-row.gap-12',
    '#clinica .grid > div',
    '#contato .grid > div'
  ];

  // Configurações do IntersectionObserver
  const OBSERVER_OPTIONS = {
    root: null, // viewport do navegador
    rootMargin: '0px 0px -60px 0px', // Aciona um pouco antes de entrar totalmente na tela
    threshold: 0.05 // Aciona quando 5% do elemento está visível
  };

  // Criando o observador de interseção
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Para de observar depois que animou (efeito ocorre apenas uma vez por carregamento)
        observer.unobserve(entry.target);
      }
    });
  }, OBSERVER_OPTIONS);

  // Inicializa um elemento específico para animação
  function initElementReveal(el) {
    if (el.nodeType !== 1) return;
    if (el.classList.contains('scroll-reveal')) return;

    // Filtros de segurança para não quebrar componentes interativos, modais, cabeçalhos ou rodapés
    if (el.closest('header') || 
        el.closest('footer') || 
        el.closest('#booking-modal') || 
        el.closest('#detail-modal') || 
        el.closest('#loading-screen') || 
        el.closest('#password-gate-screen')) {
      return;
    }

    // Adiciona a classe base de animação
    el.classList.add('scroll-reveal');

    // Calcula o atraso (stagger) para elementos que estão na mesma grade (grid)
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('grid') || parent.id === 'featured-treatments-grid' || parent.id === 'treatments-grid')) {
      const siblings = Array.from(parent.children).filter(child => child.nodeType === 1);
      const index = siblings.indexOf(el);
      if (index >= 0 && index < 10) {
        el.classList.add(`reveal-delay-${(index % 10) * 100}`);
      }
    }

    // Inicia a observação do elemento
    revealObserver.observe(el);
  }

  // Faz a busca na página e registra os elementos correspondentes aos seletores
  function scanAndRegister() {
    SELECTORS.forEach(selector => {
      document.querySelectorAll(selector).forEach(initElementReveal);
    });
  }

  // Registra as funções quando o DOM estiver pronto
  function init() {
    // Escaneia os elementos estáticos iniciais
    scanAndRegister();

    // MutationObserver: Monitora o carregamento dinâmico de elementos (ex: conteúdo do Supabase/banco)
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldScan = false;
      for (let i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length > 0) {
          shouldScan = true;
          break;
        }
      }
      if (shouldScan) {
        scanAndRegister();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
