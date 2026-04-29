import { CSSProperties, memo } from "react";
import type { ScenePerformanceTier } from "../../../features/scenePerformance/scenePerformance.types";
import { useScenePerformanceProfile } from "../../../features/scenePerformance/useScenePerformanceProfile";
import type { SpaceTheme } from "../greetbot/spaceThemes";
import { SpaceContainer } from "./stars.style";

type StarsBackgroundProps = {
    theme: SpaceTheme;
};

const WARP_STREAKS = [
    { delay: "-0.4s", duration: "2.2s", height: "2px", left: "2%", opacity: 0.88, top: "12%", width: "11rem" },
    { delay: "-1.1s", duration: "2.8s", height: "1px", left: "9%", opacity: 0.68, top: "28%", width: "16rem" },
    { delay: "-2.6s", duration: "2.4s", height: "2px", left: "16%", opacity: 0.84, top: "20%", width: "9rem" },
    { delay: "-1.7s", duration: "3.1s", height: "1px", left: "23%", opacity: 0.72, top: "44%", width: "18rem" },
    { delay: "-3.2s", duration: "2.3s", height: "2px", left: "31%", opacity: 0.9, top: "18%", width: "12rem" },
    { delay: "-0.9s", duration: "3.4s", height: "1px", left: "39%", opacity: 0.62, top: "58%", width: "20rem" },
    { delay: "-2.1s", duration: "2.6s", height: "2px", left: "45%", opacity: 0.82, top: "34%", width: "10rem" },
    { delay: "-1.5s", duration: "3s", height: "1px", left: "52%", opacity: 0.7, top: "14%", width: "15rem" },
    { delay: "-2.8s", duration: "2.1s", height: "2px", left: "60%", opacity: 0.9, top: "24%", width: "13rem" },
    { delay: "-0.6s", duration: "3.2s", height: "1px", left: "67%", opacity: 0.64, top: "46%", width: "19rem" },
    { delay: "-3.6s", duration: "2.5s", height: "2px", left: "74%", opacity: 0.82, top: "16%", width: "9rem" },
    { delay: "-1.2s", duration: "2.9s", height: "1px", left: "81%", opacity: 0.74, top: "30%", width: "14rem" },
    { delay: "-2.4s", duration: "2.2s", height: "2px", left: "88%", opacity: 0.86, top: "52%", width: "11rem" },
    { delay: "-3.9s", duration: "3.3s", height: "1px", left: "94%", opacity: 0.56, top: "22%", width: "17rem" },
] as const;

const WARP_STARS = [
    { delay: "-1.2s", duration: "4.2s", left: "4%", opacity: 0.64, size: "0.42rem", top: "16%" },
    { delay: "-2.8s", duration: "5.1s", left: "13%", opacity: 0.52, size: "0.26rem", top: "34%" },
    { delay: "-0.9s", duration: "3.8s", left: "18%", opacity: 0.76, size: "0.34rem", top: "48%" },
    { delay: "-3.4s", duration: "5.4s", left: "26%", opacity: 0.58, size: "0.24rem", top: "24%" },
    { delay: "-1.6s", duration: "4.6s", left: "33%", opacity: 0.72, size: "0.38rem", top: "14%" },
    { delay: "-2.2s", duration: "5.3s", left: "41%", opacity: 0.5, size: "0.22rem", top: "42%" },
    { delay: "-0.7s", duration: "4s", left: "48%", opacity: 0.8, size: "0.44rem", top: "58%" },
    { delay: "-2.9s", duration: "5.6s", left: "56%", opacity: 0.54, size: "0.24rem", top: "20%" },
    { delay: "-1.4s", duration: "4.4s", left: "61%", opacity: 0.72, size: "0.36rem", top: "32%" },
    { delay: "-3.1s", duration: "5.2s", left: "68%", opacity: 0.6, size: "0.28rem", top: "12%" },
    { delay: "-0.8s", duration: "4.1s", left: "74%", opacity: 0.74, size: "0.4rem", top: "52%" },
    { delay: "-2.5s", duration: "5.8s", left: "82%", opacity: 0.46, size: "0.22rem", top: "38%" },
    { delay: "-1.1s", duration: "4.7s", left: "89%", opacity: 0.7, size: "0.34rem", top: "18%" },
    { delay: "-3.7s", duration: "5s", left: "95%", opacity: 0.56, size: "0.24rem", top: "46%" },
] as const;

