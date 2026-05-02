import type { ArtKind } from "../../lib/data";

interface ProjectArtProps {
  kind: ArtKind;
  animated?: boolean;
}

export default function ProjectArt({ kind, animated = true }: ProjectArtProps) {
  switch (kind) {
    case "loom":
      return <LoomArt animated={animated} />;
    case "helix":
      return <HelixArt animated={animated} />;
    case "atlas":
      return <AtlasArt animated={animated} />;
    case "tessera":
      return <TesseraArt animated={animated} />;
    case "pulse":
      return <PulseArt animated={animated} />;
    default:
      return <DefaultArt />;
  }
}

function LoomArt({ animated }: { animated: boolean }) {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="loomBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1d14" />
          <stop offset="100%" stopColor="#0f100b" />
        </linearGradient>
        <linearGradient id="loomLime" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E8FF5C" />
          <stop offset="100%" stopColor="#B8FF20" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#loomBg)" />
      {Array.from({ length: 16 }).map((_, i) => (
        <line
          key={i}
          x1={i * 50}
          y1="0"
          x2={i * 50}
          y2="500"
          stroke="rgba(255,255,255,0.04)"
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1={i * 50}
          x2="800"
          y2={i * 50}
          stroke="rgba(255,255,255,0.04)"
        />
      ))}
      <g transform="translate(60, 320)">
        <rect
          x="0"
          y="0"
          width="680"
          height="32"
          rx="6"
          fill="rgba(255,255,255,0.05)"
        />
        <rect
          x="20"
          y="6"
          width="180"
          height="20"
          rx="4"
          fill="url(#loomLime)"
          opacity="0.95"
        />
        <rect
          x="220"
          y="6"
          width="120"
          height="20"
          rx="4"
          fill="rgba(232,255,92,0.4)"
        />
        <rect
          x="0"
          y="44"
          width="680"
          height="32"
          rx="6"
          fill="rgba(255,255,255,0.05)"
        />
        <rect
          x="60"
          y="50"
          width="240"
          height="20"
          rx="4"
          fill="rgba(255,255,255,0.55)"
        />
        <rect
          x="320"
          y="50"
          width="80"
          height="20"
          rx="4"
          fill="rgba(255,255,255,0.25)"
        />
        <rect
          x="0"
          y="88"
          width="680"
          height="32"
          rx="6"
          fill="rgba(255,255,255,0.05)"
        />
        <rect
          x="100"
          y="94"
          width="320"
          height="20"
          rx="4"
          fill="rgba(232,255,92,0.7)"
        />
      </g>
      <g>
        <line
          x1="280"
          y1="40"
          x2="280"
          y2="460"
          stroke="#E8FF5C"
          strokeWidth="1.5"
        />
        <polygon points="270,40 290,40 280,52" fill="#E8FF5C" />
        {animated && (
          <animate
            attributeName="opacity"
            values="1;0.6;1"
            dur="1.6s"
            repeatCount="indefinite"
          />
        )}
      </g>
      <g transform="translate(420, 130)">
        <rect
          x="0"
          y="0"
          width="180"
          height="120"
          rx="14"
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(232,255,92,0.5)"
        />
        <circle cx="90" cy="60" r="36" fill="url(#loomLime)" opacity="0.9" />
        {animated && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="420,130; 430,120; 420,130"
            dur="6s"
            repeatCount="indefinite"
          />
        )}
      </g>
      <g transform="translate(60, 60)">
        <rect
          width="100"
          height="26"
          rx="6"
          fill="rgba(232,255,92,0.15)"
          stroke="rgba(232,255,92,0.4)"
        />
        <text
          x="50"
          y="17"
          textAnchor="middle"
          fill="#E8FF5C"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          letterSpacing="1"
        >
          EDITOR.TSX
        </text>
      </g>
    </svg>
  );
}

