import { Text } from "./ui";

interface Props {
  label: string;
  children: React.ReactNode;
}

export default function SectionTitle({ label, children }: Props) {
  return (
    <>
      <Text variant="eyebrow" className="mb-7">
        {label}
      </Text>
      <Text variant="h-section" style={{ margin: 0 }}>
        {children}
      </Text>
    </>
  );
}