const ASTEROID_FIELD = [
    {
        delay: "-5s",
        driftX: "2.8rem",
        driftY: "-1.8rem",
        duration: "19s",
        heightRatio: "0.76",
        left: "-4%",
        opacity: 0.9,
        radius: "58% 42% 64% 36% / 42% 58% 44% 56%",
        rotate: "-18deg",
        size: "11rem",
        top: "8%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-8s",
        driftX: "1.9rem",
        driftY: "-1rem",
        duration: "24s",
        heightRatio: "0.72",
        left: "5%",
        opacity: 0.82,
        radius: "46% 54% 51% 49% / 38% 46% 54% 62%",
        rotate: "14deg",
        size: "4.4rem",
        top: "26%",
        variant: "medium",
        zIndex: 1,
    },
    {
        delay: "-2s",
        driftX: "2.4rem",
        driftY: "-1.6rem",
        duration: "22s",
        heightRatio: "0.7",
        left: "12%",
        opacity: 0.88,
        radius: "54% 46% 59% 41% / 49% 39% 61% 51%",
        rotate: "-12deg",
        size: "7rem",
        top: "16%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-9s",
        driftX: "1.4rem",
        driftY: "-0.8rem",
        duration: "27s",
        heightRatio: "0.68",
        left: "19%",
        opacity: 0.72,
        radius: "44% 56% 52% 48% / 53% 41% 59% 47%",
        rotate: "8deg",
        size: "2.6rem",
        top: "42%",
        variant: "small",
        zIndex: 1,
    },
    {
        delay: "-4s",
        driftX: "2.6rem",
        driftY: "-1.4rem",
        duration: "21s",
        heightRatio: "0.78",
        left: "26%",
        opacity: 0.9,
        radius: "61% 39% 48% 52% / 42% 59% 41% 58%",
        rotate: "-22deg",
        size: "9rem",
        top: "9%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-11s",
        driftX: "1.6rem",
        driftY: "-1rem",
        duration: "25s",
        heightRatio: "0.74",
        left: "36%",
        opacity: 0.8,
        radius: "47% 53% 63% 37% / 55% 37% 63% 45%",
        rotate: "16deg",
        size: "4.8rem",
        top: "24%",
        variant: "medium",
        zIndex: 1,
    },
    {
        delay: "-7s",
        driftX: "1.2rem",
        driftY: "-0.6rem",
        duration: "28s",
        heightRatio: "0.66",
        left: "44%",
        opacity: 0.62,
        radius: "58% 42% 45% 55% / 46% 52% 48% 54%",
        rotate: "-8deg",
        size: "1.8rem",
        top: "54%",
        variant: "shard",
        zIndex: 1,
    },
    {
        delay: "-6s",
        driftX: "2.2rem",
        driftY: "-1.2rem",
        duration: "20s",
        heightRatio: "0.75",
        left: "52%",
        opacity: 0.9,
        radius: "52% 48% 58% 42% / 36% 58% 42% 64%",
        rotate: "-10deg",
        size: "7.4rem",
        top: "14%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-13s",
        driftX: "1.8rem",
        driftY: "-1rem",
        duration: "26s",
        heightRatio: "0.7",
        left: "61%",
        opacity: 0.76,
        radius: "45% 55% 49% 51% / 59% 36% 64% 41%",
        rotate: "12deg",
        size: "3.8rem",
        top: "34%",
        variant: "medium",
        zIndex: 1,
    },
    {
        delay: "-3s",
        driftX: "2.6rem",
        driftY: "-1.5rem",
        duration: "23s",
        heightRatio: "0.74",
        left: "69%",
        opacity: 0.92,
        radius: "62% 38% 55% 45% / 40% 60% 40% 60%",
        rotate: "-16deg",
        size: "10rem",
        top: "8%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-10s",
        driftX: "1.4rem",
        driftY: "-0.9rem",
        duration: "29s",
        heightRatio: "0.69",
        left: "78%",
        opacity: 0.74,
        radius: "49% 51% 57% 43% / 45% 57% 43% 55%",
        rotate: "10deg",
        size: "5.2rem",
        top: "40%",
        variant: "medium",
        zIndex: 1,
    },
    {
        delay: "-5s",
        driftX: "2.1rem",
        driftY: "-1.4rem",
        duration: "21s",
        heightRatio: "0.77",
        left: "86%",
        opacity: 0.88,
        radius: "56% 44% 63% 37% / 38% 52% 48% 62%",
        rotate: "-14deg",
        size: "8.2rem",
        top: "16%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-14s",
        driftX: "2.8rem",
        driftY: "-1.6rem",
        duration: "27s",
        heightRatio: "0.78",
        left: "94%",
        opacity: 0.84,
        radius: "43% 57% 52% 48% / 55% 37% 63% 45%",
        rotate: "18deg",
        size: "11.6rem",
        top: "48%",
        variant: "large edge",
        zIndex: 1,
    },
    {
        delay: "-7s",
        driftX: "1.8rem",
        driftY: "-1.1rem",
        duration: "24s",
        heightRatio: "0.72",
        left: "14%",
        opacity: 0.78,
        radius: "57% 43% 51% 49% / 46% 61% 39% 54%",
        rotate: "-11deg",
        size: "6.4rem",
        top: "64%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-12s",
        driftX: "1.6rem",
        driftY: "-0.7rem",
        duration: "26s",
        heightRatio: "0.68",
        left: "34%",
        opacity: 0.66,
        radius: "52% 48% 40% 60% / 63% 42% 58% 37%",
        rotate: "7deg",
        size: "2.4rem",
        top: "68%",
        variant: "small",
        zIndex: 1,
    },
    {
        delay: "-6s",
        driftX: "2rem",
        driftY: "-1.1rem",
        duration: "22s",
        heightRatio: "0.74",
        left: "47%",
        opacity: 0.8,
        radius: "60% 40% 46% 54% / 48% 57% 43% 52%",
        rotate: "-15deg",
        size: "5.8rem",
        top: "62%",
        variant: "medium",
        zIndex: 1,
    },
    {
        delay: "-9s",
        driftX: "2.3rem",
        driftY: "-1.3rem",
        duration: "23s",
        heightRatio: "0.73",
        left: "63%",
        opacity: 0.82,
        radius: "46% 54% 61% 39% / 43% 58% 42% 57%",
        rotate: "13deg",
        size: "7.2rem",
        top: "68%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-15s",
        driftX: "1.2rem",
        driftY: "-0.8rem",
        duration: "30s",
        heightRatio: "0.67",
        left: "81%",
        opacity: 0.62,
        radius: "54% 46% 49% 51% / 51% 47% 53% 49%",
        rotate: "-9deg",
        size: "1.6rem",
        top: "60%",
        variant: "shard",
        zIndex: 1,
    },
] as const;

