import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const IMG_NEURAL = "https://cdn.poehali.dev/projects/62f83fc1-bd8c-4313-987e-e7139c83e482/files/69da2b73-4eba-415e-82ae-dd647e824ea6.jpg";
const IMG_HUMAN = "https://cdn.poehali.dev/projects/62f83fc1-bd8c-4313-987e-e7139c83e482/files/d2d93281-8b36-48b4-843c-2a604c266736.jpg";
const IMG_DATA = "https://cdn.poehali.dev/projects/62f83fc1-bd8c-4313-987e-e7139c83e482/files/4bd29744-927a-425d-8d03-ca57ca9be90f.jpg";

// ---------------------------------------------------------------------------
// Slide-data interfaces
// ---------------------------------------------------------------------------

interface BaseSlide {
  id: number;
  label: string;
  accent: string;
  title: string;
}

interface HeroSlide extends BaseSlide {
  type: "hero";
  subtitle: string;
  caption: string;
  image: string;
}

interface DefinitionPoint {
  icon: string;
  text: string;
}

interface DefinitionSlide extends BaseSlide {
  type: "definition";
  image: string;
  definition: string;
  points: DefinitionPoint[];
}

interface TimelineEvent {
  year: string;
  text: string;
}

interface TimelineSlide extends BaseSlide {
  type: "timeline";
  events: TimelineEvent[];
}

