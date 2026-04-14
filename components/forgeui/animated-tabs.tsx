"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const TAB_SPRING = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
};

export type AnimatedNavTabItem = {
  id: string;
  label: string;
  href: string;
};

type AnimatedNavTabsProps = {
  items: AnimatedNavTabItem[];
  activeId: string;
  onTabClick?: (id: string) => void;
  /** Must be unique if multiple animated tab groups exist on the page */
  layoutId?: string;
};

/**
 * Hash / in-page nav with the same sliding highlight as AnimatedTabs (layout spring).
 * Controlled by parent so scroll-spy and routing logic stay external.
 */
export function AnimatedNavTabs({
  items,
  activeId,
  onTabClick,
  layoutId = "nav-animated-tab-highlight",
}: AnimatedNavTabsProps) {
  return (
    <div className="relative flex items-center gap-1">
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => onTabClick?.(item.id)}
            className={cn(
              "relative flex items-center rounded-md px-3 py-1.5 text-sm transition-colors duration-200",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-md bg-foreground/10"
                initial={false}
                transition={TAB_SPRING}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

type AnimatedTabsProps = {
  tabs: Array<string>;
  variant?: "default" | "underline";
};

const AnimatedTabs = ({ tabs, variant = "default" }: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  if (variant === "underline") {
    return (
      <div className="relative flex items-center border-b border-border">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={index}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative flex h-10 items-center px-4 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={TAB_SPRING}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex w-fit items-center rounded-full bg-background p-1">
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={index}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative flex h-8 items-center rounded-full px-3 text-sm font-medium transition-colors duration-200",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-background"
                className="absolute inset-0 rounded-full bg-primary"
                initial={false}
                transition={TAB_SPRING}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AnimatedTabs;
