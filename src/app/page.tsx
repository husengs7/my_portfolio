"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { CandlelightStage } from "@/components/layout/CandlelightStage";
import { CloudWisp } from "@/components/layout/CloudWisp";
import { StoryLanternSection } from "@/components/layout/StoryLanternSection";
import { TheSpark } from "@/components/ui/TheSpark";
import { useOpeningLight } from "@/hooks/useOpeningLight";

export default function HomePage() {
  const { hasStarted, ignite, isLit, leftLampLit, rightLampLit } = useOpeningLight();

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
      <motion.main
        initial={false}
        animate={{
          opacity: isLit ? 1 : 0.92,
        }}
        transition={{ duration: 1.25, delay: isLit ? 0.15 : 0, ease: "easeOut" }}
        className="relative min-h-[180rem] px-6 pb-40 pt-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,197,108,0.08),transparent_36%)]" />

        <section className="relative flex min-h-screen items-center justify-center">
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

        <section className="relative z-10 mx-auto -mt-20 max-w-6xl">
          <CloudWisp className="mx-auto max-w-6xl" />

          <motion.div
            initial={false}
            animate={{
              opacity: isLit ? 1 : 0.4,
              y: isLit ? 0 : 16,
            }}
            transition={{ duration: 1.6, delay: isLit ? 0.45 : 0, ease: "easeOut" }}
            className="mx-auto -mt-16 max-w-2xl text-center"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.32em] text-parchment/48">
              before the self-introduction
            </p>
            <h2 className="mt-5 font-serifStory text-3xl leading-tight text-parchment sm:text-4xl">
              霧の向こうに、これから歩いていく人の輪郭が静かに現れる。
            </h2>
            <p className="mt-5 text-sm leading-8 text-parchment/66 sm:text-base">
              ここから先は、大学での学び、インターンで積み重ねた実装、音楽とものづくりが重なり合う自己紹介のページ。
              白いもやの層を抜けるように、少しずつ輪郭がはっきりしていく。
            </p>
          </motion.div>
        </section>

        <div className="relative z-10 mx-auto mt-16 max-w-5xl">
          <StoryLanternSection
            eyebrow="about the walker"
            title="小さな灯りを持って、静かな夜道を歩いていく。"
            body="散策路の最初に現れるのは、つくる人の気配。ことばとコードと音を携えて、暗い場所にひとつずつ明かりを置いていくための自己紹介。"
            align="center"
          />
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
      </motion.main>
    </CandlelightStage>
  );
}
