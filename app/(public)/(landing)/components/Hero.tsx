"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, Text } from "@/src/components/ui";
import { PORTFOLIO_DATA } from "../../../../src/lib/data";

export default function Hero() {
  const D = PORTFOLIO_DATA;
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Date().toLocaleTimeString("en-US", opts));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="shell"
      style={{ paddingTop: 140, paddingBottom: 80, position: "relative" }}
    >
      {/* Top meta row */}
      <div
        className="reveal"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 60,
          borderBottom: "1px solid var(--line)",
          marginBottom: 60,
        }}
      >
        <Text variant="mono" muted>
          PORTFOLIO · 2024 - 2026
        </Text>
        <Text variant="mono" muted style={{ display: "flex", gap: 24 }}>
          <span>HCM · {time}</span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#7AFFB8",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#7AFFB8",
                boxShadow: "0 0 12px #7AFFB8",
              }}
            />
            AVAILABLE
          </span>
        </Text>
      </div>

      {/* Display name */}
      <div className="w-full flex justify-between">
        <div className="w-fit flex flex-col justify-between">
          <div className="reveal">
            <Text variant="eyebrow" style={{ marginBottom: 28 }}>
              ◍ Front-end Developer · Design Engineer
            </Text>
            <Text
              variant="h-display"
              as="h1"
              style={{ margin: 0, fontWeight: 500 }}
            >
              <span style={{ display: "block" }}>Hoang Anh</span>
              <span style={{ color: "var(--accent)" }}>Luong.</span>
            </Text>
          </div>

          <div className="reveal flex flex-col gap-10 mt-20">
            <Text variant="body" style={{ maxWidth: 460, marginTop: 0 }}>
              {D.identity.tagline} I work across the seam between design and
              engineering - building tools, design systems, and the occasional
              shader.
            </Text>

            {/* Stats card */}
            <Card style={{ padding: 28 }}>
              <Text variant="mono" muted style={{ marginBottom: 12 }}>
                - FOCUS
              </Text>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  lineHeight: 1.35,
                  marginBottom: 18,
                }}
              >
                Domain-focused
                <br />
                and patient.
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--fg-muted)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Three or four problems a year, gone deep. The shape of the work
                matters more than the headcount.
              </p>
            </Card>
          </div>
        </div>

        <div className="flex h-full justify-start w-fit items-end gap-2">
          {/* YoE */}
          <div className="text-right translate-x-[40%] ">
            <div
              className="text-[80px] font-extralight leading-none tracking-[-0.04em] text-[var(--fg)]"
              style={{
                fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans')",
              }}
            >
              +3
              <span className="text-[30px] font-light text-[var(--accent)] ml-1.5">
                YoE
              </span>
            </div>
            <div className=" text-[13px] text-[var(--fg-muted)] mt-2 leading-[1.7] ml-auto">
              Worked & collaborated with two-dozen
              <br />
              teams across four time zones.
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <Image
              src="/images/portrait-img.png"
              alt="Hoang Anh Luong"
              width={572}
              height={300}
              unoptimized
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      {/* Lower content */}
    </section>
  );
}
