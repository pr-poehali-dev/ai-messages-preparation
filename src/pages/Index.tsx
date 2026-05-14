import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/62f83fc1-bd8c-4313-987e-e7139c83e482/files/79322d15-b292-4f79-9b1c-d592b1d02531.jpg";

const ARTICLES = [
  {
    id: 1,
    title: "GPT-5: что изменится в мире языковых моделей",
    excerpt: "Разбираем архитектурные новшества следующего поколения трансформеров и их влияние на индустрию.",
    category: "Языковые модели",
    tag: "LLM",
    date: "12 мая 2026",
    readTime: "8 мин",
    color: "cyan",
    image: HERO_IMAGE,
  },
  {
    id: 2,
    title: "Нейросети в медицине: диагностика рака с точностью 97%",
    excerpt: "Как алгоритмы глубокого обучения превзошли врачей-рентгенологов в выявлении онкологии.",
    category: "Медицина",
    tag: "Deep Learning",
    date: "10 мая 2026",
    readTime: "6 мин",
    color: "purple",
    image: HERO_IMAGE,
  },
  {
    id: 3,
    title: "Агентные системы: ИИ, который действует сам",
    excerpt: "От цепочки промптов к автономным агентам — как AI-системы учатся принимать решения.",
    category: "Агенты",
    tag: "Agents",
    date: "8 мая 2026",
    readTime: "10 мин",
    color: "green",
    image: HERO_IMAGE,
  },
  {
    id: 4,
    title: "Мультимодальные модели: зрение + язык + звук",
    excerpt: "Gemini Ultra и GPT-4o показали: будущее ИИ — это синтез всех форм восприятия.",
    category: "Мультимодальность",
    tag: "Vision",
    date: "5 мая 2026",
    readTime: "7 мин",
    color: "cyan",
    image: HERO_IMAGE,
  },
  {
    id: 5,
    title: "Квантовые вычисления и машинное обучение",
    excerpt: "Как квантовые компьютеры изменят скорость обучения нейросетей и откроют новые горизонты.",
    category: "Квантовые вычисления",
    tag: "Quantum AI",
    date: "3 мая 2026",
    readTime: "12 мин",
    color: "purple",
    image: HERO_IMAGE,
  },
  {
    id: 6,
    title: "Этика ИИ: кто несёт ответственность за решения алгоритмов",
    excerpt: "Правовые и философские вопросы ответственности в эпоху автономных систем принятия решений.",
    category: "Этика",
    tag: "Ethics",
    date: "1 мая 2026",
    readTime: "9 мин",
    color: "green",
    image: HERO_IMAGE,
  },
];

const CATEGORIES = [
  { name: "Языковые модели", count: 24, icon: "MessageSquare", color: "cyan", desc: "GPT, Claude, Gemini и другие LLM" },
  { name: "Компьютерное зрение", count: 18, icon: "Eye", color: "purple", desc: "Распознавание изображений и видео" },
  { name: "Агентные системы", count: 12, icon: "Bot", color: "green", desc: "Автономные AI-агенты и цепочки" },
  { name: "Этика и безопасность", count: 9, icon: "Shield", color: "cyan", desc: "Ответственный ИИ и риски" },
  { name: "Исследования", count: 31, icon: "FlaskConical", color: "purple", desc: "Научные статьи и эксперименты" },
  { name: "Инструменты", count: 16, icon: "Wrench", color: "green", desc: "Frameworks, библиотеки, API" },
];

const TAGS = ["LLM", "GPT", "Claude", "Gemini", "Deep Learning", "Agents", "Vision", "NLP", "Quantum AI", "Ethics", "Diffusion", "RAG", "Fine-tuning", "Prompt Engineering"];

const STATS = [
  { value: "200+", label: "Статей", icon: "FileText" },
  { value: "50K+", label: "Читателей", icon: "Users" },
  { value: "15", label: "Категорий", icon: "Tag" },
  { value: "3", label: "Обновлений в неделю", icon: "Zap" },
];

