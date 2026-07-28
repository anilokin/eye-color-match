import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Share2, RotateCcw, Sparkles, Facebook, Heart, Check } from "lucide-react";
import heroEye from "@/assets/hero-eye.jpg";
import eyeBrown from "@/assets/eye-brown.jpg";
import eyeBlue from "@/assets/eye-blue.jpg";
import eyeGreen from "@/assets/eye-green.jpg";
import eyeHazel from "@/assets/eye-hazel.jpg";
import eyeGray from "@/assets/eye-gray.jpg";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const SITE = "https://eye-color-match.lovable.app";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Eye Color Match",
      inLanguage: "bg",
      description: "Забавен тест: открий какъв цвят очи на партньора ти подхожда най-много.",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE}/#webpage`,
      url: SITE,
      name: "Какъв цвят очи на партньора ти подхожда най-много?",
      isPartOf: { "@id": `${SITE}/#website` },
      inLanguage: "bg",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Научен ли е този тест?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Не. Тестът е създаден с развлекателна цел и резултатите не се основават на научни изследвания.",
          },
        },
        {
          "@type": "Question",
          name: "Запазвате ли мои лични данни?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Не изискваме регистрация и не събираме лични данни. Повече информация има в политиката за поверителност.",
          },
        },
        {
          "@type": "Question",
          name: "Мога ли да споделя резултата?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да – с бутона „Сподели“ можеш да изпратиш резултата на приятели във Facebook, Messenger или чрез копиран линк.",
          },
        },
      ],
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Какъв цвят очи на партньора ти подхожда най-много?" },
      { name: "description", content: "Забавен тест: открий какъв цвят очи на партньора ти подхожда най-много!" },
      { property: "og:title", content: "Какъв цвят очи на партньора ти подхожда най-много?" },
      { property: "og:description", content: "Направи теста и сподели резултата с приятели!" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(JSON_LD),
      },
    ],
  }),
  component: Index,
});

type EyeKey = "brown" | "blue" | "green" | "hazel" | "gray";

const EYES: { key: EyeKey; label: string; img: string }[] = [
  { key: "brown", label: "Кафяви", img: eyeBrown },
  { key: "blue", label: "Сини", img: eyeBlue },
  { key: "green", label: "Зелени", img: eyeGreen },
  { key: "hazel", label: "Пъстри (лешникови)", img: eyeHazel },
  { key: "gray", label: "Сиви", img: eyeGray },
];

const MATCHES: Record<EyeKey, { match: EyeKey; pct: number; title: string; desc: string; quote: string }> = {
  brown: {
    match: "blue",
    pct: 94,
    title: "Сини очи",
    desc: "Контрастът между топлия ти кафяв и хладния син създава магнетична химия. Партньорът ти ще те гледа като океан, в който иска да се удави.",
    quote: "Хората със сини очи са мечтателни, нежни и ще те покорят от пръв поглед!",
  },
  blue: {
    match: "green",
    pct: 91,
    title: "Зелени очи",
    desc: "Двойката студен син и мистериозно зелено е невероятна комбинация. Очакват ви страстни моменти и силна емоционална връзка.",
    quote: "Хората със зелени очи са страстни, загадъчни и невероятно привлекателни за теб!",
  },
  green: {
    match: "hazel",
    pct: 92,
    title: "Пъстри очи",
    desc: "Комбинацията създава силен контраст и хармония. Лешниковите очи ще подчертаят погледа ти и ще създадат специална връзка помежду ви.",
    quote: "Хората с пъстри очи са артистични, дълбоки и пълни с изненади!",
  },
  hazel: {
    match: "brown",
    pct: 89,
    title: "Кафяви очи",
    desc: "Топлината на кафявите очи перфектно се слива с твоите многоцветни нюанси. Това е любов, изградена върху уют и доверие.",
    quote: "Хората с кафяви очи са топли, надеждни и истински романтици!",
  },
  gray: {
    match: "green",
    pct: 96,
    title: "Зелени очи",
    desc: "Сребристото сиво и наситено зеленото създават мистична връзка. Двамата ще се привличате като магнит.",
    quote: "Хората със зелени очи ще запалят искрата във всеки твой ден!",
  },
};

