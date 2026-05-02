import PortfolioChrome from "../../../src/components/PortfolioChrome";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortfolioChrome>{children}</PortfolioChrome>;
}
