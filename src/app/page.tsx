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

function TestimonialFigure({ text, className = "" }: { text: string; className?: string }) {
  const base = "relative rounded-lg border border-gray-200 bg-white p-8";
  const cls = [base, className].filter(Boolean).join(" ");
  return (
    <figure className={cls}>
      <span aria-hidden className="absolute -top-8 left-8 text-9xl leading-none text-gray-200">&ldquo;</span>
      <blockquote>
        <Paragraph
          className="text-2xl lg:text-5xl leading-8 lg:leading-16 text-gray-800 font-bold"
          text={text}
        />
      </blockquote>
    </figure>
  );
}

export default function Home() {
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);
  const section4Ref = useRef<HTMLDivElement | null>(null);
  const headerHighlightRef = useRef<HTMLSpanElement | null>(null);
  const headerHighlightRef2 = useRef<HTMLSpanElement | null>(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          gsap.set(words, { display: "inline-block", filter: "blur(6px)", opacity: 0, y: 6 });
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto min-h-dvh flex items-center justify-center px-6 sm:px-12">
          <h1 className="text-4xl lg:text-7xl font-bold tracking-tight leading-tight">
            Because Your Future Shouldn&#39;t Feel Like a Deadline
          </h1>
      </section>
      {/* Me Too Section */}
      <section ref={section2Ref} className="min-h-screen px-6 sm:px-12 py-32 max-w-4xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">You are not alone</h2>
        <Paragraph
          className="text-2xl lg:text-5xl leading-8 lg:leading-16 text-gray-700 mb-4"
          text="2 years ago, Nicole, the founder, had to go through the process feeling isolated, pressured by social standards, and overwhelmed by millions of pieces of information that were isolated and unhelpful in sourcing the facts. Even after going through the process, the hormone changes continued to affect her for more than 6 months, leading to suicidal thoughts. "
        />
        <Paragraph
          className="text-2xl lg:text-5xl leading-8 lg:leading-16 text-gray-700 mb-4"
          text="As she encountered more and more women seeking her guidance on procedures, Nicole realized that many had faced similar challenges. So she decided to create a solution that would eliminate as many obstacles as possible for others in her position. Because hey, this patriarchal system wouldn’t care less about the egg freezing, we can step up to change it and make life easier for all women."
        />
      </section>

      {/* From Others Header Section */}
      <section className="max-w-4xl mx-auto min-h-dvh flex items-center justify-center px-12 lg:px-6">
           <h2 className="text-4xl lg:text-7xl font-bold mb-6">
             <span ref={headerHighlightRef} className="highlight-sweep">
               So we started by listening to thousands of women who&apos;ve walked this path before you.
             </span>
           </h2>
      </section>

      {/* From Others Section */}
      <section ref={section3Ref} className=" max-w-4xl mx-auto min-h-dvh flex items-center justify-center px-6 px-12 lg:py-32">
        <div className="grid gap-6 lg:gap-4 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <TestimonialFigure key={i} text={t.text} className={t.className} />
          ))}
        </div>
      </section>

      <section ref={section4Ref} className="max-w-4xl mx-auto min-h-dvh flex items-center justify-center px-6 sm:px-12 py-32">
        <Paragraph
          className="text-2xl lg:text-5xl leading-8 lg:leading-16 text-gray-700 mb-4"
          text="Aura is created to be your personal guide through the beautiful mess of modern fertility — where logic meets longing, and clarity becomes the most loving gift you can give yourself. We built it for women who don't just want their numbers — they want to understand their story."
        />
      </section>

      {/* From Others Header Section */}
      <section className="max-w-4xl mx-auto min-h-dvh flex items-center justify-center px-6 sm:px-12">
           <h2 className="text-4xl lg:text-7xl font-bold mb-6">
             <span ref={headerHighlightRef2} className="highlight-sweep">
               Every line of Aura's design — every screen, every word — carries those stories.
             </span>
           </h2>
      </section>
    </div>
  );
}
