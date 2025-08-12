import * as React from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Kbd } from "@/components/ui/kbd";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Data structure for sidebar
const sidebarData = {
  user: {
    name: "Rafał Lemieszewski",
    email: "rafal.lemieszewski@sea.live",
    avatar: "/avatars/rl.png",
  },
  teams: [
    {
      name: "Acme",
      plan: "Enterprise",
      logo: "/avatars/acme.png",
      role: "Trader",
    },
    { name: "Sea", plan: "Pro", logo: "/avatars/sea.png", role: "Broker" },
  ],
  navigation: {
    main: [
      {
        title: "Home",
        icon: "house",
        url: "#",
        isActive: false,
      },
    ],
    management: [
      {
        title: "Freight planner",
        icon: "ship",
        url: "#",
        items: [],
      },
      {
        title: "Trade desk",
        icon: "trending-up",
        url: "#",
        isActive: false,
        items: [
          {
            title: "New order",
            url: "#",
            isActive: true,
          },
          {
            title: "Mailing list",
            url: "#",
          },
        ],
      },
      {
        title: "Contracts",
        icon: "scroll-text",
        url: "#",
        items: [],
      },
      {
        title: "Compliance",
        icon: "shield-check",
        url: "#",
        items: [],
      },
    ],
    intelligence: [
      {
        title: "Global market",
        icon: "globe",
        url: "#",
      },
      {
        title: "Assets",
        icon: "container",
        url: "#",
      },
      {
        title: "Fixtures",
        icon: "anchor",
        url: "#",
        isActive: false,
      },
    ],
    boards: [
      {
        title: "Untitled board 1",
        icon: "layout-dashboard",
        url: "#",
        isActive: false,
      },
      {
        title: "Untitled board 2",
        icon: "layout-dashboard",
        url: "#",
        isActive: false,
      },
      {
        title: "Untitled board 3",
        icon: "layout-dashboard",
        url: "#",
        isActive: false,
      },
    ],
    support: [
      {
        title: "Notifications",
        icon: "bell",
        url: "#",
      },
      {
        title: "Help & support",
        icon: "circle-help",
        url: "#",
      },
    ],
  },
};

// Helper function to check if any child item is active
const hasActiveChild = (item: any) => {
  return item.items && item.items.some((subItem: any) => subItem.isActive);
};

// Helper function to get tooltip text for menu items
const getTooltipText = (item: any) => {
  // If item has subitems, check if any subitem is active
  if (item.items && item.items.length > 0) {
    const activeSubitem = item.items.find((subItem: any) => subItem.isActive);
    if (activeSubitem) {
      return `${item.title} → ${activeSubitem.title}`;
    }
  }
  return item.title;
};

// Combined User/Team Switcher Component
interface CombinedSwitcherProps {
  user: typeof sidebarData.user;
  teams: typeof sidebarData.teams;
}

