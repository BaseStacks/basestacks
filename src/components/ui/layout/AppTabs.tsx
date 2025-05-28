import { Link } from "@tanstack/react-router";

interface AppTabItem {
    readonly name: string;
    readonly value: string;
    readonly icon?: React.ReactNode;
    readonly count?: number;
}

interface AppTabsProps {
    readonly activeTab?: string;
    readonly tabs: AppTabItem[];
}

export function AppTabs({  tabs }: AppTabsProps) {
    return (
        <div className="w-full border-b px-2 h-12">
            <ul className="w-full h-full flex bg-background justify-start border-none rounded-none gap-2">
                {tabs.map((tab) => (
                    <li
                        key={tab.value}
                        value={tab.value}
                    >
                        <Link
                            to="."
                            search={{ page: tab.value }}
                            className="flex items-center gap-2 text-base px-2 h-full !border-b-2 border-transparent data-[status=active]:border-primary [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0"
                        >
                            {tab.icon} {tab.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}                   
