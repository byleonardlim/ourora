"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type WordSpan = {
  id: string;
  word: string;
};

function splitIntoWordSpans(text: string): WordSpan[] {
  // Keep punctuation adjacent to words as part of the span, but split by whitespace
  const tokens = text.split(/(\s+)/);
  let i = 0;
  return tokens.map((t) => ({ id: `w-${i++}`, word: t }));
}

function Paragraph({ text, className = "" }: { text: string; className?: string }) {
  const words = useMemo(() => splitIntoWordSpans(text), [text]);
  return (
    <p className={className}>
      {words.map(({ id, word }) => {
        const isSpace = /^\s+$/.test(word);
        return (
          <span key={id} className={isSpace ? undefined : "word"}>
            {word}
          </span>
        );
      })}
    </p>
  );
}

function TestimonialFigure({ text, className = "" }: { text: string; className?: string }) {
  const base = "relative rounded-lg border border-ourora-purple-light/25 bg-ourora-cream/95 p-8 text-ourora-purple-dark";
  const cls = [base, className].filter(Boolean).join(" ");
  return (
    <figure className={cls}>
      <span aria-hidden className="absolute -top-8 left-8 text-9xl leading-none text-ourora-gold/30">&ldquo;</span>
      <blockquote>
        <Paragraph
          className="text-2xl lg:text-5xl leading-8 lg:leading-16 text-ourora-purple-dark font-bold"
          text={text}
        />
      </blockquote>
    </figure>
  );
}