function HelixArt({ animated: _animated }: { animated: boolean }) {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="helixBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#221814" />
          <stop offset="100%" stopColor="#120e0c" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#helixBg)" />
      <g transform="translate(80, 80)">
        <rect x="0" y="0" width="120" height="40" rx="8" fill="#FFB37A" />
        <rect
          x="140"
          y="0"
          width="120"
          height="40"
          rx="8"
          fill="rgba(255,255,255,0.10)"
          stroke="rgba(255,255,255,0.20)"
        />
        <rect
          x="280"
          y="0"
          width="120"
          height="40"
          rx="20"
          fill="rgba(255,179,122,0.20)"
          stroke="#FFB37A"
        />
        <rect
          x="420"
          y="0"
          width="120"
          height="40"
          rx="8"
          fill="transparent"
          stroke="rgba(255,255,255,0.30)"
          strokeDasharray="4 3"
        />
        <rect
          x="0"
          y="60"
          width="260"
          height="44"
          rx="10"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.15)"
        />
        <rect
          x="14"
          y="76"
          width="80"
          height="12"
          rx="3"
          fill="rgba(255,255,255,0.45)"
        />
        <rect
          x="280"
          y="60"
          width="260"
          height="44"
          rx="10"
          fill="rgba(255,255,255,0.05)"
          stroke="#FFB37A"
        />
        <rect x="294" y="76" width="120" height="12" rx="3" fill="#FFB37A" />
        <g transform="translate(0, 130)">
          <rect
            width="260"
            height="170"
            rx="14"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.10)"
          />
          <circle cx="40" cy="40" r="22" fill="#FFB37A" />
          <rect
            x="76"
            y="28"
            width="120"
            height="10"
            rx="2"
            fill="rgba(255,255,255,0.7)"
          />
          <rect
            x="76"
            y="46"
            width="80"
            height="8"
            rx="2"
            fill="rgba(255,255,255,0.30)"
          />
          <rect
            x="20"
            y="84"
            width="220"
            height="6"
            rx="2"
            fill="rgba(255,255,255,0.15)"
          />
          <rect
            x="20"
            y="98"
            width="180"
            height="6"
            rx="2"
            fill="rgba(255,255,255,0.15)"
          />
          <rect
            x="20"
            y="112"
            width="200"
            height="6"
            rx="2"
            fill="rgba(255,255,255,0.10)"
          />
          <rect x="20" y="138" width="80" height="22" rx="6" fill="#FFB37A" />
        </g>
        <g transform="translate(280, 130)">
          <rect
            width="260"
            height="170"
            rx="14"
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.08)"
          />
          <text
            x="20"
            y="34"
            fill="rgba(255,255,255,0.55)"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1.5"
          >
            - color tokens
          </text>
          {(
            [
              ["#FFB37A", "ember/500"],
              ["#FFD9BD", "ember/200"],
              ["#7A3A18", "ember/900"],
              ["#1A1413", "neutral/950"],
              ["#E8E4E1", "neutral/100"],
            ] as [string, string][]
          ).map(([color, name], i) => (
            <g key={i} transform={`translate(20, ${50 + i * 22})`}>
              <rect width="20" height="14" rx="3" fill={color} />
              <text
                x="30"
                y="11"
                fill="rgba(255,255,255,0.55)"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                {name}
              </text>
              <text
                x="180"
                y="11"
                fill="rgba(255,255,255,0.30)"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                {color.toUpperCase()}
              </text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

function AtlasArt({ animated }: { animated: boolean }) {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="atlasBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0e1620" />
          <stop offset="100%" stopColor="#070b11" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#atlasBg)" />
      <g stroke="rgba(140,180,255,0.18)" strokeWidth="1" fill="none">
        <path d="M0,180 C200,160 280,260 400,240 S700,180 800,220" />
        <path d="M0,280 C150,300 320,200 480,260 S700,360 800,320" />
        <path d="M0,80 C200,140 350,60 520,140 S700,90 800,130" />
        <path d="M0,400 C200,420 360,340 520,400 S720,420 800,380" />
      </g>
      <g stroke="rgba(140,180,255,0.35)" strokeWidth="1.5" fill="none">
        <path d="M-20,250 L820,250" strokeDasharray="2 6" />
        <path d="M120,-20 L120,520" strokeDasharray="2 6" />
        <path d="M520,-20 L520,520" strokeDasharray="2 6" />
      </g>
      <polygon
        points="280,150 480,140 520,260 380,320 240,260"
        fill="rgba(120,180,255,0.10)"
        stroke="#7AB8FF"
        strokeWidth="1.5"
      />
      {(
        [
          [280, 150],
          [480, 140],
          [520, 260],
          [380, 320],
          [240, 260],
        ] as [number, number][]
      ).map(([x, y], i) => (
        <g key={i}>
          <rect
            x={x - 5}
            y={y - 5}
            width="10"
            height="10"
            fill="#0e1620"
            stroke="#7AB8FF"
            strokeWidth="1.5"
          />
        </g>
      ))}
      <g transform="translate(420, 200)">
        <circle r="10" fill="#7AB8FF" opacity="0.25">
          {animated && (
            <animate
              attributeName="r"
              values="10;22;10"
              dur="2.5s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <circle r="6" fill="#7AB8FF" />
      </g>
      <g transform="translate(60, 60)">
        <rect
          width="160"
          height="28"
          rx="6"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(122,184,255,0.4)"
        />
        <text
          x="14"
          y="18"
          fill="#7AB8FF"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
        >
          40.7128° N · 74.0060° W
        </text>
      </g>
      <g transform="translate(560, 380)">
        <path
          d="M0,0 L0,20 L6,15 L10,22 L13,20 L9,13 L16,12 Z"
          fill="#fff"
          stroke="#0e1620"
          strokeWidth="0.5"
        />
      </g>
    </svg>
  );
}

function TesseraArt({ animated }: { animated: boolean }) {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="tesBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f1418" />
          <stop offset="100%" stopColor="#0e0a0c" />
        </linearGradient>
        <linearGradient id="tesRose" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF7A9E" />
          <stop offset="100%" stopColor="#FFB37A" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#tesBg)" />
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => {
          const x = col * 80 + (row % 2 ? 40 : 0);
          const y = row * 70;
          const rotate = (row * 17 + col * 13) % 360;
          const opacity = 0.15 + ((row * col) % 7) * 0.1;
          return (
            <g
              key={`${row}-${col}`}
              transform={`translate(${x}, ${y}) rotate(${rotate} 40 35)`}
            >
              <path
                d="M0,35 Q40,0 80,35 Q40,70 0,35 Z"
                fill="url(#tesRose)"
                opacity={opacity}
              />
            </g>
          );
        }),
      )}
      <g transform="translate(280, 160)">
        <rect
          width="240"
          height="180"
          rx="8"
          fill="rgba(0,0,0,0.5)"
          stroke="rgba(255,122,158,0.6)"
        />
        <path
          d="M0,90 Q120,0 240,90 Q120,180 0,90 Z"
          fill="url(#tesRose)"
          opacity="0.85"
        />
        <text
          x="120"
          y="105"
          textAnchor="middle"
          fill="#fff"
          fontSize="14"
          fontFamily="serif"
          fontStyle="italic"
          letterSpacing="3"
        >
          TESSERA №037
        </text>
      </g>
      {animated && (
        <g>
          <circle cx="120" cy="80" r="3" fill="#FF7A9E">
            <animate
              attributeName="cy"
              values="80;420;80"
              dur="9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      )}
    </svg>
  );
}

function PulseArt({ animated }: { animated: boolean }) {
  const labels = [
    "API · production",
    "CDN · global edge",
    "Auth service",
    "Webhook delivery",
    "Database (replica)",
    "Background jobs",
  ];
  const segments = 60;

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="pulseBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d1a14" />
          <stop offset="100%" stopColor="#070d0a" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#pulseBg)" />
      {labels.map((label, i) => {
        const y = 80 + i * 56;
        return (
          <g key={i} transform={`translate(80, ${y})`}>
            <text
              x="0"
              y="14"
              fill="rgba(255,255,255,0.78)"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              {label}
            </text>
            <text
              x="640"
              y="14"
              fill="#7AFFB8"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              textAnchor="end"
            >
              100.00%
            </text>
            <g transform="translate(0, 26)">
              {Array.from({ length: segments }).map((_, s) => {
                const isDown =
                  (i === 1 && s === 24) || (i === 3 && (s === 8 || s === 9));
                const isDeg = i === 4 && s === 40;
                return (
                  <rect
                    key={s}
                    x={s * 11}
                    y="0"
                    width="8"
                    height="18"
                    rx="2"
                    fill={isDown ? "#FF6B6B" : isDeg ? "#FFB37A" : "#7AFFB8"}
                    opacity={isDown || isDeg ? 1 : 0.7}
                  />
                );
              })}
            </g>
          </g>
        );
      })}
      <g transform="translate(80, 40)">
        <circle cx="6" cy="6" r="6" fill="#7AFFB8">
          {animated && (
            <animate
              attributeName="opacity"
              values="1;0.4;1"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <text
          x="20"
          y="11"
          fill="#fff"
          fontSize="13"
          fontFamily="ui-monospace, monospace"
          letterSpacing="2"
        >
          ALL SYSTEMS OPERATIONAL
        </text>
      </g>
    </svg>
  );
}

function DefaultArt() {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <rect width="800" height="500" fill="#1a1a1a" />
    </svg>
  );
}
