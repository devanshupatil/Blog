interface Props {
  category: string
}

export function CategoryBadge({ category }: Props) {
  return (
    <span className="text-xs font-semibold uppercase tracking-wide text-editorial-accent">
      {category}
    </span>
  )
}