const ASTEROID_BELT_REINFORCEMENTS = [
    {
        delay: "-17s",
        driftX: "2.1rem",
        driftY: "-1.2rem",
        duration: "31s",
        heightRatio: "0.72",
        left: "2%",
        opacity: 0.76,
        radius: "51% 49% 63% 37% / 42% 57% 43% 58%",
        rotate: "21deg",
        size: "6.8rem",
        top: "78%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-20s",
        driftX: "1.3rem",
        driftY: "-0.7rem",
        duration: "36s",
        heightRatio: "0.64",
        left: "9%",
        opacity: 0.58,
        radius: "58% 42% 48% 52% / 60% 39% 61% 40%",
        rotate: "-7deg",
        size: "2.8rem",
        top: "88%",
        variant: "small",
        zIndex: 1,
    },
    {
        delay: "-19s",
        driftX: "1.8rem",
        driftY: "1rem",
        duration: "34s",
        heightRatio: "0.7",
        left: "17%",
        opacity: 0.66,
        radius: "46% 54% 57% 43% / 47% 59% 41% 53%",
        rotate: "12deg",
        size: "3.6rem",
        top: "38%",
        variant: "medium",
        zIndex: 1,
    },
    {
        delay: "-22s",
        driftX: "2rem",
        driftY: "-0.9rem",
        duration: "32s",
        heightRatio: "0.74",
        left: "24%",
        opacity: 0.72,
        radius: "60% 40% 52% 48% / 38% 58% 42% 62%",
        rotate: "-26deg",
        size: "7.8rem",
        top: "76%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-18s",
        driftX: "1rem",
        driftY: "-0.5rem",
        duration: "38s",
        heightRatio: "0.66",
        left: "31%",
        opacity: 0.54,
        radius: "44% 56% 61% 39% / 55% 44% 56% 45%",
        rotate: "18deg",
        size: "2.1rem",
        top: "31%",
        variant: "shard",
        zIndex: 1,
    },
    {
        delay: "-23s",
        driftX: "2.4rem",
        driftY: "1.3rem",
        duration: "29s",
        heightRatio: "0.78",
        left: "39%",
        opacity: 0.78,
        radius: "53% 47% 65% 35% / 49% 41% 59% 51%",
        rotate: "-18deg",
        size: "8.6rem",
        top: "73%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-16s",
        driftX: "1.5rem",
        driftY: "-0.7rem",
        duration: "35s",
        heightRatio: "0.69",
        left: "49%",
        opacity: 0.68,
        radius: "47% 53% 42% 58% / 61% 43% 57% 39%",
        rotate: "9deg",
        size: "4.2rem",
        top: "46%",
        variant: "medium",
        zIndex: 1,
    },
    {
        delay: "-24s",
        driftX: "1.2rem",
        driftY: "0.8rem",
        duration: "37s",
        heightRatio: "0.62",
        left: "57%",
        opacity: 0.5,
        radius: "55% 45% 50% 50% / 46% 54% 49% 51%",
        rotate: "-3deg",
        size: "1.9rem",
        top: "25%",
        variant: "shard",
        zIndex: 1,
    },
    {
        delay: "-21s",
        driftX: "2rem",
        driftY: "-1.1rem",
        duration: "33s",
        heightRatio: "0.71",
        left: "71%",
        opacity: 0.73,
        radius: "61% 39% 49% 51% / 44% 62% 38% 56%",
        rotate: "23deg",
        size: "6.2rem",
        top: "80%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-18s",
        driftX: "1.4rem",
        driftY: "-0.8rem",
        duration: "36s",
        heightRatio: "0.68",
        left: "75%",
        opacity: 0.62,
        radius: "45% 55% 58% 42% / 51% 44% 56% 49%",
        rotate: "-12deg",
        size: "3.4rem",
        top: "66%",
        variant: "medium",
        zIndex: 1,
    },
    {
        delay: "-25s",
        driftX: "2.2rem",
        driftY: "1.2rem",
        duration: "30s",
        heightRatio: "0.76",
        left: "88%",
        opacity: 0.8,
        radius: "57% 43% 62% 38% / 40% 59% 41% 60%",
        rotate: "15deg",
        size: "8.8rem",
        top: "72%",
        variant: "large",
        zIndex: 1,
    },
    {
        delay: "-19s",
        driftX: "1rem",
        driftY: "-0.6rem",
        duration: "39s",
        heightRatio: "0.65",
        left: "96%",
        opacity: 0.56,
        radius: "49% 51% 43% 57% / 54% 46% 55% 45%",
        rotate: "-19deg",
        size: "2.7rem",
        top: "28%",
        variant: "small edge",
        zIndex: 1,
    },
] as const;

