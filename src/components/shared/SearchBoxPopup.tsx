import {
  BookImage,
  Clock,
  CornerDownLeft,
  CornerUpRight,
  FileSearch,
  Grid2x2,
  Layers2,
  LayoutGrid,
  Scroll,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/data-display/avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/overlay/dialog";
import { Input } from "../ui/primitives/input";
import { Button } from "../ui/primitives/button";
import type { HTMLProps } from "react";
import type { Color } from "@/Types";
import { cn } from "@/lib/utils";
import {
  getBgColorClass,
  getBorderColorClass,
  getTextColorClass,
} from "@/lib/colorUtils";
import { useUserState } from "@/states";
import { Toast } from "@/lib/toast";

type SearchFlow = {
  readonly id: string;
  readonly type: "Bases" | "Tables" | "Views" | "Scripts";
  readonly name: string;
  readonly url?: string;
  readonly icon?: React.ComponentType<HTMLProps<SVGSVGElement>>;
  readonly color?: Color;
  readonly children?: Array<SearchFlow>;
};

const defaultData: Array<SearchFlow> = [
  {
    id: "e2130ccc-7551-45ac-a8a4-e40e53cabdec",
    type: "Bases",
    name: "Base 1",
    url: "/base/1",
    icon: Layers2,
    color: "blue",
    children: [
      {
        id: "b1f3c2a0-4e8f-4c5b-9d6e-7c8f9a0b1c2d",
        type: "Tables",
        name: "Table 1.1",
        icon: Grid2x2,
      },
      {
        id: "c2d3e4f5-6a7b-8c9d-0e1f-2g3h4i5j6k7l",
        type: "Scripts",
        name: "Script 1.1",
        icon: Scroll,
      },
    ],
  },
  {
    id: "f4e5d6c7-8b9a-0b1c-2d3e-4f5g6h7i8j9k",
    type: "Bases",
    name: "Base 2",
    url: "/base/2",
    icon: Layers2,
    color: "blue",
    children: [
      {
        id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        type: "Tables",
        name: "Table 2.1",
        url: "?page=table&tableId=%221%22",
        icon: Grid2x2,
        children: [
          {
            id: "q1r2s3t4-u5v6-w7x8-y9z0-a1b2c3d4e5f6",
            type: "Views",
            name: "View 2.1",
            url: "?page=view&viewId=%221%22&tableId=%221%22",
            icon: LayoutGrid,
            color: "blue",
          },
          {
            id: "g1h2i3j4-k5l6-m7n8-o9p0-q1r2s3t4u5v6",
            type: "Views",
            name: "View 2.2",
            url: "?page=view&viewId=%222%22&tableId=%221%22",
            icon: BookImage,
            color: "pink",
          },
        ],
      },
      {
        id: "h7i8j9k0-l1m2-n3o4-p5q6-r7s8t9u0v1w2",
        type: "Tables",
        name: "Table 2.2",
        url: "?page=table&tableId=%222%22",
        icon: Grid2x2,
      },
    ],
  },
];

export function SearchBoxPopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Array<SearchFlow>>(defaultData);
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    defaultData[0].id
  );
  const [activeStep, setActiveStep] = useState<Array<SearchFlow>>([]);
  const [search, setSearchState] = useState<string>("");
  const { user } = useUserState();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Enter" && open && selectedItem) {
        event.preventDefault();
        const item = flatItems.find((i) => i.id === selectedItem);
        if (item) {
          handleResultClick(item);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleStepClick = (item?: SearchFlow) => {
    if (item && item.type == "Bases") {
      setActiveStep([item]);
      setStep(item.children ?? []);
      return;
    }
    setStep(defaultData);
    setActiveStep([]);
    return;
  };

  const handleResultClick = (item: SearchFlow) => {
    setSelectedItem(item.children?.length ? item.children[0].id : undefined);
    if (item.type === "Views" || !item.children) {
      setStep(defaultData);
      setActiveStep([]);
      setSearchState("");
      setOpen(false);
      if (item.url) {
        router.navigate({ to: item.url });
      } else {
        Toast.error({
          title: "Error",
          description: `No URL defined for ${item.name}.`,
        });
      }
      return;
    }
    setSearchState("");
    setStep(item.children ?? []);
    const path = findItemPath(flattenSearchFlow(defaultData), item);
    if (path) {
      setActiveStep(path);
    } else {
      setActiveStep((prev) => [...prev, item]);
    }
  };

  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  const normalizedKeyword = normalizeText(search);
  const keywords = normalizedKeyword.split(" ");
  const flatItems = flattenSearchFlow(step);

  const filteredItems = flatItems
    .filter((o) => o.type !== "Bases")
    .filter((item) => {
      const name = normalizeText(item.name);
      return keywords.every((word) => name.includes(word));
    });

  const dataLoop =
    search.trim() ? groupedByType(filteredItems) : groupedByType(step);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="!px-4 w-full">
          <Search />
          <span className="grow text-left block font-light">Quick search</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">Ctrl K</span>
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/30" />
        <DialogContent
          className={cn("!max-w-3xl w-full", "rounded-lg border p-0")}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 border-b p-4 overflow-hidden">
              <div className="flex items-center gap-2">
                <Search />
                <span
                  className="flex gap-2 items-center cursor-pointer "
                  onClick={() => handleStepClick()}
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <DialogTitle className="max-w-15 text-ellipsis overflow-hidden whitespace-nowrap">
                    {user.name}
                  </DialogTitle>
                </span>
                <span>/</span>
              </div>
              {activeStep.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon && <item.icon color={item.color} />}
                  <Button
                    variant="ghost"
                    type="button"
                    className="max-w-15 text-ellipsis overflow-hidden whitespace-nowrap"
                    onClick={() =>
                      item.type == "Bases" && handleStepClick(item)
                    }
                  >
                    {item.name}
                  </Button>
                  <span>/</span>
                </div>
              ))}
              <Input
                type="text"
                value={search}
                placeholder="Search workspace, bases, tables, views & more..."
                onChange={(e) => setSearchState(e.target.value)}
                className="w-full border-none !bg-transparent shadow-none !focus:outline-none !focus:ring-0 !focus:border-transparent focus-visible:ring-1 focus-visible:ring-transparent px-0"
              />
            </div>
            <div className="flex flex-col gap-2 pb-2 min-h-[400px]">
              {Object.entries(dataLoop).map(([type, items]) => (
                <div key={type}>
                  <div className="text-xs font-semibold p-3">{type}</div>
                  {items.map((item, index) => (
                    <Button
                      variant="ghost"
                      type="button"
                      key={index}
                      className={cn(
                        selectedItem === item.id &&
                          cn(
                            "border-l-4 bg-muted",
                            getBorderColorClass("blue", "500")
                          ),
                        "flex items-center justify-between gap-2 py-4 px-5 rounded rounded-0 w-full"
                      )}
                      onClick={() => handleResultClick(item)}
                      onMouseEnter={() => {
                        setSelectedItem(item.id);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon color={item.color} />}
                        <span>{item.name}</span>
                      </div>
                      {selectedItem === item.id && (
                        <kbd className="pointer-events-none inline-flex select-none items-center bg-muted rounded-lg border font-mono text-sm p-1 gap-2">
                          <span className="text-xs">Enter +</span>
                          <CornerDownLeft
                            className={`w-5 h-5 bg-white dark:${getBgColorClass("gray", "200")} rounded-md p-0.5`}
                          />
                        </kbd>
                      )}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
            <DialogFooter className="border-t p-4">
              <div className="flex gap-2 items-center justify-between w-full">
                <div className="flex items-center gap-1">
                  <FileSearch size={16} />
                  <span className="text-xs">Document</span>
                  <kbd className="pointer-events-none inline-flex select-none items-center bg-muted rounded-lg border text-sm p-1">
                    <span className="text-xs">Ctrl + J</span>
                  </kbd>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1",
                    getTextColorClass("blue")
                  )}
                >
                  <CornerUpRight size={16} color="blue" />
                  <span className="text-sm">Quick Navigation</span>
                  <kbd
                    className={cn(
                      "pointer-events-none inline-flex select-none items-center rounded-lg border p-1",
                      getBgColorClass("blue", "500")
                    )}
                  >
                    <span className="text-sm text-white">Ctrl + K</span>
                  </kbd>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span className="text-sm">Recent</span>
                  <kbd className="pointer-events-none inline-flex select-none items-center bg-muted rounded-lg border text-sm p-1">
                    <span className="text-xs">Ctrl + L</span>
                  </kbd>
                </div>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
function flattenSearchFlow(data: Array<SearchFlow>): Array<SearchFlow> {
  return data.flatMap((item) => [
    item,
    ...(item.children ? flattenSearchFlow(item.children) : []),
  ]);
}

function findItemPath(
  source: Array<SearchFlow>,
  target: SearchFlow
): Array<SearchFlow> | null {
  for (const item of source) {
    if (item === target) {
      return [item];
    }
    if (item.children) {
      const path = findItemPath(item.children, target);
      if (path) {
        return [item, ...path];
      }
    }
  }
  return null;
}

function groupedByType(
  items: Array<SearchFlow>
): Record<string, Array<SearchFlow>> {
  return items.reduce<Record<string, Array<SearchFlow>>>((acc, item) => {
    acc[item.type] = acc[item.type] ?? [];
    acc[item.type].push(item);
    return acc;
  }, {});
}
