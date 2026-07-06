/**
 * SectionLabel · Wave 1 Foundations · canon Fred v1
 * Bronze small-caps discreto usado em seções editoriais.
 */
type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionLabel({ children, className = '' }: Props) {
  return (
    <span
      className={`inline-block text-xs tracking-[0.2em] uppercase ${className}`}
      style={{ color: 'hsl(var(--bronze))', fontWeight: 500 }}
    >
      {children}
    </span>
  );
}