function CombinedSwitcher({ user, teams }: CombinedSwitcherProps) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  return (
    <div className="rounded-md border border-[var(--color-border-primary-subtle)] group-data-[collapsible=icon]:rounded-none group-data-[collapsible=icon]:border-none">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto min-h-[48px] w-full justify-start rounded-md p-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:min-h-[32px] group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
          >
            {/* Expanded state - full layout */}
            <div className="flex w-full items-center gap-3 group-data-[collapsible=icon]:hidden">
              {/* Team/Company Avatar */}
              <div className="relative">
                <Avatar size="md" shape="rounded">
                  <AvatarImage src={activeTeam.logo} alt={activeTeam.name} />
                  <AvatarFallback variant="primary">
                    {activeTeam.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {/* User Avatar Overlay */}
                <div className="absolute -right-1 -bottom-1 rounded-full border-2 border-white">
                  <Avatar size="xs" shape="circle">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback variant="primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* User/Team Info */}
              <div className="min-w-0 flex-1 text-left">
                <div className="text-body-medium-sm truncate font-medium text-[var(--color-text-primary)]">
                  {user.name}
                </div>
                <div className="text-body-xsm text-[var(--color-text-secondary)]">
                  {activeTeam.role} at {activeTeam.name}
                </div>
              </div>

              {/* Chevron */}
              <Icon name="chevron-down" size="md" className="opacity-50" />
            </div>

            {/* Collapsed state - just avatars */}
            <div className="relative hidden group-data-[collapsible=icon]:block">
              <Avatar size="sm" shape="rounded">
                <AvatarImage src={activeTeam.logo} alt={activeTeam.name} />
                <AvatarFallback variant="primary" className="text-[9px]">
                  {activeTeam.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* User Avatar Overlay - bigger */}
              <div className="absolute -right-0.5 -bottom-0.5 rounded-full border border-white">
                <Avatar size="sm" shape="circle" className="h-4 w-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback variant="primary" className="text-[7px]">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width]"
          align="start"
          side="top"
          sideOffset={4}
        >
          {/* User Section */}
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-3 px-2 py-2">
              <Avatar size="sm" shape="circle">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback variant="primary">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left">
                <span className="text-body-medium-sm truncate font-semibold text-[var(--color-text-primary)]">
                  {user.name}
                </span>
                <span className="text-caption-xsm truncate text-[var(--color-text-secondary)]">
                  {user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Team Section */}
          <DropdownMenuLabel className="text-caption-medium-sm px-2 py-1 text-[var(--color-text-secondary)]">
            Organizations
          </DropdownMenuLabel>
          {teams.map((team) => (
            <DropdownMenuItem
              key={team.name}
              onClick={() => setActiveTeam(team)}
              className="mx-1 mb-1 h-10 cursor-pointer gap-2 px-1 pr-2 pl-1"
            >
              <Avatar size="sm" shape="rounded">
                <AvatarImage src={team.logo} alt={team.name} />
                <AvatarFallback variant="primary" className="text-[8px]">
                  {team.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col text-left">
                <span className="text-body-medium-sm truncate font-semibold text-[var(--color-text-primary)]">
                  {team.name}
                </span>
                <span className="text-caption-xsm truncate text-[var(--color-text-secondary)]">
                  {team.role} at {team.name} • {team.plan} plan
                </span>
              </div>
              {activeTeam.name === team.name && <Icon name="check" size="md" />}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          {/* User Actions */}
          <DropdownMenuGroup>
            <DropdownMenuItem className="mx-1 cursor-pointer">
              <Icon name="user" size="sm" className="mr-2" />
              User Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="mx-1 cursor-pointer">
              <Icon name="settings" size="sm" className="mr-2" />
              Organization Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="mx-1 cursor-pointer" destructive>
            <Icon name="log-out" size="sm" className="mr-2" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// App Sidebar Component
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

function AppSidebar(props: AppSidebarProps) {
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState<
    Record<string, boolean>
  >({
    "Trade desk": true, // Default expanded
  });

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
      // Additional keyboard shortcuts for enhanced navigation
      if (e.key === "p" && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        // Open command palette and focus on commands
        setCommandOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemTitle]: !prev[itemTitle],
    }));
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="h-full border-r border-[var(--color-border-primary-subtle)] [&>div]:transition-[width] [&>div]:duration-75"
        {...props}
      >
      {/* Header with Company Logo */}
      <SidebarHeader className="border-b border-[var(--color-border-primary-subtle)] p-[var(--space-md)] group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
        <div className="flex h-[22px] w-7 items-center justify-center">
          <svg
            width="28"
            height="22"
            viewBox="0 0 28 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.39355 0.688477C6.89528 0.688477 8.12094 1.67409 8.12109 3.74609V7.69043H5.5332V2.87695H3.28711V8.03125L8.12109 11.458V18.2705C8.12109 20.3262 6.92916 21.3125 4.39355 21.3125C1.85827 21.3124 0.701172 20.3261 0.701172 18.2705L0.700195 13.7412H3.28711V19.1396H5.5332V12.6777L0.701172 9.23438V3.74609C0.701322 1.67422 1.89214 0.688597 4.39355 0.688477ZM13.8379 0.6875C16.4752 0.687615 17.6152 1.67395 17.6152 3.74609V10.5312L12.6113 13.7236V19.123H15.0273V14.3096H17.6143V18.2705C17.6143 20.3262 16.4235 21.3125 13.8027 21.3125C11.1821 21.3125 10.0244 20.3262 10.0244 18.2705V3.74609H10.0254C10.0254 1.67382 11.2003 0.6875 13.8379 0.6875ZM23.333 0.6875C25.9537 0.6875 27.1113 1.67378 27.1113 3.72949V18.2539H27.1104C27.1104 20.3261 25.9363 21.3125 23.2988 21.3125C20.6612 21.3125 19.5205 20.3262 19.5205 18.2539V11.4688L24.5254 8.27637V2.87695H22.1084V7.69043H19.5215V3.72949C19.5215 1.67384 20.7124 0.687556 23.333 0.6875ZM22.1084 12.2197V19.1396H24.5254V10.5986L22.1084 12.2197ZM12.6113 11.4014L15.0273 9.78027V2.86035H12.6113V11.4014Z"
              fill="#005F85"
            />
          </svg>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex flex-col gap-1">
        {/* Search Section */}
        <div className="p-[var(--space-md)] pt-[var(--space-sm)] group-data-[collapsible=icon]:px-2">
          <div className="relative">
            <div className="absolute top-1/2 left-2 -translate-y-1/2 group-data-[collapsible=icon]:hidden">
              <Icon name="search" size="md" color="tertiary" />
            </div>
            {/* Full search button in expanded state */}
            <div className="group-data-[collapsible=icon]:hidden">
              <button
                onClick={() => setCommandOpen(true)}
                className="text-body-md flex h-8 w-full cursor-pointer items-center rounded-md border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-3 py-1 pr-20 pl-8 text-left text-[var(--color-text-tertiary)] transition-colors hover:border-[var(--color-border-primary-bold)] hover:bg-[var(--color-background-neutral-subtle-hovered)] focus:ring-1 focus:ring-[var(--color-border-focus)] focus:outline-none active:border-[var(--color-border-primary-bold)]"
              >
                Search
              </button>
              <div className="absolute top-1/2 right-2 flex -translate-y-1/2 gap-1">
                <Kbd size="sm">Ctrl</Kbd>
                <Kbd size="sm">K</Kbd>
              </div>
            </div>

            {/* Icon-only search button in collapsed state */}
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden h-8 w-8 cursor-pointer items-center justify-center rounded border border-[var(--color-border-primary-subtle)] bg-transparent transition-all duration-200 group-data-[collapsible=icon]:flex hover:border-[var(--color-border-primary-bold)] hover:bg-[var(--color-background-neutral-subtle-hovered)] active:border-[var(--color-border-primary-bold)]"
              aria-label="Search"
            >
              <Icon name="search" size="md" color="tertiary" />
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="px-2 pb-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.navigation.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        isActive={item.isActive}
                        className="text-body-medium-md cursor-pointer px-2 py-1.5 transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)]"
                        onClick={() => console.log(`Navigate to ${item.title}`)}
                      >
                        <Icon 
                          name={item.icon as any} 
                          size="sm" 
                          color={item.isActive ? "brand" : undefined}
                        />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      className="group-data-[collapsible=icon]:block group-data-[collapsible=off]:hidden"
                    >
                      {getTooltipText(item)}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Separator between Main and Management in collapsed state */}
        <div className="my-2 hidden justify-center px-2 group-data-[collapsible=icon]:flex">
          <Separator layout="vertical" />
        </div>

        {/* Management Section */}
        <SidebarGroup className="-mt-2 px-2">
          <SidebarGroupLabel className="px-2 py-1 pb-1.5 text-[12px] font-medium text-[var(--color-text-tertiary)] group-data-[collapsible=icon]:hidden">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.navigation.management.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items && item.items.length > 0 ? (
                    <>
                      {/* Expanded state - regular expandable menu */}
                      <div className="group-data-[collapsible=icon]:hidden">
                        <SidebarMenuButton
                          isActive={item.isActive && !item.items?.length}
                          className="text-body-medium-md cursor-pointer px-2 py-1.5 transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)]"
                          onClick={() => toggleExpanded(item.title)}
                        >
                          <Icon 
                            name={item.icon as any} 
                            size="sm" 
                            color={(item.isActive && !item.items?.length) ? "brand" : undefined}
                          />
                          <span>{item.title}</span>
                          <Icon
                            name="chevron-right"
                            size="sm"
                            className={`ml-auto transition-transform ${
                              expandedItems[item.title] ? "rotate-90" : ""
                            }`}
                          />
                        </SidebarMenuButton>
                      </div>

                      {/* Collapsed state - dropdown with submenu */}
                      <div className="hidden group-data-[collapsible=icon]:block">
                        <DropdownMenu>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                  isActive={hasActiveChild(item)}
                                  className="text-body-medium-md w-full cursor-pointer justify-center px-2 py-1.5 transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)]"
                                >
                                  <Icon 
                                    name={item.icon as any} 
                                    size="sm" 
                                    color={hasActiveChild(item) ? "brand" : undefined}
                                  />
                                </SidebarMenuButton>
                              </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              {getTooltipText(item)}
                            </TooltipContent>
                          </Tooltip>
                          <DropdownMenuContent
                            side="right"
                            sideOffset={8}
                            align="start"
                          >
                            <DropdownMenuLabel className="text-body-medium-sm font-medium">
                              {item.title}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {item.items.map((subItem) => (
                              <DropdownMenuItem
                                key={subItem.title}
                                onClick={() =>
                                  console.log(`Navigate to ${subItem.title}`)
                                }
                                className={`cursor-pointer ${
                                  subItem.isActive
                                    ? "bg-[var(--color-background-brand-selected)] text-[var(--color-text-brand)]"
                                    : ""
                                }`}
                              >
                                {subItem.title}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          isActive={item.isActive}
                          className="text-body-medium-md cursor-pointer px-2 py-1.5 transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)]"
                          onClick={() => console.log(`Navigate to ${item.title}`)}
                        >
                          <Icon 
                            name={item.icon as any} 
                            size="sm" 
                            color={item.isActive ? "brand" : undefined}
                          />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right" 
                        className="group-data-[collapsible=icon]:block group-data-[collapsible=off]:hidden"
                      >
                        {getTooltipText(item)}
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {item.items &&
                    item.items.length > 0 &&
                    expandedItems[item.title] && (
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              isActive={subItem.isActive}
                              className={`[&]:text-body-md px-2 py-1.5 ${
                                subItem.isActive
                                  ? "bg-[var(--color-background-brand-selected)] [&]:!text-[var(--color-text-brand)] [&_a]:!text-[var(--color-text-brand)] [&>*]:!text-[var(--color-text-brand)]"
                                  : ""
                              }`}
                            >
                              <a
                                href={subItem.url}
                                className={`${subItem.isActive ? "!text-[var(--color-text-brand)]" : ""}`}
                                style={
                                  subItem.isActive
                                    ? { color: "var(--color-text-brand)" }
                                    : {}
                                }
                              >
                                {subItem.title}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Separator between Management and Intelligence in collapsed state */}
        <div className="my-2 hidden justify-center px-2 group-data-[collapsible=icon]:flex">
          <Separator layout="vertical" />
        </div>

        {/* Intelligence Section */}
        <SidebarGroup className="-mt-2 px-2">
          <SidebarGroupLabel className="px-2 py-1 pb-1.5 text-[12px] font-medium text-[var(--color-text-tertiary)] group-data-[collapsible=icon]:hidden">
            Intelligence
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.navigation.intelligence.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        isActive={item.isActive}
                        className="text-body-medium-md cursor-pointer px-2 py-1.5 transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)]"
                        onClick={() => console.log(`Navigate to ${item.title}`)}
                      >
                        <Icon 
                          name={item.icon as any} 
                          size="sm" 
                          color={item.isActive ? "brand" : undefined}
                        />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      className="group-data-[collapsible=icon]:block group-data-[collapsible=off]:hidden"
                    >
                      {getTooltipText(item)}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Separator between Intelligence and Boards in collapsed state */}
        <div className="my-2 hidden justify-center px-2 group-data-[collapsible=icon]:flex">
          <Separator layout="vertical" />
        </div>

        {/* Boards Section */}
        <SidebarGroup className="-mt-2 px-2">
          <SidebarGroupLabel className="px-2 py-1 pb-1.5 text-[12px] font-medium text-[var(--color-text-tertiary)] group-data-[collapsible=icon]:hidden">
            Boards
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.navigation.boards.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        isActive={item.isActive}
                        className="text-body-medium-md cursor-pointer px-2 py-1.5 transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)]"
                        onClick={() => console.log(`Navigate to ${item.title}`)}
                      >
                        <Icon
                          name={item.icon as any}
                          size="sm"
                          color={item.isActive ? "brand" : undefined}
                        />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      className="group-data-[collapsible=icon]:block group-data-[collapsible=off]:hidden"
                    >
                      {getTooltipText(item)}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
              {/* Show all boards link */}

              <SidebarMenuItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      className="text-body-md cursor-pointer px-2 py-1.5 transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)]"
                      onClick={() => console.log("Navigate to Show all boards")}
                    >
                      <Icon name="more-horizontal" size="sm" />
                      <span>Show all</span>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    className="group-data-[collapsible=icon]:block group-data-[collapsible=off]:hidden"
                  >
                    Show all
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Spacer to push support section to bottom */}
        <div className="min-h-[var(--space-lg)] flex-1" />

        {/* Support Section */}
        <SidebarGroup className="px-2 pb-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.navigation.support.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        isActive={item.isActive}
                        className="text-body-medium-md cursor-pointer px-2 py-1.5 transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)]"
                        onClick={() => console.log(`Open ${item.title}`)}
                      >
                        <Icon 
                          name={item.icon as any} 
                          size="sm" 
                          color={item.isActive ? "brand" : undefined}
                        />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      className="group-data-[collapsible=icon]:block group-data-[collapsible=off]:hidden"
                    >
                      {getTooltipText(item)}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Combined User/Team Switcher */}
      <SidebarFooter className="p-[var(--space-md)] group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
        <CombinedSwitcher user={sidebarData.user} teams={sidebarData.teams} />
      </SidebarFooter>

      <SidebarRail />

      {/* Command Dialog */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => window.location.reload()}>
              <Icon name="rotate-ccw" size="sm" className="mr-2" />
              <span>Reload Page</span>
              <span className="text-caption-sm ml-auto text-[var(--color-text-tertiary)]">
                ⌘R
              </span>
            </CommandItem>
            <CommandItem onSelect={() => setCommandOpen(false)}>
              <Icon name="search" size="sm" className="mr-2" />
              <span>Search</span>
              <span className="text-caption-sm ml-auto text-[var(--color-text-tertiary)]">
                ⌘K
              </span>
            </CommandItem>
            <CommandItem onSelect={() => window.print()}>
              <Icon name="printer" size="sm" className="mr-2" />
              <span>Print Page</span>
              <span className="text-caption-sm ml-auto text-[var(--color-text-tertiary)]">
                ⌘P
              </span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Navigation">
            {sidebarData.navigation.main.map((item) => (
              <CommandItem
                key={item.title}
                onSelect={() => setCommandOpen(false)}
              >
                <Icon name={item.icon as any} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
            {sidebarData.navigation.management.map((item) => (
              <CommandItem
                key={item.title}
                onSelect={() => setCommandOpen(false)}
              >
                <Icon name={item.icon as any} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
            {sidebarData.navigation.intelligence.map((item) => (
              <CommandItem
                key={item.title}
                onSelect={() => setCommandOpen(false)}
              >
                <Icon name={item.icon as any} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
            {sidebarData.navigation.boards.map((item) => (
              <CommandItem
                key={item.title}
                onSelect={() => setCommandOpen(false)}
              >
                <Icon name={item.icon as any} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Settings">
            {sidebarData.navigation.support.map((item) => (
              <CommandItem
                key={item.title}
                onSelect={() => setCommandOpen(false)}
              >
                <Icon name={item.icon as any} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Switch Team">
            {sidebarData.teams.map((team) => (
              <CommandItem
                key={team.name}
                onSelect={() => setCommandOpen(false)}
              >
                <div className="mr-2 h-4 w-4 overflow-hidden rounded-sm">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span>Switch to {team.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Sidebar>
    </TooltipProvider>
  );
}

// App Frame Component
interface AppFrameProps {
  children: React.ReactNode;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

export function AppFrame({ children, breadcrumbs = [] }: AppFrameProps) {
  return (
    <SidebarProvider className="h-full">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-[var(--space-md)]">
            <SidebarTrigger className="-ml-1" />
            <Separator layout="horizontal" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {breadcrumb.href ? (
                        <BreadcrumbLink href={breadcrumb.href}>
                          {breadcrumb.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-[var(--space-md)]">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
