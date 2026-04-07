"use client";

import { motion } from "framer-motion";
import { Github, Music2, Twitter } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { Constellation } from "@/components/layout/Constellation";
import { CandlelightStage } from "@/components/layout/CandlelightStage";
import { CloudWisp } from "@/components/layout/CloudWisp";
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
        className="fixed bottom-[-110px] left-0 right-0 h-[40vh] min-h-[300px] w-full pointer-events-none"
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
          className="object-cover object-bottom brightness-90 contrast-110"
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
              shubo...
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
            <div className="md:w-1/3">
              <div className="mx-auto w-full max-w-[300px] md:-mt-4 md:sticky md:top-32">
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
              <StoryLanternSection
                eyebrow="hackathon notes"
                title="次の街灯のそばでは、試作と挑戦の記録がそっと浮かび上がる。"
                body="近づくほどに輪郭が見えてくる展示台のように、ハッカソンで形にしたアイデアや、短い時間で積み上げた実装の熱量が、琥珀色の光のなかで読めるようになる。"
                align="right"
              />
              <StoryLanternSection
                eyebrow="music at midnight"
                title="さらに歩くと、音の余韻が夜気に混じり、ポートフォリオにもうひとつの表情を与える。"
                body="音楽活動のセクションは、まっすぐな実績紹介ではなく、夜の園路に響く旋律のように。スクロールとともに、静かな物語の奥行きが少しずつひらいていく。"
                align="left"
              />
            </div>
          </div>
        </section>
        </motion.main>
    </CandlelightStage>
  );
}
