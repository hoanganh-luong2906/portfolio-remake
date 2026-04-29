import RevealObserver from "./RevealObserver";

export default function PortfolioChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grain">
      <div className="bg-layer" />
      {children}
      <RevealObserver />
    </div>
  );
}
