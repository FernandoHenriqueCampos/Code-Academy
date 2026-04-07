<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue';
import ItemForm from './components/ItemForm.vue';
import MenuCard from './components/MenuCard.vue';
import FilterBar from './components/FilterBar.vue';
import StatsBar from './components/StatsBar.vue';

// State
const items = ref([]);
const activeCategory = ref('Todas');
const PREVIEW_LIMIT = 4;
const showMoreItems = ref(false);
const sidebarRef = ref(null);
const previewGridRef = ref(null);
const contentHeaderRef = ref(null);
const filterNavRef = ref(null);
const previewCardHeight = ref(220);
const itemFormHeight = ref(null);
let resizeObserver = null;

// Load initial data or from localStorage
onMounted(() => {
  const savedItems = localStorage.getItem('cardapio-items');
  if (savedItems) {
    items.value = JSON.parse(savedItems);
  } else {
    // Initial dummy data for better first look
    items.value = [
      { id: 1, name: 'Hambúrguer Gourmet', price: 32.50, category: 'Lanche', available: true },
      { id: 2, name: 'Refrigerante 350ml', price: 7.00, category: 'Bebida', available: true },
      { id: 3, name: 'Brownie com Sorvete', price: 18.00, category: 'Sobremesa', available: false },
      { id: 4, name: 'Batata Rústica', price: 15.00, category: 'Lanche', available: true },
    ];
  }
});

// Watch updates for persistence
watch(items, (newItems) => {
  localStorage.setItem('cardapio-items', JSON.stringify(newItems));
}, { deep: true });

// Actions
const addItem = (item) => {
  items.value.push(item);
};

const removeItem = (id) => {
  items.value = items.value.filter(item => item.id !== id);
};

const updateCategory = (category) => {
  activeCategory.value = category;
};

// Computed Properties
const filteredItems = computed(() => {
  if (activeCategory.value === 'Todas') return items.value;
  return items.value.filter(item => item.category === activeCategory.value);
});

const previewItems = computed(() => filteredItems.value.slice(0, PREVIEW_LIMIT));
const extraItems = computed(() => filteredItems.value.slice(PREVIEW_LIMIT));
const hasExtraItems = computed(() => extraItems.value.length > 0);
const visibleExtraItems = computed(() => (showMoreItems.value ? extraItems.value : []));

const filteredSummary = computed(() => {
  const count = filteredItems.value.length;
  const itemLabel = count === 1 ? 'item encontrado' : 'itens encontrados';
  const categoryLabel = activeCategory.value === 'Todas'
    ? 'todas as categorias'
    : `categoria ${activeCategory.value}`;

  return `${count} ${itemLabel} em ${categoryLabel}.`;
});

const stats = computed(() => {
  const visibleItems = filteredItems.value;
  const total = visibleItems.length;
  const available = visibleItems.filter(item => item.available >= 1).length;
  const totalStock = visibleItems.reduce((acc, item) => {
    if (typeof item.available === 'boolean') {
      return acc + (item.available ? 1 : 0);
    }

    const stock = Number(item.available);
    return acc + (Number.isFinite(stock) && stock > 0 ? Math.floor(stock) : 0);
  }, 0);
  
  // Calculate avg price for visible filtered items
  const visibleAndAvailable = visibleItems.filter(item => item.available >= 1);
  
  const sumPrice = visibleAndAvailable.reduce((acc, item) => acc + item.price, 0);
  const avgPrice = visibleAndAvailable.length > 0 ? (sumPrice / visibleAndAvailable.length) : 0;
  
  return { total, available, totalStock, avgPrice };
});

const updatePreviewHeight = () => {
  previewCardHeight.value = 220;

  const isDesktop = window.innerWidth > 1024;
  if (!isDesktop || !sidebarRef.value || !previewGridRef.value) {
    itemFormHeight.value = null;
    return;
  }

  const sidebarTop = sidebarRef.value.getBoundingClientRect().top;
  const previewBottom = previewGridRef.value.getBoundingClientRect().bottom;
  const computedHeight = Math.floor(previewBottom - sidebarTop);
  const minDesktopHeight = 560;

  itemFormHeight.value = Math.max(minDesktopHeight, computedHeight);
};

