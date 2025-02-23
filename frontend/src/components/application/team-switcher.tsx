"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, Building2, PersonStanding } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { getBusinessesByUser } from "@/lib/business";
import { Business, PersonType } from "@/types/business.type";
import { useApplicationStore } from "@/store/application.store";

export function TeamSwitcher() {
  const setActiveBusiness = useApplicationStore(
    (state) => state.setActiveBusiness
  );
  const activeBusiness: Business | null = useApplicationStore(
    (state) => state.activeBusiness
  );
  const { isMobile } = useSidebar();
  const [companies, setCompanies] = React.useState<Business[]>([]);

  React.useEffect(() => {
    const fetchBusinesses = async () => {
      const result = await getBusinessesByUser();
      if (result.ok && result.data.length) {
        setCompanies(result.data);
        setActiveBusiness(result.data[0]);
      }
    };
    fetchBusinesses();
  }, [setActiveBusiness]);

  if (!activeBusiness) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeBusiness.personType === PersonType.J ? (
                  <Building2 className="size-4" />
                ) : (
                  <PersonStanding className="size-5" />
                )}
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeBusiness.name}
                </span>
                <span className="truncate text-xs">
                  {activeBusiness.taxIdentification}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {companies.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveBusiness(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {team.personType === PersonType.J ? (
                    <Building2 className="size-4" />
                  ) : (
                    <PersonStanding className="size-5" />
                  )}
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
