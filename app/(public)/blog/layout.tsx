import PortfolioChrome from "../../../src/components/PortfolioChrome";

export const metadata = { title: "Blog" };

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortfolioChrome>{children}</PortfolioChrome>;
}