function Index() {
  const [selected, setSelected] = useState<EyeKey | null>(null);
  const [step, setStep] = useState<"intro" | "choose" | "result">("intro");

  const result = selected ? MATCHES[selected] : null;
  const resultImg = result ? EYES.find((e) => e.key === result.match)!.img : null;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = "Какъв цвят очи на партньора ти подхожда най-много?";
  const shareText = result
    ? `Моят резултат: ${result.title} – ${result.pct}% съвместимост! 💕 Направи теста и ти:`
    : "Направи този забавен тест за съвместимост! 💕";
  const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
        return;
      } catch (err) {
        if ((err as DOMException)?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert("Линкът е копиран! Сподели го с приятели 💕");
    } catch {
      window.open(fbShare, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      {/* HERO */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "var(--gradient-hero)" }}
      >
        <img
          src={heroEye}
          alt=""
          width={1024}
          height={768}
          className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, oklch(0.18 0.08 295 / 0.85) 100%)" }} />
        <div className="relative mx-auto max-w-md px-6 pt-16 pb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
            <Heart className="h-3 w-3 fill-pink-400 stroke-pink-400" />
            <span>Тест за съвместимост</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            Какъв цвят очи<br />
            на партньора ти<br />
            <span className="bg-gradient-to-r from-pink-300 to-fuchsia-400 bg-clip-text text-transparent">
              подхожда най-много?
            </span>
          </h1>

          <Steps current={step === "intro" ? 0 : step === "choose" ? 1 : 3} />

          {step === "intro" && (
            <button
              onClick={() => setStep("choose")}
              className="group mx-auto mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-[var(--shadow-glow)] transition active:scale-95"
              style={{ background: "var(--gradient-primary)" }}
            >
              Започни теста
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </section>

      {/* BODY */}
      <main className="mx-auto max-w-md px-5 py-8">
        {step === "choose" && (
          <ChooseCard
            selected={selected}
            onSelect={setSelected}
            onSubmit={() => selected && setStep("result")}
          />
        )}

        {step === "result" && result && resultImg && (
          <ResultCard
            result={result}
            img={resultImg}
            onShare={handleShare}
            onRetry={() => {
              setSelected(null);
              setStep("choose");
            }}
          />
        )}

        {/* Share footer */}
        <section className="mt-8 rounded-3xl border border-border bg-secondary/60 p-6">
          <h3 className="text-lg font-bold text-secondary-foreground">
            Сподели резултата си с приятели!
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Да видим на кого какъв цвят очи подхожда най-много 💕
          </p>
          <button
            onClick={handleShare}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1877F2] px-5 py-3 font-semibold text-white shadow-md transition active:scale-95"
          >
            <Share2 className="h-5 w-5" />
            Сподели
          </button>
        </section>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <Heart className="h-3 w-3 fill-pink-400 stroke-pink-400" />
          Забавен тест за развлечение. Не е научно доказано.
        </p>

        {/* Educational content for AdSense */}
        <article className="mt-10 space-y-6 rounded-3xl border border-border bg-card p-6 text-card-foreground">
          <header>
            <h2 className="text-2xl font-bold">Цветът на очите и привличането</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Кратко въведение в това защо цветът на очите интригува хората от векове.
            </p>
          </header>

          <section>
            <h3 className="text-lg font-semibold">Какво определя цвета на очите?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Цветът на очите се определя основно от количеството и разпределението на
              меланина в ириса. Хората с повече меланин имат по-тъмни – кафяви или
              почти черни очи, докато по-малкото меланин води до сини, сиви или зелени
              нюанси. Лешниковите (пъстри) очи са комбинация, в която различни части
              на ириса отразяват светлината по различен начин.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Защо ни привличат определени цветове?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Изследвания в областта на психологията на привличането показват, че
              контрастът и редкостта често играят роля. Сините очи например се срещат
              при около 8–10% от световното население, докато кафявите доминират със
              около 70–80%. Това прави по-редките цветове особено запомнящи се при
              първа среща, без обаче да определят дългосрочната съвместимост между
              хората.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Любопитни факти</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>Всички бебета със светла кожа се раждат със синкави очи; финалният цвят се установява около 6–12 месечна възраст.</li>
              <li>Хетерохромията е състояние, при което двете очи имат различен цвят.</li>
              <li>Зелените очи са най-редки – около 2% от хората в света.</li>
              <li>Светлината и дрехите могат значително да променят възприемания цвят на очите.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Често задавани въпроси</h3>
            <div className="mt-3 space-y-3 text-sm leading-relaxed">
              <details className="rounded-xl border border-border p-3">
                <summary className="cursor-pointer font-medium text-card-foreground">
                  Тестът научно доказан ли е?
                </summary>
                <p className="mt-2 text-muted-foreground">
                  Не. Тестът е забавна игра, създадена за развлечение, и не замества
                  психологическа или научна оценка.
                </p>
              </details>
              <details className="rounded-xl border border-border p-3">
                <summary className="cursor-pointer font-medium text-card-foreground">
                  Колко време отнема?
                </summary>
                <p className="mt-2 text-muted-foreground">
                  По-малко от 30 секунди – избираш цвят и виждаш резултата.
                </p>
              </details>
              <details className="rounded-xl border border-border p-3">
                <summary className="cursor-pointer font-medium text-card-foreground">
                  Запазвате ли мои лични данни?
                </summary>
                <p className="mt-2 text-muted-foreground">
                  Не. Не изискваме регистрация. Повече информация в нашата{" "}
                  <a href="/privacy" className="text-primary underline">политика за поверителност</a>.
                </p>
              </details>
              <details className="rounded-xl border border-border p-3">
                <summary className="cursor-pointer font-medium text-card-foreground">
                  Мога ли да споделя резултата?
                </summary>
                <p className="mt-2 text-muted-foreground">
                  Да – с бутона „Сподели" можеш да го изпратиш на приятели във Facebook,
                  Messenger или чрез копиран линк.
                </p>
              </details>
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}

function Steps({ current }: { current: number }) {
  const items = [
    { n: 1, label: "Избери цвета\nна очите си" },
    { n: 2, label: 'Натисни\n„Провери"' },
    { n: 3, label: "Виж своя\nрезултат" },
  ];
  return (
    <div className="mt-6 flex items-start justify-center gap-2">
      {items.map((it, i) => (
        <div key={it.n} className="flex items-start gap-2">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                current >= it.n
                  ? "text-white shadow-[var(--shadow-glow)]"
                  : "bg-white/10 text-white/70"
              }`}
              style={current >= it.n ? { background: "var(--gradient-primary)" } : {}}
            >
              {it.n}
            </div>
            <span className="mt-2 whitespace-pre-line text-[11px] leading-tight text-white/80">
              {it.label}
            </span>
          </div>
          {i < items.length - 1 && (
            <div className="mt-4 text-white/40">→</div>
          )}
        </div>
      ))}
    </div>
  );
}

function ChooseCard({
  selected,
  onSelect,
  onSubmit,
}: {
  selected: EyeKey | null;
  onSelect: (k: EyeKey) => void;
  onSubmit: () => void;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <h2 className="text-center text-xl font-bold text-card-foreground">
        Избери цвета на очите си
      </h2>
      <div className="mt-5 space-y-3">
        {EYES.map((e) => {
          const active = selected === e.key;
          return (
            <button
              key={e.key}
              onClick={() => onSelect(e.key)}
              className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition active:scale-[0.98] ${
                active
                  ? "border-primary bg-primary/5 shadow-[var(--shadow-soft)]"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <img
                src={e.img}
                alt={e.label}
                loading="lazy"
                width={64}
                height={64}
                className="h-14 w-14 flex-shrink-0 rounded-xl object-cover"
              />
              <span className="flex-1 font-semibold text-card-foreground">{e.label}</span>
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border"
                }`}
              >
                {active && <Check className="h-3.5 w-3.5" />}
              </span>
            </button>
          );
        })}
      </div>
      <button
        onClick={onSubmit}
        disabled={!selected}
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-white shadow-[var(--shadow-glow)] transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        style={{ background: "var(--gradient-primary)" }}
      >
        Провери
        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
      </button>
    </section>
  );
}