export default function Home() {
  const [showCTA, setShowCTA] = useState(false);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);
  const section4Ref = useRef<HTMLDivElement | null>(null);
  const headerHighlightRef = useRef<HTMLSpanElement | null>(null);
  const headerHighlightRef2 = useRef<HTMLSpanElement | null>(null);
  const headerHighlightRef3 = useRef<HTMLSpanElement | null>(null);
  const quizSectionRef = useRef<HTMLElement | null>(null);
  const quizButtonRef = useRef<HTMLButtonElement | null>(null);
  const circlePathRef = useRef<SVGPathElement | null>(null);
  const circlePathRef2 = useRef<SVGPathElement | null>(null);
  const circlePathRef3 = useRef<SVGPathElement | null>(null);
  const circleTurbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const auroraRef1 = useRef<HTMLDivElement | null>(null);
  const auroraRef2 = useRef<HTMLDivElement | null>(null);
  const auroraRef3 = useRef<HTMLDivElement | null>(null);

  const testimonials = [
    {
      text: "The injections weren't the hardest part. The waiting was.",
      className: "",
    },
    {
      text: "I spent $12,000 and still felt lost about what was happening to my body.",
      className: "",
    },
    {
      text:
        "I wish someone had told me that freezing my eggs wouldn't make me weak — it'd make me free.",
      className: "sm:col-span-2",
    },
  ];

  const features = [
    {
      title: "Egg-Freezing Roadmap",
      paragraphs: [
        "Your entire journey, simplified. From your first questions to your final decision, Ourora guides you step by step — explaining what to expect, when to act, and how to prepare.",
        "You’ll get: Personalized success prediction based on age, egg count, and AMH; Step-by-step roadmap with timeline planning; Clinic options, cost comparisons, and reviews; Checklists and preparation guidance before stimulation.",
      ],
    },
    {
      title: "Fertility & Hormone Insights",
      paragraphs: [
        "Behind every decision is your biology — we help you see it clearly. Ourora interprets your cycle and biomarkers (AMH, FSH, estrogen) to help you understand your fertility potential and ideal timing for egg freezing.",
        "You’ll get: Simple visual insights from your hormone results; Personalized guidance on ovarian reserve and egg quality; Predictions that improve over time as you log and test.",
      ],
    },
    {
      title: "Financing & Cost Planning",
      paragraphs: [
        "Egg freezing is an investment in your future — and we make it financially accessible. Ourora helps you estimate costs, explore financing options, and connect with trusted partners for flexible payment plans.",
        "You’ll get: Transparent cost breakdowns by clinic and package; Pre-screened financing options and installment plans; Smart reminders to track and manage your fertility budget.",
      ],
    },
    {
      title: "Learn & Connect",
      paragraphs: [
        "Egg freezing shouldn’t be mysterious. Ourora’s community hub is filled with expert-backed content written in a way that’s easy to understand — and relevant to Asian women.",
        "You’ll get: Doctor-reviewed articles and fertility masterclasses; Practical guidance on egg freezing, fertility, perimenopause, and mood; Stories from real women navigating similar journeys.",
      ],
    },
    {
      title: "Daily Health & Cycle Tracking",
      paragraphs: [
        "Stay connected to your body every day. Your mood, sleep, and energy all reflect what’s happening beneath the surface. Ourora helps you spot patterns that influence your fertility.",
        "You’ll get: Simple daily mood and symptom journaling; Hormone-phase–based energy and wellness insights; Predictive tracking that adapts to your unique rhythm.",
      ],
    },
    {
      title: "Hormone-Aware Lifestyle Guidance",
      paragraphs: [
        "Your egg freezing cycle impacts more than just fertility — it affects sleep, metabolism, focus, and mood. Ourora provides bite-sized, evidence-based tips tailored to your egg freezing phase and goals.",
        "You’ll get: Nutrition and fitness guidance aligned to your egg freezing phases; Mind-body strategies for focus, rest, and recovery; Expert-approved, culturally relevant advice.",
      ],
    },
    {
      title: "Expert Connections (Clinic & Telehealth Integration)",
      paragraphs: [
        "When you’re ready to act, Ourora connects you to leading fertility specialists and clinics near you. We help you book appointments, share your health summary, and prepare for your consult — all in one place.",
        "You’ll get: Direct booking with verified partner clinics; Doctor recommendations matched to your goals; Seamless sharing of your intake summary (with consent).",
      ],
    },
  ];

  useEffect(() => {
    const updateCTAVisibility = () => {
      const doc = document.documentElement;
      const scrollTop = window.pageYOffset || doc.scrollTop || 0;
      const scrollable = Math.max(0, doc.scrollHeight - doc.clientHeight);
      if (scrollable === 0) {
        setShowCTA(false);
        return;
      }
      const progress = scrollTop / scrollable;
      setShowCTA(progress >= 0.2);
    };

    updateCTAVisibility();
    window.addEventListener("scroll", updateCTAVisibility, { passive: true });
    window.addEventListener("resize", updateCTAVisibility);

    const ctx = gsap.context(() => {
      // Hero Aurora Animation
      if (auroraRef1.current && auroraRef2.current && auroraRef3.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5, // Smooth scrubbing for a floating feel
          },
        });

        // Organic movement for blob 1 (Yellow)
        tl.to(
          auroraRef1.current,
          {
            yPercent: 60,
            xPercent: -30,
            rotation: 90,
            scale: 1.4,
            ease: "none",
          },
          0
        );

        // Organic movement for blob 2 (Gold)
        tl.to(
          auroraRef2.current,
          {
            yPercent: -40,
            xPercent: 40,
            rotation: -60,
            scale: 1.1,
            ease: "none",
          },
          0
        );

        // Organic movement for blob 3 (Yellow accent)
        tl.to(
          auroraRef3.current,
          {
            yPercent: 80,
            xPercent: 20,
            rotation: 45,
            scale: 1.6,
            ease: "none",
          },
          0
        );
      }

      // Header highlight sweep (imitates a real marker stroke) tied to scroll position
      if (headerHighlightRef.current) {
        gsap.set(headerHighlightRef.current, { "--hl": "0%" });
        gsap.to(headerHighlightRef.current, {
          "--hl": "100%",
          ease: "none",
          scrollTrigger: {
            trigger: headerHighlightRef.current,
            start: "top bottom",
            end: "bottom center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
      if (section2Ref.current) {
        const words = Array.from(section2Ref.current.querySelectorAll<HTMLSpanElement>(".word"));
        if (words.length > 0) {
          gsap.set(words, { filter: "blur(6px)", opacity: 0 });
          gsap.to(words, {
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.015,
            scrollTrigger: {
              trigger: section2Ref.current,
              start: "top 80%",
              end: "bottom center",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      // Separate animation for the middle testimonials block
      if (section3Ref.current) {
        const words = Array.from(section3Ref.current.querySelectorAll<HTMLSpanElement>(".word"));
        if (words.length > 0) {
          gsap.from(words, {
            opacity: 0,
            y: 8,
            stagger: 0.02,
            duration: 0.4,
            ease: "power1.out",
            scrollTrigger: {
              trigger: section3Ref.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        const figures = Array.from(section3Ref.current.querySelectorAll<HTMLElement>("figure"));
        if (figures.length > 0) {
          gsap.set(figures, { opacity: 0, y: 56, scale: 0.96, filter: "blur(8px)" });
          figures.forEach((fig, i) => {
            gsap.set(fig, { x: i % 2 === 0 ? -48 : 48 });
          });
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section3Ref.current,
                start: "top 80%",
                end: "bottom 90%",
                scrub: true,
              },
            })
            .to(figures, { opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)", stagger: 0.35 });
        }
      }

      // Section 4: animate ALL words with blur->sharp reveal, tied to scroll (stops when scrolling stops)
      if (section4Ref.current) {
        const words = Array.from(section4Ref.current.querySelectorAll<HTMLSpanElement>(".word"));
        if (words.length > 0) {
          gsap.set(words, { filter: "blur(6px)", opacity: 0, y: 6 });
          gsap.to(words, {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: { each: 0.02, from: "random" },
            scrollTrigger: {
              trigger: section4Ref.current,
              start: "top 80%",
              end: "bottom center",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      // Quiz Section Animations
      if (quizSectionRef.current) {
        // Animate the circle drawing (multiple loops)
        const circlePrimary = circlePathRef.current;
        const circleExtras = [circlePathRef2.current, circlePathRef3.current].filter(
          (el): el is SVGPathElement => el !== null
        );

        if (circlePrimary) {
          const length = circlePrimary.getTotalLength();

          gsap.set(circlePrimary, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0,
          });

          if (circleExtras.length > 0) {
            gsap.set(circleExtras, { opacity: 0 });
          }

          if (circleTurbulenceRef.current) {
            gsap.set(circleTurbulenceRef.current, { attr: { baseFrequency: 0.75, numOctaves: 1, seed: 2 } });
          }

          gsap
            .timeline({
              scrollTrigger: {
                trigger: quizSectionRef.current,
                start: "top 75%",
                end: "top 35%",
                scrub: true,
                onEnter: () => {
                  gsap.set(circlePrimary, { opacity: 1 });
                },
                onLeaveBack: () => {
                  gsap.set(circlePrimary, { opacity: 0, strokeDashoffset: length });
                },
              },
            })
            .to(circlePrimary, { strokeDashoffset: 0, ease: "none" }, 0);

          if (circleTurbulenceRef.current) {
            gsap.to(circleTurbulenceRef.current, {
              attr: { baseFrequency: 0.95 },
              ease: "none",
              scrollTrigger: {
                trigger: quizSectionRef.current,
                start: "top 75%",
                end: "top 35%",
                scrub: true,
              },
            });
          }
        }
      }
    });

    return () => {
      window.removeEventListener("scroll", updateCTAVisibility);
      window.removeEventListener("resize", updateCTAVisibility);
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      {/* Fixed Aurora Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div
          ref={auroraRef1}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-ourora-yellow/80 rounded-full blur-[80px] mix-blend-multiply opacity-50"
        />
        <div
          ref={auroraRef2}
          className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-ourora-gold/60 rounded-full blur-[100px] mix-blend-multiply opacity-50"
        />
        <div
          ref={auroraRef3}
          className="absolute bottom-[-20%] left-[20%] w-[55vw] h-[55vw] bg-ourora-yellow/70 rounded-full blur-[120px] mix-blend-multiply opacity-50"
        />
      </div>

      {/* Floating CTA Bar */}
      <div
        className={[
          "fixed inset-x-0 z-50 pb-[env(safe-area-inset-bottom)] transition-all duration-300 ease-out",
          showCTA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        ].join(" ")}
        style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        aria-hidden={!showCTA}
      >
        <div className="mx-auto w-full max-w-4xl px-4">
          <div className="rounded-xl border border-ourora-purple-light/25 bg-ourora-cream/90 backdrop-blur shadow-lg">
            <div className="flex items-center justify-between gap-4 p-3">
              <p className="text-sm sm:text-base text-ourora-purple-dark">
                Ready to begin?
              </p>
              <a
                href="#readiness-quiz"
                className="inline-flex items-center justify-center rounded-lg bg-ourora-yellow px-4 py-2 text-ourora-purple-dark text-sm sm:text-base font-semibold shadow hover:bg-ourora-yellow/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ourora-yellow"
              >
                Discover your story
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden z-10"
      >
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl lg:text-7xl font-bold tracking-tight leading-tight">
            Your Future Shouldn't Feel Like a Deadline
          </h1>
        </div>
      </section>
      {/* Me Too Section */}
      <section ref={section2Ref} className="min-h-screen px-6 py-32 max-w-4xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">You are not alone</h2>
        <Paragraph
          className="text-2xl lg:text-5xl leading-8 lg:leading-16 text-foreground/80 mb-4"
          text="2 years ago, Nicole, the founder, had to go through the process feeling isolated, pressured by social standards, and overwhelmed by millions of pieces of information that were isolated and unhelpful in sourcing the facts. Even after going through the process, the hormone changes continued to affect her for more than 6 months, leading to suicidal thoughts. "
        />
        <Paragraph
          className="text-2xl lg:text-5xl leading-8 lg:leading-16 text-foreground/80 mb-4"
          text="As she encountered more and more women seeking her guidance on procedures, Nicole realized that many had faced similar challenges. So she decided to create a solution that would eliminate as many obstacles as possible for others in her position. Because hey, this patriarchal system wouldn’t care less about the egg freezing, we can step up to change it and make life easier for all women."
        />
      </section>

      {/* From Others Header Section */}
      <section className="max-w-4xl mx-auto min-h-screen flex items-center justify-center px-6 lg:px-6">
           <h2 className="text-4xl lg:text-7xl font-bold mb-6">
             <span ref={headerHighlightRef} className="highlight-sweep">
               So we started by listening to thousands of women who&apos;ve walked this path before you.
             </span>
           </h2>
      </section>

      {/* From Others Section */}
      <section ref={section3Ref} className=" max-w-4xl mx-auto min-h-screen flex items-center justify-center px-6 lg:py-32">
        <div className="grid gap-6 lg:gap-4 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <TestimonialFigure key={i} text={t.text} className={t.className} />
          ))}
        </div>
      </section>

      <section ref={section4Ref} className="max-w-4xl mx-auto min-h-screen flex items-center justify-center px-6 sm:px-12 py-32">
        <Paragraph
          className="text-2xl lg:text-5xl leading-8 lg:leading-16 text-foreground/80 mb-4"
          text="Ourora is created to be your personal guide through the beautiful mess of modern fertility — where logic meets longing, and clarity becomes the most loving gift you can give yourself. We built it for women who don't just want their numbers — they want to understand their story."
        />
      </section>

      {/* From Others Header Section */}
      <section className="max-w-4xl mx-auto min-h-screen flex items-center justify-center px-6">
           <h2 className="text-4xl lg:text-7xl font-bold mb-6">
             <span ref={headerHighlightRef2} className="highlight-sweep">
               Every line of Ourora&#39;s design — every screen, every word — carries those stories.
             </span>
           </h2>
      </section>

      <section className="max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center px-6 pb-64">
        <h2 className="text-4xl lg:text-7xl font-bold mb-6">
          <span ref={headerHighlightRef3} className="highlight-sweep">
            Ourora provides you with
          </span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-sm border border-ourora-purple-light/30 overflow-hidden">
          {features.map((f, idx) => (
            <div key={idx} className="bg-ourora-cream/60 backdrop-blur-md text-ourora-purple-dark border border-ourora-purple-light/30 -m-px p-6 lg:p-8">
              <h3 className="text-xl lg:text-3xl font-bold mb-3">{f.title}</h3>
              {f.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    i < f.paragraphs.length - 1
                      ? "text-ourora-purple-dark/80 mb-2"
                      : "text-ourora-purple-dark/80"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Readiness Quiz Section */}
      <section id="readiness-quiz" ref={quizSectionRef} className="bg-ourora-violet-dark text-ourora-cream py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-7xl font-bold mb-12 tracking-tight">
            Start with
            <br />
            one small step …
          </h2>
          <div className="max-w-2xl mx-auto space-y-8 text-xl lg:text-2xl text-ourora-cream/80 leading-relaxed">
            <p>
              Take the Readiness Quiz, five questions to help you understand where you are right now.
            </p>
            <p>
              You&apos;ll get a{" "}
              <span className="relative inline-block whitespace-nowrap">
                personalized
                <svg
                  className="absolute -top-3 -left-4 -right-4 -bottom-4 pointer-events-none"
                  viewBox="0 0 200 80"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="handDrawnCircle" x="-10%" y="-40%" width="120%" height="180%">
                      <feTurbulence
                        ref={circleTurbulenceRef}
                        type="fractalNoise"
                        baseFrequency="0.75"
                        numOctaves="1"
                        seed="2"
                        result="noise"
                      />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
                    </filter>
                  </defs>
                  <path
                    ref={circlePathRef}
                    d="M15.4,38.6c1.8-6.4,12.7-16.1,28.8-21.7c25.3-8.8,71.5-12.2,106.8-2.6c31.3,8.5,45.4,26.7,40.1,43.6c-4.9,15.7-32.6,22.3-64.8,20.4c-28.7-1.7-57.5-11-73.6-26.6C41.8,42,43.3,27,51.6,18.3"
                    stroke="var(--ourora-yellow)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#handDrawnCircle)"
                    style={{ opacity: 0 }}
                  />
                  <path
                    ref={circlePathRef2}
                    d="M15.4,38.6c1.8-6.4,12.7-16.1,28.8-21.7c25.3-8.8,71.5-12.2,106.8-2.6c31.3,8.5,45.4,26.7,40.1,43.6c-4.9,15.7-32.6,22.3-64.8,20.4c-28.7-1.7-57.5-11-73.6-26.6C41.8,42,43.3,27,51.6,18.3"
                    stroke="var(--ourora-yellow)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="rotate(2, 100, 40) scale(1.02)"
                    style={{ opacity: 0 }}
                  />
                  <path
                    ref={circlePathRef3}
                    d="M15.4,38.6c1.8-6.4,12.7-16.1,28.8-21.7c25.3-8.8,71.5-12.2,106.8-2.6c31.3,8.5,45.4,26.7,40.1,43.6c-4.9,15.7-32.6,22.3-64.8,20.4c-28.7-1.7-57.5-11-73.6-26.6C41.8,42,43.3,27,51.6,18.3"
                    stroke="var(--ourora-yellow)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="rotate(-1, 100, 40) scale(0.98)"
                    style={{ opacity: 0 }}
                  />
                </svg>
              </span>{" "}
              Egg Freezing Roadmap, created from clinical research and
              real stories from women like you.
            </p>
            <div className="border-t border-ourora-cream/20 pt-8 mt-12">
              <ul className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-lg font-medium text-ourora-cream/90">
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ourora-yellow/20 text-ourora-yellow">
                    ✓
                  </span>{" "}
                  No pressure.
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ourora-yellow/20 text-ourora-yellow">
                    ✓
                  </span>{" "}
                  No medical sales pitch.
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ourora-yellow/20 text-ourora-yellow">
                    ✓
                  </span>{" "}
                  Just clarity.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16">
            <button
              ref={quizButtonRef}
              className="inline-flex items-center justify-center rounded-full bg-ourora-cream px-8 py-5 text-foreground text-lg sm:text-xl font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:bg-white transition-all duration-300"
            >
              Get Your Roadmap
            </button>
            <p className="mt-4 text-sm text-ourora-cream/50">Takes less than 2 minutes</p>
          </div>
        </div>
      </section>
    </div>
  );
}
