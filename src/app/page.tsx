"use client";

import { motion } from "framer-motion";
import { CandlelightStage } from "@/components/layout/CandlelightStage";
import { StoryLanternSection } from "@/components/layout/StoryLanternSection";
import { TheSpark } from "@/components/ui/TheSpark";
import { useOpeningLight } from "@/hooks/useOpeningLight";

export default function HomePage() {
  const { hasStarted, ignite, isLit, leftLampLit, rightLampLit } = useOpeningLight();

  return (
    <CandlelightStage isLit={isLit} leftLampLit={leftLampLit} rightLampLit={rightLampLit}>
      <main className="relative min-h-[180rem] px-6 pb-40 pt-16">
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

            <TheSpark isIgniting={hasStarted} onIgnite={ignite} />

            <motion.div
              initial={false}
              animate={{
                opacity: isLit ? 1 : 0.24,
                filter: isLit ? "blur(0px)" : "blur(6px)",
              }}
              transition={{ duration: 1.4, delay: isLit ? 0.3 : 0, ease: "easeOut" }}
              className="mt-14 space-y-5"
            >
              <h1 className="font-serifStory text-4xl leading-tight text-parchment sm:text-5xl">
                Go ahead and give it a try
              </h1>
              <p className="max-w-xl text-sm leading-8 text-parchment/76 sm:text-base">
                暗がりのなかに小さな灯りをともして、自己紹介、ハッカソンの記録、音楽の気配へと続く夜道をひらく。
              </p>
            </motion.div>

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

        <div className="relative z-10 mx-auto mt-8 max-w-5xl">
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
      </main>
    </CandlelightStage>
  );
}
