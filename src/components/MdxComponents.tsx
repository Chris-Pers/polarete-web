import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      {...props}
      className="mt-12 mb-6 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="mt-10 mb-4 text-2xl font-bold tracking-tight text-[var(--color-ink)]"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mt-8 mb-3 text-xl font-semibold tracking-tight text-[var(--color-ink)]"
    />
  ),
  p: (props) => (
    <p {...props} className="my-5 leading-relaxed text-[var(--color-ink-secondary)]" />
  ),
  a: (props) => (
    <a
      {...props}
      className="text-[var(--color-spark)] underline-offset-4 hover:underline"
    />
  ),
  strong: (props) => (
    <strong {...props} className="font-semibold text-[var(--color-ink)]" />
  ),
  ul: (props) => (
    <ul
      {...props}
      className="my-5 list-disc space-y-2 pl-6 text-[var(--color-ink-secondary)]"
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="my-5 list-decimal space-y-2 pl-6 text-[var(--color-ink-secondary)]"
    />
  ),
  li: (props) => <li {...props} className="leading-relaxed" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="my-6 border-l-4 border-[var(--color-anchor)] pl-6 italic text-[var(--color-ink-secondary)]"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="rounded bg-[var(--color-surface-muted)] px-1.5 py-0.5 font-mono text-sm text-[var(--color-ink)]"
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 text-sm"
    />
  ),
  hr: (props) => (
    <hr {...props} className="my-10 border-[var(--color-border)]" />
  ),
}