interface AppItem {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

interface ApplicationsSlide extends BaseSlide {
  type: "applications";
  subtitle: string;
  image: string;
  apps: AppItem[];
}

interface StatItem {
  value: string;
  label: string;
  icon: string;
}

interface StatsSlide extends BaseSlide {
  type: "stats";
  subtitle: string;
  image: string;
  stats: StatItem[];
}

interface ChallengeItem {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

interface ChallengesSlide extends BaseSlide {
  type: "challenges";
  challenges: ChallengeItem[];
}

interface FutureItem {
  icon: string;
  text: string;
  color: string;
}

interface FutureSlide extends BaseSlide {
  type: "future";
  subtitle: string;
  image: string;
  futures: FutureItem[];
  cta: string;
}

type Slide =
  | HeroSlide
  | DefinitionSlide
  | TimelineSlide
  | ApplicationsSlide
  | StatsSlide
  | ChallengesSlide
  | FutureSlide;

// ---------------------------------------------------------------------------
// Slide data
// ---------------------------------------------------------------------------

const SLIDES: Slide[] = [
  {
    id: 1,
    label: "Введение",
    type: "hero",
    title: "Искусственный интеллект",
    subtitle: "в современном мире",
    caption: "Технология, меняющая всё вокруг нас",
    image: IMG_NEURAL,
    accent: "#00f5ff",
  },
  {
    id: 2,
    label: "Что такое ИИ",
    type: "definition",
    title: "Что такое ИИ?",
    accent: "#a855f7",
    image: IMG_NEURAL,
    definition:
      "Искусственный интеллект — это способность компьютерных систем выполнять задачи, требующие человеческого мышления: понимать речь, распознавать образы, принимать решения и обучаться на опыте.",
    points: [
      { icon: "Brain", text: "Машинное обучение — алгоритмы, обучающиеся на данных" },
      { icon: "Eye", text: "Компьютерное зрение — распознавание изображений и видео" },
      { icon: "MessageSquare", text: "Обработка языка — понимание и генерация текста" },
      { icon: "Cpu", text: "Нейронные сети — имитация работы мозга" },
    ],
  },
  {
    id: 3,
    label: "История",
    type: "timeline",
    title: "Путь длиной в 70 лет",
    accent: "#00f5ff",
    events: [
      { year: "1950", text: "Алан Тьюринг предложил «тест Тьюринга»" },
      { year: "1956", text: "Термин «Artificial Intelligence» впервые использован" },
      { year: "1997", text: "Deep Blue IBM победил чемпиона мира по шахматам" },
      { year: "2012", text: "Прорыв в компьютерном зрении: AlexNet" },
      { year: "2016", text: "AlphaGo победила лучшего игрока в Го" },
      { year: "2022", text: "ChatGPT — ИИ стал доступен каждому" },
      { year: "2026", text: "ИИ-агенты работают самостоятельно 24/7" },
    ],
  },
  {
    id: 4,
    label: "Применения",
    type: "applications",
    title: "ИИ уже везде",
    subtitle: "Отрасли, которые трансформирует ИИ",
    accent: "#00ff88",
    image: IMG_HUMAN,
    apps: [
      { icon: "Stethoscope", title: "Медицина", desc: "Диагностика, разработка лекарств, роботохирургия", color: "#00f5ff" },
      { icon: "GraduationCap", title: "Образование", desc: "Персональные траектории обучения", color: "#a855f7" },
      { icon: "Factory", title: "Производство", desc: "Предсказание поломок, автоматизация", color: "#00ff88" },
      { icon: "ShoppingCart", title: "Торговля", desc: "Рекомендации, прогноз спроса", color: "#f59e0b" },
      { icon: "Car", title: "Транспорт", desc: "Беспилотники, оптимизация маршрутов", color: "#00f5ff" },
      { icon: "Landmark", title: "Финансы", desc: "Выявление мошенничества, трейдинг", color: "#a855f7" },
    ],
  },
  {
    id: 5,
    label: "Цифры",
    type: "stats",
    title: "ИИ в цифрах",
    subtitle: "Рынок и влияние на экономику",
    accent: "#a855f7",
    image: IMG_DATA,
    stats: [
      { value: "$1.8 трлн", label: "Объём рынка ИИ к 2030 году", icon: "TrendingUp" },
      { value: "97 млн", label: "Новых рабочих мест создаст ИИ", icon: "Users" },
      { value: "40%", label: "Компаний уже используют ИИ", icon: "Building2" },
      { value: "×10", label: "Рост производительности труда", icon: "Zap" },
    ],
  },
  {
    id: 6,
    label: "Вызовы",
    type: "challenges",
    title: "Вызовы и риски",
    accent: "#f59e0b",
    challenges: [
      {
        icon: "ShieldAlert",
        title: "Безопасность",
        desc: "Deepfakes, кибератаки с помощью ИИ, автономное оружие",
        color: "#ef4444",
      },
      {
        icon: "Scale",
        title: "Этика и предвзятость",
        desc: "Дискриминация в алгоритмах, непрозрачность решений",
        color: "#f59e0b",
      },
      {
        icon: "UserMinus",
        title: "Рынок труда",
        desc: "Автоматизация рутинных профессий, необходимость переобучения",
        color: "#a855f7",
      },
      {
        icon: "Lock",
        title: "Конфиденциальность",
        desc: "Сбор и анализ персональных данных, слежка",
        color: "#00f5ff",
      },
    ],
  },
  {
    id: 7,
    label: "Будущее",
    type: "future",
    title: "Что впереди?",
    subtitle: "Горизонт 2030+",
    accent: "#00f5ff",
    image: IMG_NEURAL,
    futures: [
      { icon: "Atom", text: "AGI — Общий ИИ, способный решать любые задачи", color: "#00f5ff" },
      { icon: "HeartHandshake", text: "ИИ как личный помощник в каждом аспекте жизни", color: "#a855f7" },
      { icon: "Microscope", text: "Ускорение научных открытий в 100x", color: "#00ff88" },
      { icon: "Globe", text: "Решение глобальных проблем: климат, голод, болезни", color: "#f59e0b" },
    ],
    cta: "ИИ — это не замена человека. Это инструмент, который усиливает человеческие возможности.",
  },
];

export default function Presentation() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setDirection(index > current ? "next" : "prev");
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 350);
    },
    [animating, current]
  );

  const next = useCallback(
    () => goTo(Math.min(current + 1, SLIDES.length - 1)),
    [goTo, current]
  );

  const prev = useCallback(
    () => goTo(Math.max(current - 1, 0)),
    [goTo, current]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = SLIDES[current];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "#050d1a",
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(0,245,255,0.08)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 font-mono-plex text-xs transition-all"
            style={{ color: "rgba(255,255,255,0.3)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#00f5ff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            <Icon name="ChevronLeft" size={14} />
            Блог
          </button>
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)" }} />
          <Icon name="Brain" size={16} className="text-cyan-400" />
          <span
            className="font-orbitron text-xs font-bold tracking-widest"
            style={{ color: "#00f5ff" }}
          >
            NEURAL<span style={{ color: "#a855f7" }}>PRES</span>
          </span>
        </div>

        {/* Slide tabs */}
        <div className="hidden md:flex items-center gap-1">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className="px-3 py-1 rounded text-xs font-mono-plex transition-all duration-200"
              style={{
                background: i === current ? "rgba(0,245,255,0.12)" : "transparent",
                color: i === current ? "#00f5ff" : "rgba(255,255,255,0.3)",
                border: i === current ? "1px solid rgba(0,245,255,0.35)" : "1px solid transparent",
              }}
            >
              {String(i + 1).padStart(2, "0")}. {s.label}
            </button>
          ))}
        </div>

        <span className="font-mono-plex text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="w-full h-full absolute inset-0"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === "next" ? "30px" : "-30px"})`
              : "translateX(0)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          {/* HERO SLIDE */}
          {slide.type === "hero" && (
            <SlideHero slide={slide} />
          )}
          {slide.type === "definition" && (
            <SlideDefinition slide={slide} />
          )}
          {slide.type === "timeline" && (
            <SlideTimeline slide={slide} />
          )}
          {slide.type === "applications" && (
            <SlideApplications slide={slide} />
          )}
          {slide.type === "stats" && (
            <SlideStats slide={slide} />
          )}
          {slide.type === "challenges" && (
            <SlideChallenges slide={slide} />
          )}
          {slide.type === "future" && (
            <SlideFuture slide={slide} />
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <div
        className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(0,245,255,0.08)" }}
      >
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 rounded font-mono-plex text-sm transition-all duration-200 disabled:opacity-20"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <Icon name="ChevronLeft" size={16} />
          Назад
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 6,
                height: 6,
                background: i === current ? slide.accent : "rgba(255,255,255,0.15)",
                boxShadow: i === current ? `0 0 8px ${slide.accent}` : "none",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded font-mono-plex text-sm transition-all duration-200 disabled:opacity-20"
          style={{
            background: current === SLIDES.length - 1 ? "rgba(255,255,255,0.04)" : `rgba(0,245,255,0.12)`,
            border: `1px solid ${current === SLIDES.length - 1 ? "rgba(255,255,255,0.08)" : "rgba(0,245,255,0.35)"}`,
            color: current === SLIDES.length - 1 ? "rgba(255,255,255,0.6)" : "#00f5ff",
          }}
        >
          Вперёд
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
}

function SlideHero({ slide }: { slide: HeroSlide }) {
  return (
    <div className="w-full h-full relative flex items-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(5,13,26,0.95) 40%, rgba(5,13,26,0.7) 100%)",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-12 w-full">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded mb-8"
          style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.3)" }}
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 blink" />
          <span className="font-mono-plex text-xs text-cyan-400 tracking-widest uppercase">
            Презентация · 2026
          </span>
        </div>
        <h1
          className="font-orbitron font-black leading-none mb-4"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            color: "#00f5ff",
            textShadow: "0 0 40px rgba(0,245,255,0.5), 0 0 80px rgba(0,245,255,0.2)",
            letterSpacing: "-0.02em",
          }}
        >
          {slide.title}
        </h1>
        <h2
          className="font-orbitron font-light mb-6"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", color: "rgba(255,255,255,0.7)" }}
        >
          {slide.subtitle}
        </h2>
        <p className="font-mono-plex text-slate-400 text-lg">{slide.caption}</p>

        <div className="mt-12 flex items-center gap-3 text-slate-600 font-mono-plex text-xs">
          <Icon name="ChevronRight" size={14} />
          используйте стрелки клавиатуры для навигации
        </div>
      </div>

      {/* Decorative orb */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.08), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

