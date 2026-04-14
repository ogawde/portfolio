import type { ComponentProps, ReactNode } from "react"

type BaseProps<T extends keyof JSX.IntrinsicElements> = ComponentProps<T> & {
  children?: ReactNode
}

export const articleMdxComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl"
      {...(props as BaseProps<"h1">)}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-10 mb-4 text-3xl font-semibold tracking-tight first:mt-0"
      {...(props as BaseProps<"h2">)}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 mb-3 text-2xl font-medium tracking-tight"
      {...(props as BaseProps<"h3">)}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="text-muted-foreground mb-5 text-[1.05rem] leading-8"
      {...(props as BaseProps<"p">)}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-5 ml-6 list-disc space-y-2.5" {...(props as BaseProps<"ul">)}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-5 ml-6 list-decimal space-y-2.5" {...(props as BaseProps<"ol">)}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-muted-foreground leading-8" {...(props as BaseProps<"li">)}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-primary text-muted-foreground mb-5 border-l-4 pl-4 italic"
      {...(props as BaseProps<"blockquote">)}
    >
      {children}
    </blockquote>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="bg-muted/30 mb-5 overflow-x-auto rounded-lg border p-4 text-sm leading-6"
      {...(props as BaseProps<"pre">)}
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-muted/60 rounded px-1.5 py-0.5 font-mono text-[0.9em]"
      {...(props as BaseProps<"code">)}
    >
      {children}
    </code>
  ),
  strong: ({ children, ...props }) => (
    <strong className="text-foreground font-semibold" {...(props as BaseProps<"strong">)}>
      {children}
    </strong>
  ),
}
