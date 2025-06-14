import { Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../navigation/breadcrumb";
import type React from "react";
import { useIsMobile } from "@/hooks/ui/useIsMobile";

export interface AppBreadcrumbItem {
  readonly type?: "link" | "menu" | "button";
  readonly label: React.ReactNode;
  readonly href?: string;
}

interface AppBreadcrumbProps {
  readonly items: Array<AppBreadcrumbItem>;
}

export function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    const lastItem = items[items.length - 1];
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <AppBreadcrumbItem item={lastItem} />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                <AppBreadcrumbItem item={item} />
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function AppBreadcrumbItem({ item }: { item: AppBreadcrumbItem }) {
  if (item.type === "link") {
    return (
      <BreadcrumbLink asChild>
        <Link
          to={item.href ?? "#"}
          className="text-sidebar-accent-foreground/60 hover:text-sidebar-accent-foreground"
        >
          {item.label}
        </Link>
      </BreadcrumbLink>
    );
  }

  return <span className="text-foreground font-normal">{item.label}</span>;
}