function SlideDefinition({ slide }: { slide: DefinitionSlide }) {
  return (
    <div className="w-full h-full flex items-center">
      <div className="max-w-5xl mx-auto px-12 w-full py-8">
        <SlideHeader number="02" label={slide.label} accent={slide.accent} title={slide.title} />
        <div className="grid md:grid-cols-2 gap-10 mt-8">
          <div>
            <p
              className="text-xl leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}
            >
              {slide.definition}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {slide.points.map((p: DefinitionPoint, i: number) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{
                  background: "rgba(168,85,247,0.06)",
                  border: "1px solid rgba(168,85,247,0.2)",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(168,85,247,0.15)" }}
                >
                  <Icon name={p.icon} size={16} className="text-purple-400" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideTimeline({ slide }: { slide: TimelineSlide }) {
  return (
    <div className="w-full h-full flex items-center">
      <div className="max-w-5xl mx-auto px-12 w-full py-8">
        <SlideHeader number="03" label={slide.label} accent={slide.accent} title={slide.title} />
        <div className="mt-8 relative">
          <div
            className="absolute left-[60px] top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(0,245,255,0.5), rgba(0,245,255,0.05))" }}
          />
          <div className="flex flex-col gap-4">
            {slide.events.map((e: TimelineEvent, i: number) => (
              <div key={i} className="flex items-center gap-6">
                <div
                  className="font-orbitron text-sm font-bold flex-shrink-0 text-right"
                  style={{ width: 48, color: i === slide.events.length - 1 ? "#00f5ff" : "rgba(255,255,255,0.4)" }}
                >
                  {e.year}
                </div>
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 relative z-10"
                  style={{
                    background: i === slide.events.length - 1 ? "#00f5ff" : "rgba(0,245,255,0.4)",
                    boxShadow: i === slide.events.length - 1 ? "0 0 12px #00f5ff" : "none",
                  }}
                />
                <div
                  className="flex-1 py-3 px-4 rounded-lg text-sm"
                  style={{
                    background: i === slide.events.length - 1 ? "rgba(0,245,255,0.08)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${i === slide.events.length - 1 ? "rgba(0,245,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                    color: i === slide.events.length - 1 ? "#e2f8ff" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {e.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideApplications({ slide }: { slide: ApplicationsSlide }) {
  return (
    <div className="w-full h-full flex items-center">
      <div className="max-w-5xl mx-auto px-12 w-full py-8">
        <SlideHeader number="04" label={slide.label} accent={slide.accent} title={slide.title} subtitle={slide.subtitle} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {slide.apps.map((app: AppItem, i: number) => (
            <div
              key={i}
              className="p-5 rounded-xl"
              style={{
                background: "rgba(10,22,40,0.9)",
                border: `1px solid ${app.color}22`,
                transition: "all 0.3s",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${app.color}18` }}
              >
                <Icon name={app.icon} size={20} style={{ color: app.color }} />
              </div>
              <h3 className="font-orbitron text-sm font-bold text-white mb-1">{app.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{app.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideStats({ slide }: { slide: StatsSlide }) {
  return (
    <div className="w-full h-full flex items-center relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(5,13,26,0.97) 0%, rgba(5,13,26,0.85) 100%)" }}
      />
      <div className="relative max-w-5xl mx-auto px-12 w-full py-8">
        <SlideHeader number="05" label={slide.label} accent={slide.accent} title={slide.title} subtitle={slide.subtitle} />
        <div className="grid grid-cols-2 gap-6 mt-8">
          {slide.stats.map((s: StatItem, i: number) => (
            <div
              key={i}
              className="p-6 rounded-xl relative overflow-hidden"
              style={{
                background: "rgba(10,22,40,0.95)",
                border: "1px solid rgba(168,85,247,0.2)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #a855f7, transparent)" }}
              />
              <Icon name={s.icon} size={22} className="text-purple-400 mb-3" />
              <div
                className="font-orbitron font-black text-3xl md:text-4xl mb-2"
                style={{
                  color: "#a855f7",
                  textShadow: "0 0 20px rgba(168,85,247,0.5)",
                }}
              >
                {s.value}
              </div>
              <p className="text-slate-400 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideChallenges({ slide }: { slide: ChallengesSlide }) {
  return (
    <div className="w-full h-full flex items-center">
      <div className="max-w-5xl mx-auto px-12 w-full py-8">
        <SlideHeader number="06" label={slide.label} accent={slide.accent} title={slide.title} />
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {slide.challenges.map((c: ChallengeItem, i: number) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl"
              style={{
                background: `${c.color}08`,
                border: `1px solid ${c.color}25`,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${c.color}18` }}
              >
                <Icon name={c.icon} size={20} style={{ color: c.color }} />
              </div>
              <div>
                <h3 className="font-orbitron text-sm font-bold text-white mb-1">{c.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideFuture({ slide }: { slide: FutureSlide }) {
  return (
    <div className="w-full h-full flex items-center relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.12,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(5,13,26,0.95) 0%, rgba(5,13,26,0.8) 100%)" }}
      />
      <div className="relative max-w-5xl mx-auto px-12 w-full py-8">
        <SlideHeader number="07" label={slide.label} accent={slide.accent} title={slide.title} subtitle={slide.subtitle} />
        <div className="flex flex-col gap-4 mt-8">
          {slide.futures.map((f: FutureItem, i: number) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-lg"
              style={{
                background: `${f.color}08`,
                border: `1px solid ${f.color}20`,
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${f.color}15` }}
              >
                <Icon name={f.icon} size={18} style={{ color: f.color }} />
              </div>
              <p className="text-slate-300 text-sm">{f.text}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-8 p-5 rounded-xl text-center"
          style={{
            background: "rgba(0,245,255,0.06)",
            border: "1px solid rgba(0,245,255,0.25)",
            boxShadow: "0 0 40px rgba(0,245,255,0.05)",
          }}
        >
          <Icon name="Quote" size={20} className="text-cyan-400 mx-auto mb-3" />
          <p
            className="font-orbitron text-base md:text-lg font-semibold"
            style={{ color: "#00f5ff", lineHeight: 1.5 }}
          >
            {slide.cta}
          </p>
        </div>
      </div>
    </div>
  );
}

function SlideHeader({
  number,
  label,
  accent,
  title,
  subtitle,
}: {
  number: string;
  label: string;
  accent: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span
          className="font-orbitron text-xs font-bold"
          style={{ color: `${accent}99` }}
        >
          {number}
        </span>
        <div className="w-8 h-px" style={{ background: accent, opacity: 0.5 }} />
        <span
          className="font-mono-plex text-xs uppercase tracking-widest"
          style={{ color: `${accent}aa` }}
        >
          {label}
        </span>
      </div>
      <h2
        className="font-orbitron font-black"
        style={{
          fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
          color: "#fff",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 font-plex" style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem" }}>
          {subtitle}
        </p>
      )}
      <div
        className="mt-3 h-px w-16"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />
    </div>
  );
}