const ASTEROID_FOREGROUND_BOULDERS = [
    {
        delay: "-12s",
        driftX: "3.4rem",
        driftY: "-1.4rem",
        duration: "26s",
        heightRatio: "0.72",
        left: "-7%",
        opacity: 0.88,
        radius: "55% 45% 67% 33% / 41% 62% 38% 59%",
        rotate: "-20deg",
        size: "34rem",
        top: "76%",
        variant: "colossal foreground edge",
        zIndex: 2,
    },
    {
        delay: "-15s",
        driftX: "2.8rem",
        driftY: "1.6rem",
        duration: "28s",
        heightRatio: "0.7",
        left: "31%",
        opacity: 0.82,
        radius: "47% 53% 58% 42% / 54% 37% 63% 46%",
        rotate: "16deg",
        size: "17rem",
        top: "86%",
        variant: "giant foreground",
        zIndex: 2,
    },
    {
        delay: "-18s",
        driftX: "3rem",
        driftY: "-1.2rem",
        duration: "24s",
        heightRatio: "0.76",
        left: "67%",
        opacity: 0.86,
        radius: "63% 37% 51% 49% / 38% 58% 42% 62%",
        rotate: "-9deg",
        size: "20rem",
        top: "78%",
        variant: "giant foreground",
        zIndex: 2,
    },
    {
        delay: "-10s",
        driftX: "2.5rem",
        driftY: "1rem",
        duration: "25s",
        heightRatio: "0.73",
        left: "86%",
        opacity: 0.9,
        radius: "44% 56% 64% 36% / 52% 39% 61% 48%",
        rotate: "17deg",
        size: "18rem",
        top: "35%",
        variant: "giant foreground",
        zIndex: 2,
    },
    {
        delay: "-14s",
        driftX: "3.6rem",
        driftY: "-1.8rem",
        duration: "23s",
        heightRatio: "0.68",
        left: "98%",
        opacity: 0.84,
        radius: "58% 42% 47% 53% / 44% 56% 45% 55%",
        rotate: "-24deg",
        size: "38rem",
        top: "-5%",
        variant: "colossal foreground edge",
        zIndex: 2,
    },
    {
        delay: "-20s",
        driftX: "2.7rem",
        driftY: "-1.1rem",
        duration: "27s",
        heightRatio: "0.74",
        left: "15%",
        opacity: 0.82,
        radius: "62% 38% 55% 45% / 39% 61% 42% 58%",
        rotate: "-13deg",
        size: "24rem",
        top: "-3%",
        variant: "giant foreground edge",
        zIndex: 2,
    },
    {
        delay: "-22s",
        driftX: "3.1rem",
        driftY: "1.4rem",
        duration: "29s",
        heightRatio: "0.7",
        left: "50%",
        opacity: 0.76,
        radius: "48% 52% 66% 34% / 56% 39% 61% 44%",
        rotate: "10deg",
        size: "14.5rem",
        top: "93%",
        variant: "giant foreground edge",
        zIndex: 2,
    },
    {
        delay: "-16s",
        driftX: "2.4rem",
        driftY: "-1rem",
        duration: "30s",
        heightRatio: "0.77",
        left: "101%",
        opacity: 0.86,
        radius: "51% 49% 60% 40% / 43% 57% 40% 60%",
        rotate: "24deg",
        size: "30rem",
        top: "62%",
        variant: "colossal foreground edge",
        zIndex: 2,
    },
    {
        delay: "-26s",
        driftX: "2.8rem",
        driftY: "-1.2rem",
        duration: "34s",
        heightRatio: "0.72",
        left: "-16%",
        opacity: 0.78,
        radius: "49% 51% 70% 30% / 42% 58% 39% 61%",
        rotate: "11deg",
        size: "46rem",
        top: "14%",
        variant: "colossal foreground edge",
        zIndex: 2,
    },
    {
        delay: "-28s",
        driftX: "2.4rem",
        driftY: "1.1rem",
        duration: "36s",
        heightRatio: "0.69",
        left: "73%",
        opacity: 0.72,
        radius: "61% 39% 48% 52% / 37% 63% 42% 58%",
        rotate: "-18deg",
        size: "33rem",
        top: "-15%",
        variant: "colossal foreground edge",
        zIndex: 2,
    },
] as const;

