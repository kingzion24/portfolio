/**
 * Digits that roll up to their value when the parent <Reveal> comes into view.
 * CSS-only (see .odo-col in globals.css); non-digits render as-is.
 */
export function Odometer({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex">
        {[...value].map((char, i) =>
          /\d/.test(char) ? (
            <span key={i} className="odo">
              <span
                className="odo-col"
                style={{ "--digit": char, "--odo-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                {Array.from({ length: Number(char) + 1 }, (_, n) => (
                  <span key={n}>{n}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i}>{char}</span>
          ),
        )}
      </span>
    </span>
  );
}