const toggleMoreItems = () => {
  showMoreItems.value = !showMoreItems.value;
};

onMounted(() => {
  nextTick(updatePreviewHeight);

  resizeObserver = new ResizeObserver(() => {
    updatePreviewHeight();
  });

  if (sidebarRef.value) resizeObserver.observe(sidebarRef.value);
  if (previewGridRef.value) resizeObserver.observe(previewGridRef.value);
  if (contentHeaderRef.value) resizeObserver.observe(contentHeaderRef.value);
  if (filterNavRef.value) resizeObserver.observe(filterNavRef.value);
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});

watch(filteredItems, () => {
  showMoreItems.value = false;
  nextTick(updatePreviewHeight);
});
</script>

<template>
  <div class="app-wrapper">
    <header class="site-header">
      <div class="container nav-shell">
        <a href="#inicio" class="brand">Cardápio Digital</a>
        <nav class="main-nav" aria-label="Navegação principal">
          <a href="#resumo">Resumo</a>
          <a href="#cadastro">Cadastro</a>
        </nav>
      </div>
    </header>

    <section id="inicio" class="hero-section glass">
      <div class="hero-content container">
        <div class="title-section fade-in">
          <span class="badge">Premium Menu</span>
          <h1>Cardápio Digital</h1>
          <p>Gerencie sua experiência gastronômica com facilidade.</p>
        </div>
      </div>
    </section>

    <main class="container main-content">
      <section id="resumo" class="stats-section" aria-labelledby="stats-title">
        <h2 id="stats-title" class="sr-only">Resumo do cardápio</h2>
        <StatsBar :stats="stats" />
      </section>

      <div class="main-grid">
        <aside id="cadastro" ref="sidebarRef" class="sidebar" aria-label="Cadastro de itens">
          <ItemForm
            @add-item="addItem"
            :style="itemFormHeight ? { '--item-form-target-height': `${itemFormHeight}px` } : null"
          />
        </aside>

        <section id="catalogo" class="content-area" aria-labelledby="catalog-title">
          <header ref="contentHeaderRef" class="content-header fade-in">
            <h2 id="catalog-title">Itens do Cardápio</h2>
            <p>{{ filteredSummary }}</p>
          </header>

          <nav ref="filterNavRef" class="filter-nav" aria-label="Filtrar itens por categoria">
            <FilterBar :active-category="activeCategory" @update-category="updateCategory" />
          </nav>
          
          <template v-if="filteredItems.length > 0">
            <div
              ref="previewGridRef"
              class="menu-grid preview-grid"
              role="list"
              aria-label="Lista de itens do cardápio"
              :style="{ '--preview-card-height': `${previewCardHeight}px` }"
            >
              <article v-for="item in previewItems" :key="item.id" class="menu-entry preview-entry" role="listitem">
                <MenuCard
                  :item="item"
                  @remove-item="removeItem"
                />
              </article>
            </div>

          </template>

          <section v-else class="empty-state glass fade-in" aria-live="polite">
            <div class="empty-icon">🍽️</div>
            <h3>Nenhum item encontrado</h3>
            <p>Não há itens cadastrados na categoria <b>{{ activeCategory }}</b>.</p>
          </section>
        </section>

        <section v-if="hasExtraItems && filteredItems.length > 0" class="expand-section">
          <div
            v-if="visibleExtraItems.length > 0"
            class="menu-grid expanded-grid"
            role="list"
            aria-label="Itens adicionais do cardápio"
          >
            <article v-for="item in visibleExtraItems" :key="item.id" class="menu-entry" role="listitem">
              <MenuCard
                :item="item"
                @remove-item="removeItem"
              />
            </article>
          </div>

          <button type="button" class="btn-show-more" @click="toggleMoreItems">
            {{ showMoreItems ? 'Mostrar menos' : `Mostrar mais (${extraItems.length})` }}
          </button>
        </section>
      </div>
    </main>

    <footer class="main-footer">
      <div class="container footer-content">
        <div class="footer-brand">
          <strong>Cardápio Digital Master</strong>
          <p>Projeto desenvolvido por Fernando Henrique Campos.</p>
        </div>

        <div class="footer-social" aria-label="Redes sociais">
          <a
            href="https://github.com/FernandoHenriqueCampos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Fernando Henrique Campos"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/fernando-hvc/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Fernando Henrique Campos"
          >
            LinkedIn
          </a>
        </div>

        <p class="footer-copy">&copy; 2026 Cardápio Digital Master. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(15, 23, 42, 0.78);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--card-border);
}