const mirrorPercent = (value: string) => `${100 - Number(value.replace("%", ""))}%`;

const FULL_SCREEN_WARP_STREAKS = [
    ...WARP_STREAKS,
    ...WARP_STREAKS.map((warp, index) => ({
        ...warp,
        delay: `${Number(warp.delay.replace("s", "")) - 0.85}s`,
        left: `${(Number(warp.left.replace("%", "")) + 6 + index * 3) % 100}%`,
        opacity: Math.max(0.42, warp.opacity - 0.16),
        top: mirrorPercent(warp.top),
        width: `calc(${warp.width} * 0.86)`,
    })),
    ...WARP_STARS.slice(0, 8).map((star, index) => ({
        delay: `${Number(star.delay.replace("s", "")) - 1.35}s`,
        duration: star.duration,
        height: index % 2 ? "1px" : "2px",
        left: `${(Number(star.left.replace("%", "")) + 11) % 100}%`,
        opacity: Math.min(0.86, star.opacity + 0.08),
        top: `${8 + index * 11}%`,
        width: `${7 + index * 1.4}rem`,
    })),
] as const;

const FULL_SCREEN_WARP_STARS = [
    ...WARP_STARS,
    ...WARP_STARS.map((star, index) => ({
        ...star,
        delay: `${Number(star.delay.replace("s", "")) - 0.7}s`,
        left: `${(Number(star.left.replace("%", "")) + 8 + index * 2) % 100}%`,
        opacity: Math.max(0.36, star.opacity - 0.1),
        size: `calc(${star.size} * 0.78)`,
        top: mirrorPercent(star.top),
    })),
] as const;

