"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DemoRole = "staff" | "manager" | "admin";
type Language = "en" | "bisaya";
type LandingCopy = {
  language: string;
  signIn: string;
  eyebrow: string;
  title: string;
  description: string;
  continue: string;
  seeHow: string;
  demo: string;
  counter: string;
  online: string;
  search: string;
  all: string;
  drinks: string;
  snacks: string;
  cola: string;
  noodles: string;
  water: string;
  coffee: string;
  order: string;
  total: string;
  pay: string;
  sellTitle: string;
  sellText: string;
  shelfTitle: string;
  shelfText: string;
  dayTitle: string;
  dayText: string;
  dialogTitle: string;
  dialogText: string;
  demoOnly: string;
};

const roleDestinations: Record<DemoRole, string> = {
  staff: "POS",
  manager: "Dashboard",
  admin: "Administration",
};

const copy: Record<Language, LandingCopy> = {
  en: {
    language: "Bisaya",
    signIn: "Sign in",
    eyebrow: "Simple POS for every sari-sari store",
    title: "Keep the counter moving and the store in your hands.",
    description:
      "SariStore helps you sell faster, track inventory, and understand your daily numbers—from a phone at the counter or a desktop in the back office.",
    continue: "Continue with Google",
    seeHow: "See how it works",
    demo: "Demo mode · no real Google account required",
    counter: "Today’s counter",
    online: "Online",
    search: "Search products",
    all: "All",
    drinks: "Drinks",
    snacks: "Snacks",
    cola: "Cola",
    noodles: "Instant noodles",
    water: "Water",
    coffee: "Coffee sachet",
    order: "Your order",
    total: "Total",
    pay: "Pay now",
    sellTitle: "Sell without slowing down",
    sellText:
      "Fast product buttons and a clear cart keep everyday transactions simple.",
    shelfTitle: "Know what is on the shelf",
    shelfText:
      "Track stock, expenses, and low items without complicated accounting.",
    dayTitle: "Works with your day",
    dayText:
      "Use a phone at the counter or a desktop for deeper store management.",
    dialogTitle: "Continue to SariStore",
    dialogText: "Choose a demo role to explore the experience.",
    demoOnly:
      "Demo mode only. Google OAuth will be connected before production.",
  },
  bisaya: {
    language: "English",
    signIn: "Sulod",
    eyebrow: "Simple POS para sa matag sari-sari store",
    title: "Padayon ang baligya, naa sa imong kamot ang tindahan.",
    description:
      "Tabangan ka sa SariStore nga mas paspas mamaligya, ma-track ang stocks, ug masabtan ang daily sales—gamit cellphone o desktop.",
    continue: "Padayon gamit Google",
    seeHow: "Tan-awa unsaon",
    demo: "Demo mode · dili pa kinahanglan ang tinuod nga Google account",
    counter: "Karon nga counter",
    online: "Online",
    search: "Pangita og produkto",
    all: "Tanan",
    drinks: "Mga ilimnon",
    snacks: "Mga snacks",
    cola: "Cola",
    noodles: "Instant noodles",
    water: "Tubig",
    coffee: "Kape sachet",
    order: "Imong order",
    total: "Total",
    pay: "Bayri na",
    sellTitle: "Baligya nga walay dugay",
    sellText:
      "Paspas nga product buttons ug klaro nga cart para sayon ang matag baligya.",
    shelfTitle: "Kahibalo unsay naa sa estante",
    shelfText:
      "Ma-track ang stocks, gasto, ug hapit mahurot nga items nga dili komplikado.",
    dayTitle: "Mosabay sa imong adlaw",
    dayText:
      "Gamit cellphone sa counter o desktop para sa mas lawom nga management.",
    dialogTitle: "Padayon sa SariStore",
    dialogText: "Pilia ang demo role para masulayan ang app.",
    demoOnly: "Demo mode ra. I-connect ang Google OAuth sa dili pa production.",
  },
} as const;

