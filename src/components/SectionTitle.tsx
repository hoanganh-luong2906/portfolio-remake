interface Props {
  label: string;
  children: React.ReactNode;
}

export default function SectionTitle({ label, children }: Props) {
  return (
    <>
      <div className="eyebrow mb-7">{label}</div>
      <h2 className="h-section m-0">{children}</h2>
    </>
  );
}