function ResultCard({
  result,
  img,
  onShare,
  onRetry,
}: {
  result: { pct: number; title: string; desc: string; quote: string };
  img: string;
  onShare: () => void;
  onRetry: () => void;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-center gap-2 text-center">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-card-foreground">Твоят резултат е тук!</h2>
        <Sparkles className="h-5 w-5 text-primary" />
      </div>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Най-подходящият цвят очи на партньора ти е:
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border">
        <div className="grid grid-cols-2">
          <img
            src={img}
            alt={result.title}
            loading="lazy"
            width={256}
            height={256}
            className="h-full w-full object-cover"
          />
          <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
            <h3 className="text-xl font-bold" style={{ color: "oklch(0.45 0.18 150)" }}>
              {result.title}
            </h3>
            <div
              className="flex h-20 w-20 flex-col items-center justify-center rounded-full text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              <span className="text-xl font-extrabold leading-none">{result.pct}%</span>
              <span className="text-[10px] opacity-90">съвместимост</span>
            </div>
          </div>
        </div>
        <p className="border-t border-border p-4 text-sm leading-relaxed text-card-foreground">
          {result.desc}
        </p>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-accent/10 p-4">
        <Heart className="mt-0.5 h-5 w-5 flex-shrink-0 fill-primary stroke-primary" />
        <p className="text-sm text-card-foreground">{result.quote}</p>
      </div>

      <button
        onClick={onShare}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-white shadow-[var(--shadow-glow)] transition active:scale-95"
        style={{ background: "var(--gradient-primary)" }}
      >
        <Share2 className="h-5 w-5" />
        Сподели резултата
      </button>
      <button
        onClick={onRetry}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-4 font-semibold text-card-foreground transition active:scale-95"
      >
        <RotateCcw className="h-4 w-4" />
        Провери отново
      </button>
    </section>
  );
}