export default function LandingPage() {
  const router = useRouter();
  const [showDemo, setShowDemo] = useState(false);
  const [signedInAs, setSignedInAs] = useState<DemoRole | null>(null);
  const [language, setLanguage] = useState<Language>("bisaya");
  const text = copy[language];

  function chooseDemo(role: DemoRole) {
    setSignedInAs(role);
    setShowDemo(false);
    if (role === "staff") router.push("/pos");
  }

  return (
    <main className="landing-shell">
      <nav className="landing-nav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="SariStore home">
          <span className="brand-mark">S</span>SariStore
        </a>
        <div className="nav-actions">
          <button
            className="language-toggle"
            type="button"
            onClick={() => setLanguage(language === "en" ? "bisaya" : "en")}
            aria-label={`Switch language to ${language === "en" ? "Bisaya" : "English"}`}
          >
            {language === "bisaya" ? "Bisaya" : "English"}
          </button>
          <button
            className="nav-signin"
            type="button"
            onClick={() => setShowDemo(true)}
          >
            {text.signIn}
          </button>
        </div>
      </nav>

      <section
        className="hero"
        key={`hero-${language}`}
        aria-labelledby="hero-title"
      >
        <div className="hero-copy">
          <p className="eyebrow">{text.eyebrow}</p>
          <h1 id="hero-title">{text.title}</h1>
          <p className="hero-description">{text.description}</p>
          <div className="hero-actions">
            <button
              className="primary-action"
              type="button"
              onClick={() => setShowDemo(true)}
            >
              {text.continue} <span aria-hidden="true">→</span>
            </button>
            <a className="secondary-action" href="#how-it-works">
              {text.seeHow}
            </a>
          </div>
          <p className="demo-note">
            <span className="status-dot" /> {text.demo}
          </p>
        </div>

        <div className="product-preview" aria-label="SariStore POS preview">
          <div className="preview-top">
            <span>{text.counter}</span>
            <span className="online-pill">● {text.online}</span>
          </div>
          <div className="preview-body">
            <div className="product-side">
              <div className="fake-search">⌕ {text.search}</div>
              <div className="category-row">
                <span className="category-active">{text.all}</span>
                <span>{text.drinks}</span>
                <span>{text.snacks}</span>
              </div>
              <div className="product-grid">
                <span>
                  {text.cola}
                  <br />
                  <b>₱25</b>
                </span>
                <span>
                  {text.noodles}
                  <br />
                  <b>₱18</b>
                </span>
                <span>
                  {text.water}
                  <br />
                  <b>₱20</b>
                </span>
                <span>
                  {text.coffee}
                  <br />
                  <b>₱8</b>
                </span>
              </div>
            </div>
            <div className="order-side">
              <p>{text.order}</p>
              <div className="order-line">
                <span>{text.cola} × 2</span>
                <b>₱50</b>
              </div>
              <div className="order-line">
                <span>{text.coffee} × 1</span>
                <b>₱8</b>
              </div>
              <div className="order-total">
                <span>{text.total}</span>
                <strong>₱58</strong>
              </div>
              <button type="button" onClick={() => setShowDemo(true)}>
                {text.pay}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="feature-row"
        key={`features-${language}`}
        id="how-it-works"
        aria-label="Product benefits"
      >
        <article>
          <span className="feature-icon">₱</span>
          <h2>{text.sellTitle}</h2>
          <p>{text.sellText}</p>
        </article>
        <article>
          <span className="feature-icon">▦</span>
          <h2>{text.shelfTitle}</h2>
          <p>{text.shelfText}</p>
        </article>
        <article>
          <span className="feature-icon">◒</span>
          <h2>{text.dayTitle}</h2>
          <p>{text.dayText}</p>
        </article>
      </section>

      {showDemo && (
        <div
          className="dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowDemo(false);
          }}
        >
          <section
            className="auth-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
          >
            <button
              className="close-button"
              type="button"
              aria-label="Close sign-in dialog"
              onClick={() => setShowDemo(false)}
            >
              ×
            </button>
            <span className="dialog-mark">S</span>
            <h2 id="auth-title">{text.dialogTitle}</h2>
            <p className="dialog-copy">{text.dialogText}</p>
            <div className="demo-options">
              {(["staff", "manager", "admin"] as DemoRole[]).map((role) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => chooseDemo(role)}
                >
                  <span>{role[0].toUpperCase()}</span>
                  <strong>{role}</strong>
                  <small>Open {roleDestinations[role]}</small>
                </button>
              ))}
            </div>
            <p className="demo-warning">{text.demoOnly}</p>
          </section>
        </div>
      )}

      {signedInAs && (
        <div className="toast" role="status">
          Signed in as <strong>{signedInAs}</strong> · opening{" "}
          {roleDestinations[signedInAs]}
        </div>
      )}
    </main>
  );
}
