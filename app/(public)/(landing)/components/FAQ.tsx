"use client";

import { useState } from "react";
import { Card, IconButton, Text } from "@/src/components/ui";
import { PORTFOLIO_DATA } from "../../../../src/lib/data";

export default function FAQ() {
  const D = PORTFOLIO_DATA;
  const [open, setOpen] = useState(0);

  return (
    <section className="shell" style={{ paddingTop: 60, paddingBottom: 120 }}>
      <div
        className="reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 60,
          alignItems: "start",
        }}
      >
        <div>
          <Text variant="eyebrow" style={{ marginBottom: 28 }}>
            ◍ FAQS
          </Text>
          <Text variant="h-section" style={{ margin: 0 }}>
            Common
            <br />
            questions.
          </Text>
          <Text variant="body" style={{ marginTop: 24, maxWidth: 360 }}>
            Most projects start with the same five questions. Here are honest
            answers. If yours isn&rsquo;t here, the email below works.
          </Text>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {D.faqs.map((f, i) => (
            <Card
              key={i}
              className={`faq-item ${open === i ? "open" : ""}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{ padding: 28 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {f.q}
                </h3>
                <IconButton size="md" className="faq-toggle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconButton>
              </div>
              <div className="faq-body">
                <Text variant="body" style={{ margin: 0, fontSize: 15 }}>
                  {f.a}
                </Text>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
