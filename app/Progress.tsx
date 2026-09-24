"use client";

import { useEffect, useRef, useState } from "react";
import { ProgressCircle } from "@/components/ui/progress-circle";

export function Progress({ timeChoosed }: any) {
  const [iSplay, setIsPlay] = useState(false);
  const timeChoosedSec = timeChoosed * 60;
  const btnAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const doneRef = useRef<HTMLAudioElement | null>(null);

  const [currentTime, setCurrentTime] = useState(timeChoosedSec);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    btnAudioRef.current = new Audio("/btn.wav");
    doneRef.current = new Audio("/done.mp3");

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      btnAudioRef.current = null;
      musicRef.current?.pause();
      doneRef.current = null;
    };
  }, []);
  function startCountDown(seconds: number) {
    let counter = seconds;

    intervalRef.current = setInterval(() => {
      counter--;
      setCurrentTime(counter);

      if (counter <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        void doneRef.current?.play().catch(() => undefined);
        musicRef.current?.pause();

        intervalRef.current = null;
        setCurrentTime(timeChoosed * 60);
        setIsPlay(false);
        return;
      }
    }, 1000);
  }

  const handlePlay = () => {
    if (!iSplay) startCountDown(currentTime);
    else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlay(!iSplay);
    void btnAudioRef.current?.play().catch(() => undefined);
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCurrentTime(timeChoosed * 60);
    setIsPlay(false);
    void btnAudioRef.current?.play().catch(() => undefined);
  };

  function format(seconds: number) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min}:${String(sec).padStart(2, "0")}`;
  }
  const progress = ((timeChoosedSec - currentTime) / timeChoosedSec) * 100;

  return (
    <div className="m-auto flex text-[#fbf3d1] min-w-56 flex-col items-center justify-center gap-y-6">
      <audio ref={musicRef} src="/onmyway.mp3" preload="auto" loop />
      <div className="relative size-70 ">
        <ProgressCircle
          className="size-full  "
          value={progress}
          isMoving={iSplay}
        />
        <h1 className=" text-black absolute inset-0 flex items-center justify-center text-5xl tracking-widest">
          {format(currentTime)}
        </h1>
      </div>
      <div className="flex text-lg gap-10 flex-row tracking-widest">
        <button
          onClick={handlePlay}
          className="relative border-none inline-block cursor-pointer "
        >
          <span className="absolute inset-0 rounded-xl bg-[#9d5021] translate-y-[5px]"></span>
          <span className="bg-[#D67941] relative inline-flex items-center justify-center p-2.5 sm:p-3 rounded-xl bg-primary-500 border border-[#c36d3a] transition-transform duration-75 active:translate-y-[5px] ">
            {iSplay ? <>Pause</> : <>Play</>}
          </span>
        </button>
        <button
          onClick={handleReset}
          className="relative border-none inline-block cursor-pointer "
        >
          <span className="absolute inset-0 rounded-xl bg-[#9d5021] translate-y-[5px]"></span>
          <span className="bg-[#D67941] relative inline-flex items-center justify-center p-2.5 sm:p-3 rounded-xl bg-primary-500 border border-[#c36d3a] transition-transform duration-75 active:translate-y-[5px] ">
            RESET
          </span>
        </button>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-3 cursor-pointer"
        height={20}
        onClick={() => {
          const nextSound = !sound;

          if (nextSound) {
            void musicRef.current?.play();
          } else {
            musicRef.current?.pause();
          }

          setSound(nextSound);
        }}
        viewBox="0 0 640 640"
      >
        {!sound ? (
          <path
            fill="rgb(0, 0, 0)"
            d="M80 416L128 416L262.1 535.2C268.5 540.9 276.7 544 285.2 544C304.4 544 320 528.4 320 509.2L320 130.8C320 111.6 304.4 96 285.2 96C276.7 96 268.5 99.1 262.1 104.8L128 224L80 224C53.5 224 32 245.5 32 272L32 368C32 394.5 53.5 416 80 416zM399 239C389.6 248.4 389.6 263.6 399 272.9L446 319.9L399 366.9C389.6 376.3 389.6 391.5 399 400.8C408.4 410.1 423.6 410.2 432.9 400.8L479.9 353.8L526.9 400.8C536.3 410.2 551.5 410.2 560.8 400.8C570.1 391.4 570.2 376.2 560.8 366.9L513.8 319.9L560.8 272.9C570.2 263.5 570.2 248.3 560.8 239C551.4 229.7 536.2 229.6 526.9 239L479.9 286L432.9 239C423.5 229.6 408.3 229.6 399 239z"
          />
        ) : (
          <path
            fill="rgb(0, 0, 0)"
            d="M112 416L160 416L294.1 535.2C300.5 540.9 308.7 544 317.2 544C336.4 544 352 528.4 352 509.2L352 130.8C352 111.6 336.4 96 317.2 96C308.7 96 300.5 99.1 294.1 104.8L160 224L112 224C85.5 224 64 245.5 64 272L64 368C64 394.5 85.5 416 112 416zM505.1 171C494.8 162.6 479.7 164.2 471.3 174.5C462.9 184.8 464.5 199.9 474.8 208.3C507.3 234.7 528 274.9 528 320C528 365.1 507.3 405.3 474.8 431.8C464.5 440.2 463 455.3 471.3 465.6C479.6 475.9 494.8 477.4 505.1 469.1C548.3 433.9 576 380.2 576 320.1C576 260 548.3 206.3 505.1 171.1zM444.6 245.5C434.3 237.1 419.2 238.7 410.8 249C402.4 259.3 404 274.4 414.3 282.8C425.1 291.6 432 305 432 320C432 335 425.1 348.4 414.3 357.3C4.6C466.1 376.9 480 350.1 480 320C480 289.9 466.1 263.1 444.5 245.5z"
          />
        )}
      </svg>
    </div>
  );
}