const FULL_SCREEN_ASTEROID_FIELD = [
    ...ASTEROID_FIELD,
    ...ASTEROID_BELT_REINFORCEMENTS,
    ...ASTEROID_FOREGROUND_BOULDERS,
    ...ASTEROID_FIELD.map((asteroid, index) => ({
        ...asteroid,
        delay: `${Number(asteroid.delay.replace("s", "")) - 4.2}s`,
        driftX: `calc(${asteroid.driftX} * -0.72)`,
        driftY: `calc(${asteroid.driftY} * 0.82)`,
        left: `${(Number(asteroid.left.replace("%", "")) + 9 + index * 5) % 104 - 4}%`,
        opacity: Math.max(0.36, asteroid.opacity - 0.28),
        rotate: `calc(${asteroid.rotate} + 27deg)`,
        size: `calc(${asteroid.size} * 0.56)`,
        top: mirrorPercent(asteroid.top),
        variant: `${asteroid.variant} distant still`,
        zIndex: 0,
    })),
    ...ASTEROID_BELT_REINFORCEMENTS.map((asteroid, index) => ({
        ...asteroid,
        delay: `${Number(asteroid.delay.replace("s", "")) - 7.6}s`,
        driftX: `calc(${asteroid.driftX} * -0.58)`,
        driftY: `calc(${asteroid.driftY} * -0.64)`,
        left: `${(Number(asteroid.left.replace("%", "")) + 17 + index * 7) % 110 - 5}%`,
        opacity: Math.max(0.34, asteroid.opacity - 0.22),
        rotate: `calc(${asteroid.rotate} - 33deg)`,
        size: `calc(${asteroid.size} * 0.72)`,
        top: `${(Number(mirrorPercent(asteroid.top).replace("%", "")) + index * 3) % 102 - 1}%`,
        variant: `${asteroid.variant} distant still`,
        zIndex: 0,
    })),
] as const;

const ASTEROID_PALETTES = [
    {
        crater: "rgba(4, 5, 6, 0.34)",
        highlight: "rgba(220, 225, 220, 0.1)",
        shadow: "rgba(2, 3, 4, 0.52)",
        shellEnd: "#17191a",
        shellMid: "#343433",
        shellStart: "#62605a",
    },
    {
        crater: "rgba(42, 27, 18, 0.3)",
        highlight: "rgba(255, 224, 188, 0.18)",
        shadow: "rgba(49, 30, 19, 0.42)",
        shellEnd: "#463124",
        shellMid: "#8d674d",
        shellStart: "#c19a75",
    },
    {
        crater: "rgba(20, 24, 28, 0.28)",
        highlight: "rgba(230, 238, 242, 0.2)",
        shadow: "rgba(9, 13, 17, 0.42)",
        shellEnd: "#32373c",
        shellMid: "#707983",
        shellStart: "#aeb7bd",
    },
] as const;

