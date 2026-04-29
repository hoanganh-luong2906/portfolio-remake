import PortfolioChrome from "../../src/components/PortfolioChrome";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortfolioChrome>{children}</PortfolioChrome>;
}