.nav-shell {
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  letter-spacing: 0.01em;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.main-nav a {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: all 0.25s ease;
}

.main-nav a:hover {
  color: var(--text-primary);
  border-color: var(--card-border);
  background: rgba(255, 255, 255, 0.05);
}

.hero-section {
  padding: 3.75rem 0 4.5rem 0;
  background:
    radial-gradient(circle at 10% 10%, rgba(245, 158, 11, 0.16), transparent 45%),
    radial-gradient(circle at 90% 20%, rgba(59, 130, 246, 0.14), transparent 42%),
    linear-gradient(to bottom, rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.12));
  margin-bottom: 2rem;
}

.title-section {
  text-align: center;
}

.badge {
  background: var(--primary-gradient);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: white;
  margin-bottom: 1rem;
  display: inline-block;
}

h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #f8fafc, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-section p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.main-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 3rem;
  align-items: flex-start;
}

.content-header {
  margin-bottom: 1rem;
}

.content-header h2 {
  font-size: 1.55rem;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
}

.content-header p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.filter-nav {
  margin-bottom: 0.25rem;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.preview-grid {
  align-content: start;
}

.preview-entry {
  height: var(--preview-card-height, 220px);
  min-height: 0;
}

.preview-entry :deep(.menu-card) {
  height: 100%;
  min-height: 100%;
}

.menu-entry {
  min-width: 0;
}

.expand-section {
  grid-column: 1 / -1;
  margin-top: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.btn-show-more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 44px;
  margin-top: 0.9rem;
  padding: 0.65rem 1.2rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-show-more:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
}

.expanded-grid {
  margin-top: 0;
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  border-radius: 30px;
  background: var(--card-bg);
  border: 1px dashed var(--card-border);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.empty-state p {
  color: var(--text-secondary);
}

.main-footer {
  margin-top: auto;
  padding: 2.5rem 0 2rem;
  border-top: 1px solid var(--card-border);
  background:
    radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.12), transparent 42%),
    radial-gradient(circle at 100% 100%, rgba(245, 158, 11, 0.12), transparent 45%);
}

#inicio,
#resumo,
#cadastro,
#catalogo {
  scroll-margin-top: 92px;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  flex-wrap: wrap;
  color: var(--text-secondary);
}

.footer-brand strong {
  color: var(--text-primary);
  display: block;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.footer-brand p {
  margin: 0;
  font-size: 0.9rem;
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.footer-social a {
  text-decoration: none;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--card-border);
  background: rgba(255, 255, 255, 0.04);
  transition: all 0.22s ease;
}

.footer-social a:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.1);
}

.footer-copy {
  width: 100%;
  margin: 0;
  padding-top: 0.65rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.82rem;
  text-align: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 1024px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
  }

  .preview-entry {
    height: 220px;
  }
}

@media (max-width: 768px) {
  .nav-shell {
    min-height: auto;
    padding: 0.8rem 0;
    flex-direction: column;
    align-items: flex-start;
  }

  .main-nav {
    flex-wrap: wrap;
  }

  h1 {
    font-size: 2.5rem;
  }
  
  .hero-section {
    padding: 2.5rem 0 3.2rem 0;
  }

  #inicio,
  #resumo,
  #cadastro,
  #catalogo {
    scroll-margin-top: 122px;
  }

  .footer-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-social {
    width: 100%;
    flex-wrap: wrap;
  }
}
</style>
