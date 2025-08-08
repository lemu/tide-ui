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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
        isActive: true,
        items: [
          {
            title: "New Order",
            url: "#",
            isActive: true,
          },
          {
            title: "Mailing List",
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
    support: [
      {
        title: "Notifications",
        icon: "bell",
        url: "#",
      },
      {
        title: "Settings",
        icon: "settings-2",
        url: "#",
      },
      {
        title: "Help & Support",
        icon: "circle-help",
        url: "#",
      },
    ],
  },
};

// Combined User/Team Switcher Component
interface CombinedSwitcherProps {
  user: typeof sidebarData.user;
  teams: typeof sidebarData.teams;
}

function CombinedSwitcher({ user, teams }: CombinedSwitcherProps) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto min-h-[48px] w-full justify-start p-2"
        >
          <div className="flex w-full items-center gap-3">
            {/* Team/Company Avatar */}
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-sm border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)]">
                <img
                  src={activeTeam.logo}
                  alt={activeTeam.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* User Avatar Overlay */}
              <div className="absolute -right-1 -bottom-1 h-5 w-5 overflow-hidden rounded-full border-2 border-white">
                <Avatar className="h-full w-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-[var(--color-background-brand)] text-[8px] text-[var(--color-text-on-action)]">
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
            <Icon name="chevron-up" size="md" className="opacity-50" />
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
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-[var(--color-background-brand)] text-[var(--color-text-on-action)]">
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
              <span className="text-caption-sm truncate text-[var(--color-text-secondary)]">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Team Section */}
        <DropdownMenuLabel className="text-caption-medium-sm px-2 py-1 text-[var(--color-text-secondary)]">
          Teams
        </DropdownMenuLabel>
        {teams.map((team) => (
          <DropdownMenuItem
            key={team.name}
            onClick={() => setActiveTeam(team)}
            className="mx-1 cursor-pointer gap-2 p-2"
          >
            <div className="flex size-6 items-center justify-center overflow-hidden rounded-sm border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)]">
              <img
                src={team.logo}
                alt={team.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col text-left">
              <span className="text-body-medium-sm truncate font-semibold text-[var(--color-text-primary)]">
                {team.name}
              </span>
              <span className="text-caption-sm truncate text-[var(--color-text-secondary)]">
                {team.role} at {team.name} • {team.plan}
              </span>
            </div>
            {activeTeam.name === team.name && (
              <Icon
                name="check"
                size="sm"
                className="text-[var(--color-text-brand)]"
              />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* User Actions */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-body-sm mx-1 cursor-pointer">
            <Icon name="user" size="sm" className="mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="text-body-sm mx-1 cursor-pointer">
            <Icon name="settings" size="sm" className="mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="text-body-sm mx-1 cursor-pointer">
            <Icon name="bell" size="sm" className="mr-2" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Team Actions */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-body-sm mx-1 cursor-pointer">
            <Icon name="plus" size="sm" className="mr-2" />
            Add team
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-body-sm mx-1 cursor-pointer">
          <Icon name="log-out" size="sm" className="mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="h-full border-r border-[var(--color-border-primary-subtle)]"
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
                className="text-body-md flex h-8 w-full items-center rounded-md border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-3 py-1 pr-20 pl-8 text-left text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:border-[var(--color-border-primary-bold)] active:border-[var(--color-border-primary-bold)] focus:ring-1 focus:ring-[var(--color-border-focus)] focus:outline-none cursor-pointer"
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
              className="hidden h-8 w-8 items-center justify-center rounded border border-[var(--color-border-primary-subtle)] bg-transparent transition-all duration-200 group-data-[collapsible=icon]:flex hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:border-[var(--color-border-primary-bold)] active:border-[var(--color-border-primary-bold)] cursor-pointer"
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
                  <SidebarMenuButton
                    isActive={item.isActive}
                    className="text-body-medium-md px-2 py-1.5 cursor-pointer hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors"
                    onClick={() => console.log(`Navigate to ${item.title}`)}
                  >
                    <Icon name={item.icon as any} size="sm" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Separator between Main and Management in collapsed state */}
        <div className="group-data-[collapsible=icon]:flex hidden justify-center px-2 my-2">
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
                          className="text-body-medium-md px-2 py-1.5 cursor-pointer hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors"
                          onClick={() => toggleExpanded(item.title)}
                        >
                          <Icon name={item.icon as any} size="sm" />
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
                      <div className="group-data-[collapsible=icon]:block hidden">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                              isActive={item.isActive}
                              className="text-body-medium-md px-2 py-1.5 cursor-pointer hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors w-full justify-center"
                            >
                              <Icon name={item.icon as any} size="sm" />
                            </SidebarMenuButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" sideOffset={8} align="start">
                            <DropdownMenuLabel className="font-medium text-body-medium-sm">
                              {item.title}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {item.items.map((subItem) => (
                              <DropdownMenuItem
                                key={subItem.title}
                                onClick={() => console.log(`Navigate to ${subItem.title}`)}
                                className={`cursor-pointer ${
                                  subItem.isActive ? "bg-[var(--color-background-brand-selected)] text-[var(--color-text-brand)]" : ""
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
                    <SidebarMenuButton
                      isActive={item.isActive}
                      className="text-body-medium-md px-2 py-1.5 cursor-pointer hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors"
                      onClick={() => console.log(`Navigate to ${item.title}`)}
                    >
                      <Icon name={item.icon as any} size="sm" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
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
        <div className="group-data-[collapsible=icon]:flex hidden justify-center px-2 my-2">
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
                  <SidebarMenuButton
                    isActive={item.isActive}
                    className="text-body-medium-md px-2 py-1.5 cursor-pointer hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors"
                    onClick={() => console.log(`Navigate to ${item.title}`)}
                  >
                    <Icon name={item.icon as any} size="sm" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Spacer to push support section to bottom */}
        <div className="flex-1" />

        {/* Support Section */}
        <SidebarGroup className="px-2 pb-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.navigation.support.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className="text-body-medium-md px-2 py-1.5 cursor-pointer hover:bg-[var(--color-background-neutral-subtle-hovered)] active:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors"
                    onClick={() => console.log(`Open ${item.title}`)}
                  >
                    <Icon name={item.icon as any} size="sm" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Combined User/Team Switcher */}
      <SidebarFooter className="border-t border-[var(--color-border-primary-subtle)] p-[var(--space-md)]">
        <CombinedSwitcher user={sidebarData.user} teams={sidebarData.teams} />
      </SidebarFooter>

      <SidebarRail />

      {/* Command Dialog */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search navigation, commands, and more..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {sidebarData.navigation.main.map((item) => (
              <CommandItem key={item.title}>
                <Icon name={item.icon as any} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
            {sidebarData.navigation.management.map((item) => (
              <CommandItem key={item.title}>
                <Icon name={item.icon as any} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
            {sidebarData.navigation.intelligence.map((item) => (
              <CommandItem key={item.title}>
                <Icon name={item.icon as any} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Settings">
            {sidebarData.navigation.support.map((item) => (
              <CommandItem key={item.title}>
                <Icon name={item.icon as any} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Teams">
            {sidebarData.teams.map((team) => (
              <CommandItem key={team.name}>
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
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
        <div className="flex flex-1 flex-col gap-[var(--space-md)] p-[var(--space-md)] pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
