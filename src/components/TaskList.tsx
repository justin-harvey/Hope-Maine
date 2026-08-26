import Link from "next/link";
import type { ComponentProps } from "react";

import { Icon } from "@/components/ui/icon";

export type Task = {
  label: string;
  href: string;
  /** One line saying what the resident gets. Keep it plain and short. */
  detail?: string;
};

function TaskAnchor({ task, className }: { task: Task; className: string }) {
  const isExternal = task.href.startsWith("http");

  const inner = (
    <>
      <span className="min-w-0">
        <span className="block font-semibold">{task.label}</span>
        {task.detail && (
          <span className="mt-0.5 block body-xs text-ink-muted no-underline">{task.detail}</span>
        )}
      </span>
      <Icon
        name={isExternal ? "external-link" : "chevron-right"}
        size="sm"
        className="shrink-0"
        label={isExternal ? "Opens on another website" : undefined}
      />
    </>
  );

  if (isExternal) {
    return (
      <a href={task.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={task.href as ComponentProps<typeof Link>["href"]} className={className}>
      {inner}
    </Link>
  );
}

/** Ruled, full-width rows. Reads as a directory of services. */
export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.label}>
          <TaskAnchor task={task} className="task-row body" />
        </li>
      ))}
    </ul>
  );
}

/** A single boxed destination. Used by the grid and by the carousel. */
export function TaskTile({ task }: { task: Task }) {
  return <TaskAnchor task={task} className="task-tile body-sm h-full" />;
}

/** Boxed variant for a multi-column grid of shorter destinations. */
export function TaskGrid({ tasks, columns = 3 }: { tasks: Task[]; columns?: 2 | 3 }) {
  return (
    <ul
      className={
        columns === 2
          ? "grid gap-3 sm:grid-cols-2"
          : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {tasks.map((task) => (
        <li key={task.label}>
          <TaskTile task={task} />
        </li>
      ))}
    </ul>
  );
}
