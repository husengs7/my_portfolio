"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Mail, Music2, Twitter } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Constellation } from "@/components/layout/Constellation";
import { CandlelightStage } from "@/components/layout/CandlelightStage";
import { CloudWisp } from "@/components/layout/CloudWisp";
import { TimelineThread } from "@/components/layout/TimelineThread";
import { StoryLanternSection } from "@/components/layout/StoryLanternSection";
import { TheSpark } from "@/components/ui/TheSpark";
import { useOpeningLight } from "@/hooks/useOpeningLight";

type SubProductItem = {
  title: string;
  imageSrc?: string;
  imageAlt?: string;
  description?: string;
  tags: string[];
  viewHref?: string;
  viewLabel?: string;
  playHref?: string;
  playLabel?: string;
  githubHref?: string;
  imagePosition?: string;
};

function SubProductCard({ product }: { product: SubProductItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasPrimaryLinks = Boolean(product.viewHref || product.playHref);
  const hasLinks = Boolean(product.viewHref || product.playHref || product.githubHref);
  const hasDetails = product.tags.length > 0 || Boolean(product.description);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-8% 0px -12% 0px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      onClick={() => setIsExpanded((current) => !current)}
      className={`relative w-full overflow-visible self-start rounded-[1.25rem] border border-parchment/10 bg-[linear-gradient(180deg,rgba(245,197,108,0.08),rgba(255,255,255,0.02))] shadow-[0_0_20px_rgba(245,197,108,0.06)] backdrop-blur-[1px] transition-shadow duration-300 md:basis-[calc((100%-3rem)/3)] md:max-w-[calc((100%-3rem)/3)] md:rounded-[1.5rem] ${
        isExpanded ? "z-20 shadow-[0_0_28px_rgba(245,197,108,0.14)]" : "z-0"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-8 top-5 h-24 rounded-full bg-[radial-gradient(circle,rgba(245,197,108,0.12)_0%,rgba(245,197,108,0.05)_42%,rgba(5,5,26,0)_74%)] blur-2xl" />
      {product.imageSrc ? (
        <div className="relative overflow-hidden rounded-t-[1.25rem] md:rounded-t-[1.5rem]">
          <div className="relative aspect-[16/9]">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt ?? product.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className={`object-cover ${product.imagePosition ?? "object-center"}`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,26,0.05),rgba(5,5,26,0.35))]" />
          </div>
        </div>
      ) : null}

      <div className="relative px-2.5 pb-3 pt-3 md:px-5 md:pb-5 md:pt-4">
        <h3 className="text-sm font-bold tracking-tight text-amber-100/90 md:text-xl">
          {product.title}
        </h3>

        {hasLinks ? (
          <div className="mt-3 flex items-center justify-start gap-1.5 md:mt-4 md:gap-2">
          {product.playHref ? (
            <a
              href={product.playHref}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-orange-300/20 bg-orange-400/8 px-2 py-1.5 text-[0.65rem] text-orange-100/90 transition-all duration-300 hover:border-orange-300/35 hover:bg-orange-400/12 hover:text-orange-50 hover:drop-shadow-[0_0_10px_rgba(251,146,60,0.22)] md:gap-2 md:px-3 md:py-2 md:text-xs"
            >
              <ArrowUpRight size={13} />
              <span>{product.playLabel ?? "Play"}</span>
            </a>
          ) : null}
          {product.viewHref ? (
            <a
              href={product.viewHref}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-amber-100/20 bg-amber-100/8 px-2 py-1.5 text-[0.65rem] text-amber-100/85 transition-all duration-300 hover:border-amber-100/35 hover:bg-amber-100/12 hover:drop-shadow-[0_0_10px_rgba(245,197,108,0.18)] md:gap-2 md:px-3 md:py-2 md:text-xs"
            >
              <ArrowUpRight size={13} />
              <span>{product.viewLabel ?? "View Project"}</span>
            </a>
          ) : null}
          {product.githubHref ? (
            <a
              href={product.githubHref}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className={`inline-flex items-center justify-center gap-1 rounded-full border border-violet-300/20 bg-violet-400/8 px-2 py-1.5 text-[0.65rem] text-violet-200/90 transition-all duration-300 hover:border-violet-300/35 hover:bg-violet-400/12 hover:text-violet-100 hover:drop-shadow-[0_0_10px_rgba(167,139,250,0.22)] md:gap-2 md:px-3 md:py-2 md:text-xs ${
                hasPrimaryLinks ? "flex-1" : "w-full"
              }`}
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>
          ) : null}
          </div>
        ) : null}

        {hasDetails ? (
          <motion.div
          layout
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 16 : 0,
          }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="border-t border-parchment/10 pt-4">
            {product.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full border border-amber-100/20 bg-amber-100/5 px-3 py-1 text-[0.68rem] tracking-[0.16em] text-amber-100/70"
                >
                  {tag}
                </span>
              ))}
              </div>
            ) : null}
            {product.description ? (
                          <p className="mt-4 text-xs leading-6 text-parchment/72 md:text-sm md:leading-7">
                {product.description}
              </p>
            ) : null}
          </div>
          </motion.div>
        ) : null}
      </div>
    </motion.article>
  );
}

export default function HomePage() {
  const { hasStarted, ignite, isLit, leftLampLit, rightLampLit } = useOpeningLight();
  const profileLinks = [
    {
      href: "https://github.com/husengs7",
      label: "GitHub",
      icon: Github,
      hoverClass:
        "hover:text-violet-400 hover:drop-shadow-[0_0_7px_rgba(139,92,246,0.55)]",
    },
    {
      href: "https://x.com/husensan_",
      label: "X",
      icon: Twitter,
      hoverClass:
        "hover:text-sky-400 hover:drop-shadow-[0_0_7px_rgba(56,189,248,0.55)]",
    },
    {
      href: "https://soundcloud.com/husen-tannsu",
      label: "SoundCloud",
      icon: Music2,
      hoverClass:
        "hover:text-orange-400 hover:drop-shadow-[0_0_7px_rgba(251,146,60,0.55)]",
    },
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
      title: "numip",
      tags: ["Flutter", "Python", "GoogleMapsAPI","Cockroach DB"],
      awards: ["RIZAP賞"],
      description:
        "夜のテーマパークを歩くようなワクワク感で、あなただけの地図をつくることができるAndroidアプリです。",
      viewHref: "https://topaz.dev/projects/2ea479052aa5c39fc6b0",
      githubHref: "https://github.com/k0rucha/numyp",
      imageSrc: "/numip1.JPG",
      imageAlt: "Quest Calendar preview",
      imagePosition: "object-[center_20%]",
    },
    {
      title: "焚き火チャット",
      tags: ["React", "Ruby on Rails", "WebSocket"],
      awards: ["Findy賞", "ウェルスナビ賞"],
      description:
        "孤独を感じる夜でも、ゆらめく炎を誰かと囲めば、心は少しだけ軽くなるはず。そんなささやかな温もりを分かち合うwebアプリです。",
      viewHref: "https://canva.link/vzjmpra76g8x5yk",
      githubHref: "https://github.com/Findy-Campus-Hackathon-2026/findy-hackathon-takibi",
      imageSrc: "/takibi.JPG",
      imageAlt: "TrainGuessr preview",
      imagePosition: "object-center md:object-[center_48%]",
    },
    {
      title: "逆ジオゲッサー",
      tags: ["Node.js", "GoogleMapAPI", "mongoDB"],
      awards: ["100Programファイナル進出"],
      description:
        "迷子をゲームに。指定されたポイントまで辿る、ジオゲッサーライクなwebアプリです。",
      viewHref: "https://speakerdeck.com/husengs7/100programni-ziogetusafa-biao-suraido",
      githubHref: "https://github.com/husengs7/Tokyo-Flag-capturing-geogesser",
      imageSrc: "/100Program.jpg",
      imageAlt: "Takibi Chat preview",
      imagePosition: "object-center",
    },
  ];
  const subProductItems: SubProductItem[] = [
    {
      title: "TODOファーム",
      imageSrc: "/farmTodo.JPG",
      imageAlt: "TODOファーム preview",
      description: "農場でお花を育てることのできる、Todo管理アプリです。",
      tags: ["Flutter"],
      githubHref: "https://github.com/husengs7/teamlab-1dayhackathon-farmTodo",
      imagePosition: "object-center",
    },
    {
      title: "TrainGuessr",
      imageSrc: "/trainguessr.jpg",
      imageAlt: "TrainGuessr preview",
      description: "乗換案内から、駅名を推測するクイズです。  企画：takopi 制作：takopi・husensan supported by TokyoNuMap",
      tags: ["JavaScript", "Node.js",],
      viewHref: "https://trainguessrquiz.github.io/TrainGuessr/",
      viewLabel: "Play",
      githubHref: "https://github.com/TrainGuessrquiz/TrainGuessr",
      imagePosition: "object-[center_42%]",
    },
    {
      title: "Quest Calendar",
      imageSrc: "/todoq.JPG",
      imageAlt: "Quest Calendar preview",
      description: "宿題を倒しながら8月31日の滅亡から世界を救います。",
      tags: ["React Native", "JavaScript", "Dynamodb"],
      viewHref: "https://topaz.dev/projects/41a165c1c1bf47342bfc",
      playHref: "https://hackathon-summer-vacation.github.io/quest-calendar/",
      githubHref: "https://github.com/hackathon-summer-vacation/quest-calendar",
      imagePosition: "object-center",
    },
    {
      title: "Tab AM Radio Filter",
      imageSrc: "/tab.png",
      imageAlt: "Tab AM Radio Filter preview",
      description: "任意のタブの音声をAMラジオ風の音質にリアルタイム変換するChrome拡張機能です。",
      tags: ["JavaScript"],
      githubHref: "https://github.com/husengs7/Tab-AM-Radio-Filter",
      imagePosition: "object-[center_35%]",
    },
    {
      title: "andmore",
      tags: [],
    },
    {
      title: "andmore",
      tags: [],
    },
  ];

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

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
                      className={`flex items-center gap-3 text-xl text-parchment/50 transition-all duration-300 ${link.hoverClass}`}
                    >
                      <Icon size={22} />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>
              <div className="mt-10 px-4 md:px-0">
                <div className="flex items-center gap-3 font-mono text-base text-parchment/50">
                  <Mail size={20} />
                  <span>j25376ms@edu.tuis.ac.jp</span>
                </div>
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
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="mb-2 mt-2 text-2xl font-bold tracking-tight text-amber-100/90 md:text-[1.9rem]">
                          {product.title}
                        </h3>
                        {product.awards.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {product.awards.map((award) => (
                              <span
                                key={award}
                                className="inline-block rounded-full border border-amber-200/20 bg-amber-200/8 px-3 py-1 text-xs tracking-[0.08em] text-amber-100/80"
                              >
                                {award}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-4 hidden flex-wrap gap-2 md:flex">
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

                      <div className="mt-7 flex items-center justify-start gap-2 md:gap-3">
                        <a
                          href={product.viewHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-amber-100/20 bg-amber-100/8 px-3 py-2 text-xs text-amber-100/85 transition-all duration-300 hover:border-amber-100/35 hover:bg-amber-100/12 hover:drop-shadow-[0_0_10px_rgba(245,197,108,0.18)] md:px-4 md:text-sm"
                        >
                          <ArrowUpRight size={16} />
                          <span>View Project</span>
                        </a>
                        <a
                          href={product.githubHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/8 px-3 py-2 text-xs text-violet-200/90 transition-all duration-300 hover:border-violet-300/35 hover:bg-violet-400/12 hover:text-violet-100 hover:drop-shadow-[0_0_10px_rgba(167,139,250,0.22)] md:px-4 md:text-sm"
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

            <div className="mt-20 grid grid-cols-2 gap-3 md:flex md:flex-row md:flex-wrap md:items-start md:gap-6">
              {subProductItems.map((product) => (
                <SubProductCard key={product.title} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mt-28 w-full px-6">
          <div className="mx-auto max-w-4xl">
            <CloudWisp
              mode="front"
              placement="section"
              className="pointer-events-none absolute inset-0 z-0 opacity-45"
            />
            <div className="mb-12 text-center">
              <h2 className="relative z-10 font-serifStory text-2xl tracking-[0.3em] text-amber-100/80">Sound</h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10% 0px -15% 0px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative z-10 overflow-hidden rounded-[1.75rem] border border-parchment/10 bg-[linear-gradient(180deg,rgba(245,197,108,0.08),rgba(255,255,255,0.02))] p-4 shadow-[0_0_24px_rgba(245,197,108,0.07)] backdrop-blur-[1px] md:p-5"
            >
              <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1809529197&color=%23740aec&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                className="rounded-2xl"
                title="SoundCloud player - シュガーゲイザーデモ"
              />
              <div className="mt-3 overflow-hidden text-ellipsis whitespace-nowrap break-normal text-[10px] font-thin text-[#cccccc] [font-family:Interstate,Lucida_Grande,Lucida_Sans_Unicode,Lucida_Sans,Garuda,Verdana,Tahoma,sans-serif]">
                <a
                  href="https://soundcloud.com/husen-tannsu"
                  title="husensan"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#cccccc] no-underline"
                >
                  husensan
                </a>
                {" · "}
                <a
                  href="https://soundcloud.com/husen-tannsu/mmablc26o3uh"
                  title="シュガーゲイザーデモ"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#cccccc] no-underline"
                >
                  シュガーゲイザーデモ
                </a>
              </div>
              <iframe
                width="100%"
                height="202"
                src="https://www.bandlab.com/embed/?id=852a5920-f9d1-47a9-aafb-e57b11abf8d2"
                allowFullScreen
                className="mt-6 rounded-2xl"
                title="BandLab player"
              />
              <iframe
                width="100%"
                height="202"
                src="https://www.bandlab.com/embed/?id=36250eed-8eb8-f011-8196-0022484a3197"
                allowFullScreen
                className="mt-6 rounded-2xl"
                title="BandLab player 2"
              />
            </motion.div>
          </div>
        </section>

        <footer className="relative z-10 px-6 pt-24 text-center">
          <div className="mb-5">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-amber-100/42">
              Built With
            </p>
            <p className="mt-2 text-xs tracking-[0.18em] text-parchment/45">
              Next.js / Tailwind CSS / AWS Amplify
            </p>
          </div>
          <p className="text-xs tracking-[0.24em] text-parchment/38">
            © 2026 husensan. All rights reserved.
          </p>
        </footer>
      </motion.main>
    </CandlelightStage>
  );
}
