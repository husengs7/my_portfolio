"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Music2, Twitter } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { Constellation } from "@/components/layout/Constellation";
import { CandlelightStage } from "@/components/layout/CandlelightStage";
import { CloudWisp } from "@/components/layout/CloudWisp";
import { TimelineThread } from "@/components/layout/TimelineThread";
import { StoryLanternSection } from "@/components/layout/StoryLanternSection";
import { TheSpark } from "@/components/ui/TheSpark";
import { useOpeningLight } from "@/hooks/useOpeningLight";

export default function HomePage() {
  const { hasStarted, ignite, isLit, leftLampLit, rightLampLit } = useOpeningLight();
  const profileLinks = [
    { href: "https://github.com/husengs7", label: "GitHub", icon: Github },
    { href: "https://x.com/husensan_", label: "X", icon: Twitter },
    { href: "https://soundcloud.com/husen-tannsu", label: "SoundCloud", icon: Music2 },
  ];
  const timelineItems = [
    {
      date: "2025.07",
      title: "Progateハッカソン powered by AWS",
      description: "React Native による宿題支援スマホアプリを開発。",
    },
    {
      date: "2025.08~09",
      title: "100Program",
      description: "Node.js によるジオゲッサー Web アプリを制作。ファイナル進出。",
    },
    {
      date: "2025.10",
      title: "チームラボ Flutter 1Day ハッカソン",
      description: "短期間でFlutterの基礎とデザインによるユーザー体験を学ぶ。",
    },
    {
      date: "2025.12",
      title: "Progateハッカソン supported by RIZAP",
      description: "FlutterとGoogleMap API による地図アプリを開発し、RIZAP 賞を受賞。",
      hasAward: true,
    },
    {
      date: "2025.12",
      title: "RIZAPテクノロジーズ 3days インターン",
      description: "Ruby on Rails を用いた chocoZAP の API 設計に取り組む。",
    },
    {
      date: "2026.02",
      title: "42Tokyo Piscine",
      description: "1ヶ月間、教師なしの環境の中、生徒同士のピアラーニングでC言語を学ぶ。",
    },
    {
      date: "2026.03",
      title: "Findy Campus Hackathon",
      description: "React と Ruby on Rails のスマホアプリで Findy 賞とウェルスナビ賞を受賞。",
      hasAward: true,
    },
  ];
  const productItems = [
    {
      title: "Quest Calendar",
      tags: ["React Native", "Firebase", "TypeScript"],
      description:
        "宿題や日々の目標を、クエストを進めるような感覚で記録できるスマホアプリ。学習管理にゲーム的な達成感を持ち込み、日常の継続を支える設計を試した。",
      viewHref: "https://github.com/husengs7",
      githubHref: "https://github.com/husengs7",
      imageSrc: "/city.png",
      imageAlt: "Quest Calendar preview",
      imagePosition: "object-[center_20%]",
    },
    {
      title: "TrainGuessr",
      tags: ["Node.js", "Leaflet", "JavaScript"],
      description:
        "駅や路線の風景から現在地を推理する、鉄道好きのためのジオゲッサー系 Web アプリ。地図体験とクイズ性を組み合わせ、短時間でも遊びたくなる導線を磨いた。",
      viewHref: "https://github.com/husengs7",
      githubHref: "https://github.com/husengs7",
      imageSrc: "/my.jpg",
      imageAlt: "TrainGuessr preview",
      imagePosition: "object-center",
    },
    {
      title: "Takibi Chat",
      tags: ["React", "Ruby on Rails", "Supabase"],
      description:
        "焚き火を囲むような穏やかな対話をテーマにしたチャットアプリ。Findy Campus Hackathon で形にしたプロトタイプで、安心して会話を始められる空気感を UI に落とし込んだ。",
      viewHref: "https://github.com/husengs7",
      githubHref: "https://github.com/husengs7",
      imageSrc: "/twicon.jpg",
      imageAlt: "Takibi Chat preview",
      imagePosition: "object-center",
    },
  ];

  useEffect(() => {
    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const previousHtmlOverflow = documentElement.style.overflow;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    if (!isLit) {
      body.style.overflow = "hidden";
      documentElement.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      body.style.overflow = "";
      body.style.paddingRight = "";
      documentElement.style.overflow = "";
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isLit]);

  return (
    <CandlelightStage isLit={isLit} leftLampLit={leftLampLit} rightLampLit={rightLampLit}>
      <motion.div
        initial={false}
        animate={{ opacity: isLit ? 0.40 : 0 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: isLit ? 0.2 : 0 }}
        className="fixed bottom-[-110px] left-0 right-0 h-[40vh] min-h-[300px] w-full pointer-events-none md:bottom-[-110px]"
        style={{
          zIndex: -20,
          maskImage: "linear-gradient(to top, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 80%, transparent 100%)",
        }}
      >
        <Image
          src="/city.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-translate-y-[5%] scale-[0.97] object-cover object-top brightness-[1.15] contrast-110 md:translate-y-0 md:scale-100 md:object-cover md:object-bottom md:brightness-90"
        />
      </motion.div>

      <motion.main
        initial={false}
        animate={{
          opacity: isLit ? 1 : 0.92,
        }}
        transition={{ duration: 1.25, delay: isLit ? 0.15 : 0, ease: "easeOut" }}
        className="relative z-10 min-h-[180rem] px-6 pb-40 pt-16"
      >

        <section className="relative flex min-h-screen items-center justify-center">
          <CloudWisp mode="front" placement="section" className="opacity-75" />
          <motion.section
            initial={false}
            animate={{
              opacity: isLit ? 1 : 0.92,
              y: isLit ? -12 : 0,
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-w-3xl flex-col items-center text-center"
          >
            <motion.p
              initial={false}
              animate={{ opacity: isLit ? 0.88 : 0.46, letterSpacing: isLit ? "0.28em" : "0.22em" }}
              transition={{ duration: 1 }}
              className="mb-5 text-[0.72rem] uppercase text-parchment/60"
            >
              Welcome to my portfolio
            </motion.p>

            <motion.div
              initial={false}
              animate={{
                opacity: isLit ? 1 : 0.24,
                filter: isLit ? "blur(0px)" : "blur(6px)",
              }}
              transition={{ duration: 1.4, delay: isLit ? 0.3 : 0, ease: "easeOut" }}
              className="space-y-5"
            >
              <h1 className="font-serifStory text-4xl leading-tight text-parchment sm:text-5xl">
                Sora Midorikawa / husensan
              </h1>
              <p className="max-w-xl text-sm leading-8 text-parchment/76 sm:text-base">
                静かな夜明け前の世界、小さな明かりを灯して...
                ゆっくり見ていってね。
              </p>
            </motion.div>

            <div className="mt-10">
              <TheSpark isIgniting={hasStarted} onIgnite={ignite} />
            </div>

            <motion.p
              initial={false}
              animate={{
                opacity: hasStarted && !isLit ? 0.82 : 0,
              }}
              transition={{ duration: 0.4 }}
              className="mt-8 text-xs uppercase tracking-[0.28em] text-amber-100/72"
            >
              Light the Night
            </motion.p>
          </motion.section>
        </section>

        <section className="relative z-10 mx-auto mt-4 max-w-6xl">
          <div className="pointer-events-none absolute inset-0 z-0">
            <motion.div
              initial={false}
              animate={{ opacity: isLit ? 1 : 0 }}
              transition={{ duration: 2, ease: "easeOut", delay: isLit ? 0.5 : 0 }}
            >
              <Constellation
                tone="orion"
                className="left-[4%] -top-56 h-[10rem] w-[14rem] opacity-90 sm:left-[10%] sm:-top-64 sm:h-[11rem] sm:w-[16rem]"
              />
              <Constellation
                tone="cassiopeia"
                className="right-[2%] top-20 h-[9rem] w-[15rem] opacity-85 sm:right-[4%] sm:top-24 sm:h-[10rem] sm:w-[17rem]"
              />
            </motion.div>
          </div>
          <div className="relative mx-auto max-w-4xl py-12">
            <CloudWisp mode="front" placement="section" className="opacity-75" />
            <motion.div
              initial={false}
              animate={{
                opacity: isLit ? 1 : 0.4,
                y: isLit ? 0 : 16,
              }}
              transition={{ duration: 1.6, delay: isLit ? 0.45 : 0, ease: "easeOut" }}
              className="relative z-10 mx-auto max-w-2xl text-center"
            >
              <div className="mt-5 flex items-center justify-center gap-4">
                <Image
                  src="/twicon.jpg"
                  alt="Profile"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <h2 className="font-serifStory text-3xl leading-tight text-parchment sm:text-4xl">
                  Profile
                </h2>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-16 max-w-5xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
            <div className="mb-8 md:mb-0 md:w-1/3">
              <div className="mx-auto w-full max-w-[190px] md:-mt-4 md:max-w-[280px] md:sticky md:top-32">
                <div className="relative aspect-[11/16] overflow-hidden rounded-2xl border border-parchment/10 opacity-90 shadow-[0_0_36px_rgba(245,197,108,0.08)]">
                  <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_48%,rgba(5,5,26,0.08)_100%)]" />
                  <Image
                    src="/my.jpg"
                    alt="Sora Midorikawa profile"
                    fill
                    sizes="(min-width: 768px) 300px, 70vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-2/3 md:-mt-3">
              <StoryLanternSection
                eyebrow="about the walker"
                title="Sora Midorikawa / husensan"
                body={
                  <div className="space-y-3 leading-relaxed">
                    <p>東京情報大学 総合情報学部 2年</p>
                    <p>ネットワーク・セキュリティ研究室</p>
                    <p>Japan Tokyo</p>
                    <p>ねずみ幸福論 : ドラマー</p>
                    <p>楽器:ピアノ・DJ・ギター・ドラム</p>
                    <p>趣味：都内を練り歩くこと</p>
                  </div>
                }
                align="left"
                className="mt-0"
              />
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 px-4 md:px-0">
                {profileLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-xl text-parchment/50 transition-all duration-300 hover:text-amber-200 hover:drop-shadow-[0_0_5px_rgba(245,197,108,0.4)]"
                    >
                      <Icon size={22} />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <section className="relative z-10 mt-24 w-full px-6">
          <div className="mx-auto max-w-4xl">
            <CloudWisp
              mode="front"
              placement="section"
              className="pointer-events-none absolute inset-0 z-0 opacity-60"
            />
            <div className="mb-12 text-center">
              <h2 className="relative z-10 font-serifStory text-2xl tracking-[0.3em] text-amber-100/80">Locus</h2>
            </div>
            <div className="relative z-10">
              <TimelineThread items={timelineItems} />
            </div>
          </div>
        </section>

        <section className="relative z-10 mt-28 w-full px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="font-serifStory text-2xl tracking-[0.3em] text-amber-100/80">Product</h2>
            </div>

            <div className="space-y-10 md:space-y-14">
              {productItems.map((product, index) => {
                const isEven = index % 2 === 1;

                return (
                  <motion.article
                    key={product.title}
                    initial={{ opacity: 0, x: isEven ? 36 : -36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-10% 0px -15% 0px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-xl backdrop-blur-[2px] md:grid-cols-2 ${
                      isEven ? "" : ""
                    }`}
                  >
                    <div className={`${isEven ? "md:order-2" : ""} relative min-h-[14rem] overflow-hidden rounded-t-[1.75rem] md:min-h-[18rem] md:rounded-l-[1.75rem] md:rounded-tr-none ${isEven ? "md:rounded-r-[1.75rem] md:rounded-tl-none" : ""}`}>
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className={`object-cover ${product.imagePosition}`}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,26,0.04),rgba(5,5,26,0.28))]" />
                    </div>

                    <div className={`${isEven ? "md:order-1" : ""} flex flex-col justify-center px-6 py-7 md:px-8 md:py-9`}>
                      <h3 className="font-serifStory text-2xl text-parchment md:text-[1.9rem]">{product.title}</h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block rounded-full border border-amber-100/20 bg-amber-100/5 px-3 py-1 text-xs tracking-[0.18em] text-amber-100/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="mt-5 text-sm leading-8 text-parchment/72 md:text-base">
                        {product.description}
                      </p>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <a
                          href={product.viewHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-amber-100/20 bg-amber-100/8 px-4 py-2 text-sm text-amber-100/85 transition-all duration-300 hover:border-amber-100/35 hover:bg-amber-100/12 hover:drop-shadow-[0_0_10px_rgba(245,197,108,0.18)]"
                        >
                          <ArrowUpRight size={16} />
                          <span>View Project</span>
                        </a>
                        <a
                          href={product.githubHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-parchment/72 transition-all duration-300 hover:border-amber-100/30 hover:text-amber-100/90 hover:drop-shadow-[0_0_10px_rgba(245,197,108,0.14)]"
                        >
                          <Github size={16} />
                          <span>GitHub</span>
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </motion.main>
    </CandlelightStage>
  );
}
