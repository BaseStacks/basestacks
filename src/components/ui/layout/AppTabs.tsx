import { Tabs, TabsList, TabsTrigger } from "@/components/ui/primitives/tabs";
import { useNavigate } from "@tanstack/react-router";

interface AppTabItem {
    readonly name: string;
    readonly value: string;
    readonly icon?: React.ReactNode;
    readonly count?: number;
}

interface AppTabsProps {
    readonly tabs: AppTabItem[];
}

export function AppTabs({ tabs }: AppTabsProps) {
    const navigate = useNavigate();
    const handleTabChange = (value: string) => {
        navigate({
            from: '/settings',
            search: { page: value }
        })
    };

    return (
        <div className="w-full border-b px-2">
            <Tabs defaultValue={tabs[0].value} className="max-w-xs w-full">
                <TabsList className="w-full h-12 p-0 bg-background justify-start border-none rounded-none gap-2">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            onClick={() => handleTabChange(tab.value)}
                            className="!bg-transparent px-2 flex-none rounded-none h-full data-[state=active]:shadow-none border-0 !border-b-2 border-transparent data-[state=active]:border-primary"
                        >
                            {tab.icon ?? null} {tab.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
}                   
