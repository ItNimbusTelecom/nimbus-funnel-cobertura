"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";

const VIDEO_URL = "";

export function VideoSection() {
  const { dictionary } = useI18n();
  const [placeholderMessage, setPlaceholderMessage] = useState("");
  const videoType = getVideoType(VIDEO_URL);

  function handlePlaceholderClick() {
    trackEvent("video_play_clicked", { status: "placeholder" });
    setPlaceholderMessage(dictionary.video.message);
  }

  function handleAvailableClick() {
    trackEvent("video_play_clicked", { status: "available" });
  }

  return (
    <section id="video" className="scroll-mt-24 bg-nimbus-soft py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">{dictionary.video.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            {dictionary.video.title}
          </h2>
          <p className="mt-4 text-lg font-bold leading-8 text-nimbus-ink">{dictionary.video.subtitle}</p>
          <div className="mt-5 space-y-4 text-lg leading-8 text-nimbus-muted">
            {dictionary.video.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#formulario"
              className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              {dictionary.video.studyCta}
            </a>
            <a
              href="#tarifas"
              className="rounded-full border border-nimbus-line bg-white px-5 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              {dictionary.video.plansCta}
            </a>
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-lg border border-nimbus-line bg-white shadow-soft">
            {videoType === "empty" ? (
              <button
                type="button"
                onClick={handlePlaceholderClick}
                aria-label={dictionary.video.aria}
                className="group grid aspect-video w-full place-items-center bg-white p-6 text-center transition hover:bg-orange-50"
              >
                <span className="grid size-20 place-items-center rounded-full bg-nimbus-orange text-white shadow-soft transition group-hover:bg-nimbus-orangeDark">
                  <span className="ml-1 h-0 w-0 border-y-[13px] border-l-[20px] border-y-transparent border-l-white" />
                </span>
                <span className="mt-5 block text-lg font-black text-nimbus-ink">{dictionary.video.pending}</span>
                <span className="mt-2 block text-sm font-bold text-nimbus-muted">{dictionary.video.pendingText}</span>
              </button>
            ) : null}

            {videoType === "iframe" ? (
              <iframe
                src={toEmbedUrl(VIDEO_URL)}
                title={dictionary.video.aria}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleAvailableClick}
              />
            ) : null}

            {videoType === "mp4" ? (
              <video
                className="aspect-video w-full bg-black"
                controls
                onPlay={handleAvailableClick}
                aria-label={dictionary.video.aria}
              >
                <source src={VIDEO_URL} type="video/mp4" />
              </video>
            ) : null}
          </div>

          {placeholderMessage ? (
            <p className="mt-3 rounded-lg bg-white p-3 text-sm font-bold text-nimbus-muted">{placeholderMessage}</p>
          ) : null}

          <p className="mt-4 text-sm leading-6 text-nimbus-muted">
            {dictionary.video.below}
          </p>
        </div>
      </div>
    </section>
  );
}

function getVideoType(url: string) {
  if (!url) {
    return "empty";
  }

  if (url.endsWith(".mp4")) {
    return "mp4";
  }

  if (url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com")) {
    return "iframe";
  }

  return "empty";
}

function toEmbedUrl(url: string) {
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split(/[?&]/)[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  if (url.includes("youtube.com/watch")) {
    const videoId = new URL(url).searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1]?.split(/[?&]/)[0];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
  }

  return url;
}
