"use client";

import { useState } from "react";
import { Button, Input, Text } from "@/src/components/ui";

export default function BlogFooter() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <section className="shell" style={{ paddingBottom: 120 }}>
      <div
        className="reveal"
        style={{
          padding: 60,
          borderRadius: "var(--radius)",
          background: "var(--surface-2)",
          border: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.015em",
              lineHeight: 1.1,
            }}
          >
            Get new posts in your inbox.
          </h3>
          <Text
            variant="body"
            style={{ marginTop: 12, marginBottom: 0, maxWidth: 520 }}
          >
            One email when something new goes up. No tracking, no other lists,
            easy unsubscribe.
          </Text>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubscribed(true);
          }}
          style={{ display: "flex", gap: 8 }}
        >
          <Input
            type="email"
            placeholder="you@somewhere.com"
            required
            style={{
              height: 56,
              width: 280,
              padding: "0 18px",
              borderRadius: 10,
              fontSize: 14,
            }}
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            style={{ padding: "0 28px", fontSize: 15 }}
            iconPosition="right"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </form>
        {isSubscribed && (
          <Text variant="body" style={{ margin: "8px 0 0", width: "100%" }}>
            You are subscribed. This is currently a local placeholder flow.
          </Text>
        )}
      </div>
    </section>
  );
}