const colorMap = {
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-400/60",
    tag: "border-cyan-500/50 text-cyan-400 bg-cyan-500/5",
    dot: "bg-cyan-400",
    glow: "shadow-cyan-500/20",
    text: "text-cyan-400",
    icon: "text-cyan-400",
  },
  purple: {
    border: "border-purple-500/30 hover:border-purple-400/60",
    tag: "border-purple-500/50 text-purple-400 bg-purple-500/5",
    dot: "bg-purple-400",
    glow: "shadow-purple-500/20",
    text: "text-purple-400",
    icon: "text-purple-400",
  },
  green: {
    border: "border-emerald-500/30 hover:border-emerald-400/60",
    tag: "border-emerald-500/50 text-emerald-400 bg-emerald-500/5",
    dot: "bg-emerald-400",
    glow: "shadow-emerald-500/20",
    text: "text-emerald-400",
    icon: "text-emerald-400",
  },
};

type Page = "home" | "articles" | "categories";

export default function Index() {
  const navigate = useNavigate();
  const [page, setPage] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filtered = ARTICLES.filter((a) => {
    const matchSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || a.tag === activeTag;
    return matchSearch && matchTag;
  });

  const navItems: { label: string; id: Page; icon: string }[] = [
    { label: "Главная", id: "home", icon: "Home" },
    { label: "Статьи", id: "articles", icon: "FileText" },
    { label: "Категории", id: "categories", icon: "LayoutGrid" },
  ];

  return (
    <div className="min-h-screen grid-bg scanline" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* NAV */}
      <nav
        style={{
          background: "rgba(5, 13, 26, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0, 245, 255, 0.1)",
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-8 h-8 rounded flex items-center justify-center pulse-glow"
              style={{ background: "rgba(0, 245, 255, 0.15)", border: "1px solid rgba(0, 245, 255, 0.4)" }}
            >
              <Icon name="Brain" size={16} className="text-cyan-400" />
            </div>
            <span
              className="font-orbitron text-sm font-bold tracking-widest neon-text"
              style={{ color: "var(--neon-cyan)" }}
            >
              NEURAL<span style={{ color: "var(--neon-purple)" }}>BLOG</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-mono-plex tracking-wide transition-all duration-200 ${
                  page === item.id
                    ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/30"
                    : "text-slate-400 hover:text-cyan-300 hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon name={item.icon} size={14} />
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("/presentation")}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded font-mono-plex text-xs font-medium transition-all duration-200"
            style={{
              background: "rgba(168,85,247,0.12)",
              border: "1px solid rgba(168,85,247,0.35)",
              color: "#a855f7",
            }}
          >
            <Icon name="Presentation" size={14} />
            Презентация
          </button>

          <button
            className="md:hidden text-cyan-400 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden px-6 pb-4 flex flex-col gap-2"
            style={{ borderTop: "1px solid rgba(0, 245, 255, 0.1)" }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setMobileMenuOpen(false); }}
                className={`flex items-center gap-2 px-4 py-3 rounded text-sm font-mono-plex transition-all ${
                  page === item.id ? "text-cyan-400 bg-cyan-500/10" : "text-slate-400"
                }`}
              >
                <Icon name={item.icon} size={14} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-16">
        {/* ===== HOME PAGE ===== */}
        {page === "home" && (
          <>
            {/* SLIDE 1: HERO */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(0, 128, 255, 0.08) 0%, transparent 70%)",
                }}
              />
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 3 + 1 + "px",
                      height: Math.random() * 3 + 1 + "px",
                      background: i % 2 === 0 ? "var(--neon-cyan)" : "var(--neon-purple)",
                      left: Math.random() * 100 + "%",
                      top: Math.random() * 100 + "%",
                      opacity: Math.random() * 0.6 + 0.2,
                      animation: `pulse-glow ${Math.random() * 3 + 2}s ease-in-out infinite`,
                      animationDelay: Math.random() * 2 + "s",
                    }}
                  />
                ))}
              </div>

              <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center w-full">
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded mb-6 fade-in-up"
                    style={{
                      background: "rgba(0, 245, 255, 0.08)",
                      border: "1px solid rgba(0, 245, 255, 0.3)",
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400 blink" />
                    <span className="font-mono-plex text-xs text-cyan-400 tracking-widest uppercase">
                      Live · Обновляется 3 раза в неделю
                    </span>
                  </div>

                  <h1
                    className="font-orbitron font-black leading-none mb-6 fade-in-up-delay-1"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
                  >
                    <span style={{ color: "var(--neon-cyan)" }} className="neon-text block">
                      ИИ
                    </span>
                    <span className="text-white block">В ДЕТАЛЯХ</span>
                    <span style={{ color: "var(--neon-purple)" }} className="neon-text-purple block text-3xl md:text-4xl font-light">
                      и без лишнего шума
                    </span>
                  </h1>

                  <p className="text-slate-400 text-lg leading-relaxed mb-8 fade-in-up-delay-2" style={{ maxWidth: 480 }}>
                    Глубокие материалы об искусственном интеллекте: от архитектуры нейросетей до этики алгоритмов. Для тех, кто хочет понять — а не просто быть в курсе.
                  </p>

                  <div className="flex flex-wrap gap-4 fade-in-up-delay-3">
                    <button
                      onClick={() => setPage("articles")}
                      className="flex items-center gap-2 px-6 py-3 rounded font-mono-plex text-sm font-medium transition-all duration-300 glitch"
                      style={{
                        background: "var(--neon-cyan)",
                        color: "#050d1a",
                        boxShadow: "0 0 25px rgba(0, 245, 255, 0.4)",
                      }}
                    >
                      <Icon name="Zap" size={16} />
                      Читать статьи
                    </button>
                    <button
                      onClick={() => setPage("categories")}
                      className="flex items-center gap-2 px-6 py-3 rounded font-mono-plex text-sm font-medium transition-all duration-300"
                      style={{
                        background: "rgba(168, 85, 247, 0.1)",
                        border: "1px solid rgba(168, 85, 247, 0.4)",
                        color: "#a855f7",
                      }}
                    >
                      <Icon name="LayoutGrid" size={16} />
                      Категории
                    </button>
                  </div>
                </div>

                <div className="hidden md:block relative fade-in-up-delay-2">
                  <div
                    className="relative rounded-lg overflow-hidden"
                    style={{
                      border: "1px solid rgba(0, 245, 255, 0.2)",
                      boxShadow: "0 0 60px rgba(0, 245, 255, 0.15)",
                    }}
                  >
                    <img src={HERO_IMAGE} alt="AI Neural Network" className="w-full object-cover" style={{ height: 400 }} />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(5, 13, 26, 0.8) 0%, transparent 60%)",
                      }}
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span
                        className="font-mono-plex text-xs text-cyan-400 uppercase tracking-widest"
                        style={{ opacity: 0.7 }}
                      >
                        Neural Network Visualization
                      </span>
                    </div>
                  </div>
                  <div
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)",
                      filter: "blur(20px)",
                    }}
                  />
                </div>
              </div>
            </section>

            {/* SLIDE 2: STATS */}
            <section className="py-20" style={{ borderTop: "1px solid rgba(0, 245, 255, 0.08)" }}>
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {STATS.map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-6 rounded-lg"
                      style={{
                        background: "rgba(10, 22, 40, 0.8)",
                        border: "1px solid rgba(0, 245, 255, 0.1)",
                      }}
                    >
                      <Icon name={stat.icon} size={24} className="text-cyan-400 mx-auto mb-3" />
                      <div
                        className="font-orbitron font-black text-3xl mb-1 neon-text"
                        style={{ color: "var(--neon-cyan)" }}
                      >
                        {stat.value}
                      </div>
                      <div className="font-mono-plex text-xs text-slate-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SLIDE 3: FEATURED ARTICLES */}
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <span className="font-mono-plex text-xs text-cyan-400 uppercase tracking-widest mb-2 block">
                      // последние материалы
                    </span>
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white">
                      Свежие статьи
                    </h2>
                  </div>
                  <button
                    onClick={() => setPage("articles")}
                    className="hidden md:flex items-center gap-2 text-cyan-400 font-mono-plex text-sm hover:gap-3 transition-all"
                  >
                    Все статьи <Icon name="ArrowRight" size={16} />
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {ARTICLES.slice(0, 3).map((article) => {
                    const c = colorMap[article.color as keyof typeof colorMap];
                    return (
                      <div
                        key={article.id}
                        className={`rounded-lg overflow-hidden card-hover cursor-pointer neon-border`}
                        style={{ background: "rgba(10, 22, 40, 0.9)" }}
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div
                            className="absolute inset-0"
                            style={{ background: "linear-gradient(to top, rgba(10,22,40,0.95) 0%, transparent 70%)" }}
                          />
                          <span className={`tag absolute top-3 left-3 ${c.tag}`}>
                            {article.tag}
                          </span>
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                            <span className="font-mono-plex text-xs text-slate-500">{article.category}</span>
                            <span className="font-mono-plex text-xs text-slate-600 ml-auto">{article.readTime}</span>
                          </div>
                          <h3 className="text-white font-semibold text-sm leading-snug mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{article.excerpt}</p>
                          <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <span className="font-mono-plex text-xs text-slate-600">{article.date}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SLIDE 4: CATEGORIES PREVIEW */}
            <section
              className="py-20"
              style={{ borderTop: "1px solid rgba(0, 245, 255, 0.08)" }}
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                  <span className="font-mono-plex text-xs text-purple-400 uppercase tracking-widest mb-2 block">
                    // навигация по темам
                  </span>
                  <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white">
                    Категории знаний
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {CATEGORIES.map((cat, i) => {
                    const c = colorMap[cat.color as keyof typeof colorMap];
                    return (
                      <button
                        key={i}
                        onClick={() => setPage("categories")}
                        className={`text-left p-5 rounded-lg transition-all duration-300 card-hover ${c.border}`}
                        style={{ background: "rgba(10, 22, 40, 0.8)", border: "1px solid" }}
                      >
                        <div className={`mb-3 ${c.icon}`}>
                          <Icon name={cat.icon} size={22} />
                        </div>
                        <h3 className="text-white font-semibold text-sm mb-1">{cat.name}</h3>
                        <p className="text-slate-500 text-xs mb-3">{cat.desc}</p>
                        <span className={`font-mono-plex text-xs ${c.text}`}>
                          {cat.count} материалов →
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SLIDE 5: TAGS CLOUD */}
            <section
              className="py-20"
              style={{ borderTop: "1px solid rgba(0, 245, 255, 0.08)" }}
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-10">
                  <span className="font-mono-plex text-xs text-emerald-400 uppercase tracking-widest mb-2 block">
                    // быстрая навигация
                  </span>
                  <h2 className="font-orbitron text-2xl font-bold text-white">Теги</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => { setActiveTag(tag === activeTag ? null : tag); setPage("articles"); }}
                      className={`tag transition-all duration-200 ${
                        activeTag === tag
                          ? "border-cyan-400 text-cyan-400 bg-cyan-500/10"
                          : "border-slate-700 text-slate-500 hover:border-cyan-500/50 hover:text-cyan-400"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* SLIDE 6: CTA */}
            <section
              className="py-24"
              style={{ borderTop: "1px solid rgba(0, 245, 255, 0.08)" }}
            >
              <div className="max-w-3xl mx-auto px-6 text-center">
                <div
                  className="p-12 rounded-2xl relative overflow-hidden"
                  style={{
                    background: "rgba(10, 22, 40, 0.9)",
                    border: "1px solid rgba(0, 245, 255, 0.2)",
                    boxShadow: "0 0 80px rgba(0, 245, 255, 0.08)",
                  }}
                >
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32"
                    style={{
                      background: "radial-gradient(ellipse, rgba(0, 245, 255, 0.12), transparent)",
                      filter: "blur(20px)",
                    }}
                  />
                  <Icon name="Brain" size={40} className="text-cyan-400 mx-auto mb-6" />
                  <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-4">
                    Погрузитесь глубже
                  </h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Более 200 материалов об ИИ — от вводных статей до глубоких технических разборов. Найдите то, что нужно именно вам.
                  </p>
                  <button
                    onClick={() => setPage("articles")}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-orbitron text-sm font-bold tracking-wider transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-blue))",
                      color: "#050d1a",
                      boxShadow: "0 0 30px rgba(0, 245, 255, 0.3)",
                    }}
                  >
                    <Icon name="Rocket" size={18} />
                    Начать читать
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ===== ARTICLES PAGE ===== */}
        {page === "articles" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-10">
              <span className="font-mono-plex text-xs text-cyan-400 uppercase tracking-widest mb-2 block">
                // база знаний
              </span>
              <h1 className="font-orbitron text-3xl md:text-4xl font-black text-white mb-2">
                Статьи
              </h1>
              <p className="text-slate-500 font-plex">Все материалы об искусственном интеллекте</p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Поиск по статьям, категориям..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input w-full pl-11 pr-4 py-3 rounded-lg font-plex text-sm text-slate-300 placeholder-slate-600 transition-all"
                style={{
                  background: "rgba(10, 22, 40, 0.9)",
                  border: "1px solid rgba(0, 245, 255, 0.2)",
                  outline: "none",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>

            {/* Tags filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveTag(null)}
                className={`tag transition-all ${
                  !activeTag
                    ? "border-cyan-400 text-cyan-400 bg-cyan-500/10"
                    : "border-slate-700 text-slate-500 hover:border-slate-500"
                }`}
              >
                Все
              </button>
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                  className={`tag transition-all ${
                    activeTag === tag
                      ? "border-cyan-400 text-cyan-400 bg-cyan-500/10"
                      : "border-slate-700 text-slate-500 hover:border-cyan-500/50 hover:text-cyan-400"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div className="mb-6">
              <span className="font-mono-plex text-xs text-slate-600">
                {filtered.length === 0 ? "Ничего не найдено" : `Найдено: ${filtered.length} материал${filtered.length === 1 ? "" : filtered.length < 5 ? "а" : "ов"}`}
              </span>
            </div>

            {/* Articles grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <Icon name="SearchX" size={48} className="text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-plex">Попробуйте изменить запрос или сбросить фильтры</p>
                <button
                  onClick={() => { setSearch(""); setActiveTag(null); }}
                  className="mt-4 text-cyan-400 font-mono-plex text-sm hover:underline"
                >
                  Сбросить всё
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((article) => {
                  const c = colorMap[article.color as keyof typeof colorMap];
                  return (
                    <div
                      key={article.id}
                      className="rounded-lg overflow-hidden card-hover cursor-pointer group"
                      style={{
                        background: "rgba(10, 22, 40, 0.9)",
                        border: "1px solid rgba(0, 245, 255, 0.1)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0, 245, 255, 0.35)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 30px rgba(0, 245, 255, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0, 245, 255, 0.1)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      }}
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(to top, rgba(10,22,40,1) 0%, rgba(10,22,40,0.3) 60%, transparent 100%)" }}
                        />
                        <span className={`tag absolute top-3 left-3 ${c.tag}`}>{article.tag}</span>
                        <span className="absolute top-3 right-3 font-mono-plex text-xs text-slate-400 bg-black/50 px-2 py-1 rounded">
                          {article.readTime}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                          <span className="font-mono-plex text-xs text-slate-500 truncate">{article.category}</span>
                          <span className="font-mono-plex text-xs text-slate-700 ml-auto flex-shrink-0">{article.date}</span>
                        </div>
                        <h3 className="text-white font-semibold text-sm leading-snug mb-2 group-hover:text-cyan-300 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{article.excerpt}</p>
                        <div className="mt-4 flex items-center gap-1 text-cyan-400 font-mono-plex text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          Читать далее <Icon name="ArrowRight" size={12} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ===== CATEGORIES PAGE ===== */}
        {page === "categories" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12">
              <span className="font-mono-plex text-xs text-purple-400 uppercase tracking-widest mb-2 block">
                // структура знаний
              </span>
              <h1 className="font-orbitron text-3xl md:text-4xl font-black text-white mb-2">
                Категории
              </h1>
              <p className="text-slate-500 font-plex">Найдите материалы по нужной теме</p>
            </div>

            {/* SLIDE 7: Categories grid big */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {CATEGORIES.map((cat, i) => {
                const c = colorMap[cat.color as keyof typeof colorMap];
                const catArticles = ARTICLES.filter(
                  (a) => a.category === cat.name || (cat.name === "Языковые модели" && ["LLM"].includes(a.tag))
                );
                return (
                  <div
                    key={i}
                    className="p-6 rounded-xl card-hover cursor-pointer group"
                    style={{
                      background: "rgba(10, 22, 40, 0.9)",
                      border: `1px solid ${cat.color === "cyan" ? "rgba(0, 245, 255, 0.15)" : cat.color === "purple" ? "rgba(168, 85, 247, 0.15)" : "rgba(52, 211, 153, 0.15)"}`,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = cat.color === "cyan"
                        ? "0 0 40px rgba(0, 245, 255, 0.1)"
                        : cat.color === "purple"
                        ? "0 0 40px rgba(168, 85, 247, 0.1)"
                        : "0 0 40px rgba(52, 211, 153, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg ${c.icon}`}
                        style={{
                          background: cat.color === "cyan" ? "rgba(0, 245, 255, 0.08)" : cat.color === "purple" ? "rgba(168, 85, 247, 0.08)" : "rgba(52, 211, 153, 0.08)",
                        }}
                      >
                        <Icon name={cat.icon} size={24} />
                      </div>
                      <span
                        className={`font-orbitron text-3xl font-black ${c.text}`}
                        style={{ opacity: 0.3 }}
                      >
                        {String(cat.count).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-white font-orbitron font-bold text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-slate-500 text-sm mb-5">{cat.desc}</p>

                    <div
                      className="pt-4"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-mono-plex text-xs ${c.text}`}>
                          {cat.count} материалов
                        </span>
                        <button
                          onClick={() => {
                            setActiveTag(null);
                            setSearch(cat.name);
                            setPage("articles");
                          }}
                          className={`font-mono-plex text-xs flex items-center gap-1 ${c.text} hover:underline`}
                        >
                          Смотреть <Icon name="ArrowRight" size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tags full cloud */}
            <div
              className="p-8 rounded-xl"
              style={{
                background: "rgba(10, 22, 40, 0.9)",
                border: "1px solid rgba(0, 245, 255, 0.1)",
              }}
            >
              <h2 className="font-orbitron text-lg font-bold text-white mb-2">Все теги</h2>
              <p className="text-slate-500 text-sm mb-6 font-mono-plex">Нажмите на тег для фильтрации статей</p>
              <div className="flex flex-wrap gap-3">
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setActiveTag(tag);
                      setPage("articles");
                    }}
                    className="tag border-slate-700 text-slate-400 hover:border-cyan-500/60 hover:text-cyan-400 transition-all"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer
        className="mt-20 py-10"
        style={{ borderTop: "1px solid rgba(0, 245, 255, 0.08)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="Brain" size={16} className="text-cyan-400" />
            <span className="font-orbitron text-xs font-bold tracking-widest" style={{ color: "var(--neon-cyan)" }}>
              NEURALBLOG
            </span>
          </div>
          <span className="font-mono-plex text-xs text-slate-700">
            © 2026 · Блог об искусственном интеллекте
          </span>
          <div className="flex items-center gap-1 font-mono-plex text-xs text-slate-700">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 blink" />
            Система активна
          </div>
        </div>
      </footer>
    </div>
  );
}