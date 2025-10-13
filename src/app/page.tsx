"use client";

import { useEffect, useMemo, useRef } from "react";
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

export default function Home() {
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);
  const section4Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section 2: highlight 5 random words across all paragraphs
      if (section2Ref.current) {
        const words = Array.from(section2Ref.current.querySelectorAll<HTMLSpanElement>(".word"));
        if (words.length > 0) {
          gsap.set(words, { display: "inline-block", filter: "blur(6px)", opacity: 0 });
          gsap.to(words, {
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.015,
            scrollTrigger: {
              trigger: section2Ref.current,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            },
          });
        }
      }

      // Separate animation for the middle testimonials block
      if (section3Ref.current) {
        const words = Array.from(section3Ref.current.querySelectorAll<HTMLSpanElement>(".word"));
        if (words.length > 0) {
          gsap.set(words, { display: "inline-block" });
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
                end: "bottom 100%",
                scrub: true,
              },
            })
            .to(figures, { opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)", stagger: 0.22 });
        }
      }

      // Section 3: two paragraphs, randomly animate selected words with varied effects
      if (section4Ref.current) {
        const words = Array.from(section4Ref.current.querySelectorAll<HTMLSpanElement>(".word"));
        if (words.length > 0) {
          // pick ~15% of words for animation (at least 6, capped at 20)
          const targetCount = Math.min(20, Math.max(6, Math.round(words.length * 0.15)));
          const indices = new Set<number>();
          while (indices.size < targetCount) {
            indices.add(Math.floor(Math.random() * words.length));
          }
          const chosen = Array.from(indices).map((i) => words[i]);

          chosen.forEach((el) => {
            // allow transforms on inline text
            gsap.set(el, { display: "inline-block" });
            const effects = [
              { from: { yPercent: 120, opacity: 0 }, to: { yPercent: 0, opacity: 1 } },
              { from: { rotation: -10, opacity: 0 }, to: { rotation: 0, opacity: 1 } },
              { from: { scale: 0.85, opacity: 0 }, to: { scale: 1, opacity: 1 } },
              { from: { y: 16, color: "#6b7280" }, to: { y: 0, color: "#111827" } },
            ];
            const fx = effects[Math.floor(Math.random() * effects.length)];
            gsap.fromTo(
              el,
              fx.from as gsap.TweenVars,
              {
                ...(fx.to as gsap.TweenVars),
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto min-h-screen flex items-center justify-center px-6 sm:px-12">
          <h1 className="text-9xl sm:text-6xl font-bold tracking-tight leading-tight">
            Because Your Future Shouldn&#39;t Feel Like a Deadline
          </h1>
      </section>
      {/* Me Too Section */}
      <section ref={section2Ref} className="min-h-screen px-6 sm:px-12 py-32 max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-6">You are not alone</h2>
        <Paragraph
          className="text-4xl leading-16 text-gray-700 mb-4"
          text="2 years ago, Nicole, the founder, had to go through the process feeling isolated, pressured by social standards, and overwhelmed by millions of pieces of information that were isolated and unhelpful in sourcing the facts. Even after going through the process, the hormone changes continued to affect her for more than 6 months, leading to suicidal thoughts. "
        />
        <Paragraph
          className="text-4xl leading-16 text-gray-700 mb-4"
          text="As she encountered more and more women seeking her guidance on procedures, Nicole realized that many had faced similar challenges. So she decided to create a solution that would eliminate as many obstacles as possible for others in her position. Because hey, this patriarchal system wouldn’t care less about the egg freezing, we can step up to change it and make life easier for all women."
        />
      </section>

      {/* From Others Section */}
      <section className="max-w-4xl mx-auto min-h-screen flex items-center justify-center px-6 sm:px-12">
           <h2 className="text-6xl font-bold mb-6">So we started by listening to thousands of women who&#39;ve walked this path before you.</h2>
      </section>

      {/* From Others Section */}
      <section ref={section3Ref} className="min-h-screen px-6 sm:px-12 py-32 max-w-4xl mx-auto">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
          <figure className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <span aria-hidden className="absolute -top-8 left-8 text-9xl leading-none text-gray-200">&ldquo;</span>
            <blockquote>
              <Paragraph
                className="text-4xl leading-16 text-gray-800 italic"
                text="The injections weren't the hardest part. The waiting was."
              />
            </blockquote>
          </figure>
          <figure className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <span aria-hidden className="absolute -top-8 left-8 text-9xl leading-none text-gray-200">&ldquo;</span>
            <blockquote>
              <Paragraph
                className="text-4xl leading-16 text-gray-800 italic"
                text="I spent $12,000 and still felt lost about what was happening to my body."
              />
            </blockquote>
          </figure>
          <figure className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:col-span-2">
            <span aria-hidden className="absolute -top-8 left-8 text-9xl leading-none text-gray-200">&ldquo;</span>
            <blockquote>
              <Paragraph
                className="text-4xl leading-16 text-gray-800 italic"
                text="I wish someone had told me that freezing my eggs wouldn't make me weak — it'd make me free."
              />
            </blockquote>
          </figure>
        </div>
      </section>

      <section ref={section4Ref} className="min-h-screen px-6 sm:px-12 py-32 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Paragraph
            className="text-xl leading-8 text-gray-700 mb-4"
            text="We created Aura to be your personal guide through the beautiful mess of modern fertility — where logic meets longing, and clarity becomes the most loving gift you can give yourself. We built it for women who don't just want their numbers — they want to understand their story."
          />
          <Paragraph
            className="text-xl leading-8 text-gray-700"
            text="Every line of Aura's design — every screen, every word — carries those stories."
          />
        </div>
      </section>

      {/* Spacer to allow scroll experience */}
      <div className="h-40" />
    </div>
  );
}
