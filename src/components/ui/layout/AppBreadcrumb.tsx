import { Link } from "@tanstack/react-router";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "../primitives/breadcrumb";
import { Fragment } from "react/jsx-runtime";

export interface AppBreadcrumbItem {
  readonly type?: "link" | "menu";
  readonly label: string;
  readonly href?: string;
}

interface AppBreadcrumbProps {
  readonly items?: AppBreadcrumbItem[];
}

export function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {
          items?.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to={item.href ?? "#"} className="text-sidebar-accent-foreground/60 hover:text-sidebar-accent-foreground">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            );
          })
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}