const ASTEROID_SHAPES = [
    "polygon(10% 32%, 22% 9%, 48% 3%, 74% 12%, 96% 38%, 88% 68%, 62% 95%, 28% 86%, 3% 58%)",
    "polygon(7% 42%, 18% 16%, 44% 2%, 72% 9%, 92% 28%, 98% 58%, 78% 86%, 46% 96%, 18% 78%)",
    "polygon(14% 22%, 38% 5%, 64% 8%, 88% 24%, 96% 52%, 82% 76%, 54% 92%, 25% 88%, 5% 60%)",
    "polygon(4% 28%, 30% 8%, 58% 5%, 86% 18%, 98% 44%, 90% 72%, 64% 84%, 42% 98%, 16% 80%)",
    "polygon(13% 14%, 42% 3%, 78% 14%, 94% 40%, 84% 72%, 56% 88%, 24% 94%, 3% 56%)",
] as const;

type WarpStreak = {
    delay: string;
    duration: string;
    height: string;
    left: string;
    opacity: number;
    top: string;
    width: string;
};

type WarpStar = {
    delay: string;
    duration: string;
    left: string;
    opacity: number;
    size: string;
    top: string;
};

type AsteroidRock = {
    delay: string;
    driftX: string;
    driftY: string;
    duration: string;
    heightRatio: string;
    left: string;
    opacity: number;
    radius: string;
    rotate: string;
    size: string;
    top: string;
    variant: string;
    zIndex: number;
};

const visibleAsteroid = (asteroid: AsteroidRock) =>
    !asteroid.variant.includes("small") && !asteroid.variant.includes("shard");

const freezeAsteroid = (asteroid: AsteroidRock): AsteroidRock => ({
    ...asteroid,
    duration: "60s",
    variant: `${asteroid.variant} still`,
});

const BALANCED_ASTEROID_FIELD: readonly AsteroidRock[] = [
    ...ASTEROID_FOREGROUND_BOULDERS,
    ...ASTEROID_FIELD.filter(visibleAsteroid),
    ...ASTEROID_BELT_REINFORCEMENTS.filter(visibleAsteroid).slice(0, 8),
];

const REDUCED_ASTEROID_FIELD: readonly AsteroidRock[] = [
    ...[
        ASTEROID_FOREGROUND_BOULDERS[0],
        ASTEROID_FOREGROUND_BOULDERS[3],
        ASTEROID_FOREGROUND_BOULDERS[4],
        ASTEROID_FOREGROUND_BOULDERS[8],
        ASTEROID_FOREGROUND_BOULDERS[9],
    ].map(freezeAsteroid),
    ...ASTEROID_FIELD.filter(visibleAsteroid).slice(0, 10).map(freezeAsteroid),
    ...ASTEROID_BELT_REINFORCEMENTS.filter(visibleAsteroid).slice(0, 5).map(freezeAsteroid),
];

const ASTEROID_FIELD_BY_TIER: Record<ScenePerformanceTier, readonly AsteroidRock[]> = {
    balanced: BALANCED_ASTEROID_FIELD,
    reduced: REDUCED_ASTEROID_FIELD,
    rich: FULL_SCREEN_ASTEROID_FIELD,
};

const WARP_STREAKS_BY_TIER: Record<ScenePerformanceTier, readonly WarpStreak[]> = {
    balanced: FULL_SCREEN_WARP_STREAKS.slice(0, 18),
    reduced: WARP_STREAKS.slice(0, 8),
    rich: FULL_SCREEN_WARP_STREAKS,
};

const WARP_STARS_BY_TIER: Record<ScenePerformanceTier, readonly WarpStar[]> = {
    balanced: FULL_SCREEN_WARP_STARS.slice(0, 18),
    reduced: WARP_STARS.slice(0, 8),
    rich: FULL_SCREEN_WARP_STARS,
};

