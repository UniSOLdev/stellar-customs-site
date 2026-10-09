type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/** Editorial section intro — sentence case, breathable spacing (Astra-style clarity). */
export function SectionHeader({ eyebrow, title, description, align = "left", className = "" }: Props) {
  const alignCls = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <header className={`${alignCls} ${className}`.trim()}>
      {eyebrow ? <p className="text-sm font-medium text-zinc-500">{eyebrow}</p> : null}
      <h2 className={`text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl ${eyebrow ? "mt-2" : ""}`}>
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-400 sm:text-base">{description}</p>
      ) : null}
    </header>
  );
}
