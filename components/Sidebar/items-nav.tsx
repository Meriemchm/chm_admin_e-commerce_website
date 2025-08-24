"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  ShoppingBasket,
  ChevronDown,
  ChevronUp,
  PaletteIcon,
  RulerIcon,
  ImageIcon,
  Settings,
  FolderTreeIcon,
  PackageIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export function ItemsNav({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const [isAttributesOpen, setIsAttributesOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {

    return null;
  }

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      icon: <LayoutDashboardIcon size={16} />,
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      icon: <ImageIcon size={16} />,
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      icon: <FolderTreeIcon size={16} />,
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      icon: <PackageIcon size={16} />,
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      icon: <ShoppingBasket size={16} />,
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      icon: <Settings size={16} />,
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  const routesCollapsible = [
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      icon: <RulerIcon size={14} />,
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      icon: <PaletteIcon size={14} />,
      active: pathname === `/${params.storeId}/colors`,
    },
  ];

  return (
    <nav className={cn("flex flex-col space-y-2", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center p-2 gap-2 text-sm font-medium transition-colors  ",
            route.active
              ? "text-white bg-black rounded-lg  dark:text-white hover:opacity-80"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          {route.icon}
          {route.label}
        </Link>
      ))}

      {/* ATTRIBUTES COLLAPSIBLE */}
      <button
        onClick={() => setIsAttributesOpen(!isAttributesOpen)}
        className={cn(
          "flex items-center justify-between w-full p-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
        )}
      >
        <span className="flex items-center gap-2">
          <LayoutDashboardIcon size={16} />
          Attributes
        </span>
        {isAttributesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {isAttributesOpen && (
        <div className="ml-6 flex flex-col space-y-1">
          {routesCollapsible.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center p-2 gap-2 text-sm font-medium transition-colors ",
                route.active
                  ? "text-white bg-black rounded-lg  dark:text-white hover:opacity-80"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