const getWarpStyle = (warp: WarpStreak) =>
    ({
        "--warp-delay": warp.delay,
        "--warp-duration": warp.duration,
        "--warp-height": warp.height,
        "--warp-left": warp.left,
        "--warp-opacity": warp.opacity,
        "--warp-top": warp.top,
        "--warp-width": warp.width,
    }) as CSSProperties;

const getWarpStarStyle = (star: WarpStar) =>
    ({
        "--warp-star-delay": star.delay,
        "--warp-star-duration": star.duration,
        "--warp-star-left": star.left,
        "--warp-star-opacity": star.opacity,
        "--warp-star-size": star.size,
        "--warp-star-top": star.top,
    }) as CSSProperties;

const getAsteroidStyle = (asteroid: AsteroidRock, index: number) => {
    const palette = ASTEROID_PALETTES[index % ASTEROID_PALETTES.length];

    return {
        "--asteroid-delay": asteroid.delay,
        "--asteroid-drift-x": asteroid.driftX,
        "--asteroid-drift-y": asteroid.driftY,
        "--asteroid-duration": asteroid.duration,
        "--asteroid-height-ratio": asteroid.heightRatio,
        "--asteroid-left": asteroid.left,
        "--asteroid-opacity": asteroid.opacity,
        "--asteroid-radius": asteroid.radius,
        "--asteroid-rotate": asteroid.rotate,
        "--asteroid-clip-path": ASTEROID_SHAPES[index % ASTEROID_SHAPES.length],
        "--asteroid-crater": palette.crater,
        "--asteroid-highlight": palette.highlight,
        "--asteroid-shadow": palette.shadow,
        "--asteroid-shell-end": palette.shellEnd,
        "--asteroid-shell-mid": palette.shellMid,
        "--asteroid-shell-start": palette.shellStart,
        "--asteroid-size": asteroid.size,
        "--asteroid-top": asteroid.top,
        "--asteroid-z-index": asteroid.zIndex,
    } as CSSProperties;
};

export const StarsBackground = memo(({ theme }: StarsBackgroundProps) => {
    const { tier } = useScenePerformanceProfile();
    const asteroidField = ASTEROID_FIELD_BY_TIER[tier];
    const warpStreaks = WARP_STREAKS_BY_TIER[tier];
    const warpStars = WARP_STARS_BY_TIER[tier];

    return (
        <SpaceContainer $performanceTier={tier} $theme={theme} aria-hidden="true">
            {theme === "space" ? (
                <>
                    <span className="space-nebula space-nebula-left" />
                    <span className="space-nebula space-nebula-right" />
                    <span className="space-depth-grid" />
                </>
            ) : null}

            {theme === "space"
                ? warpStreaks.map((warp, index) => (
                      <span className="warp-streak" key={`warp-streak-${index}`} style={getWarpStyle(warp)} />
                  ))
                : null}

            {theme === "space"
                ? warpStars.map((star, index) => (
                      <span className="warp-star" key={`warp-star-${index}`} style={getWarpStarStyle(star)} />
                  ))
                : null}

            {theme === "asteroids" ? (
                <>
                    <span className="asteroid-pebble-field asteroid-pebble-field-back" />
                    {tier !== "reduced" ? <span className="asteroid-pebble-field asteroid-pebble-field-mid" /> : null}
                    {tier === "rich" ? <span className="asteroid-pebble-field asteroid-pebble-field-front" /> : null}
                    <span className="asteroid-dust asteroid-dust-near" />
                    {tier !== "reduced" ? <span className="asteroid-dust asteroid-dust-far" /> : null}
                </>
            ) : null}

            {theme === "asteroids"
                ? asteroidField.map((asteroid, index) => (
                      <span
                          className={`asteroid-field-rock ${asteroid.variant}`}
                          key={`asteroid-${index}`}
                          style={getAsteroidStyle(asteroid, index)}
                      />
                  ))
                : null}
        </SpaceContainer>
    );
});
