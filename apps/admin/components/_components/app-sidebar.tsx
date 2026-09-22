import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar"
import { GalleryVerticalEndIcon, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/store"
import { logout } from "../../reducers/authReducer"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Analytics",
      url: "#",
      items: [
        {
          title: "Stats",
          url: "/analytics",
        },
      ],
    },
    {
      title: "Dsa Questions",
      url: "#",
      items: [
        {
          title: "Questions",
          url: "/questions",
        },
        {
          title: "Add Question",
          url: "/add-question",
          isActive: true,
        },
        {
          title: "Submission Logs",
          url: "/submission-logs",
          isActive: true,
        },
      ],
    },
    {
      title: "Blogs",
      url: "#",
      items: [
        {
          title: "Blogs",
          url: "/blogs",
        },
      ],
    },
    {
      title: "Jobs",
      url: "#",
      items: [
        {
          title: "Job posts",
          url: "/jobs",
        },
      ],
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const email = useSelector((state: RootState) => state.auth.email)
  const profileLabel = email || "Administrator"
  const initials = profileLabel.slice(0, 1).toUpperCase()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEndIcon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Code Fest</span>
                <span className="">v1.0.0</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<Link to={item.url} className="font-medium" />}
                >
                  {item.title}
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          isActive={item.isActive}
                          render={<Link to={item.url} />}
                        >
                          {item.title}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 rounded-xl border bg-sidebar-accent/40 p-2">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{profileLabel}</p>
                <p className="text-xs text-muted-foreground">Admin profile</p>
              </div>
              <SidebarMenuButton
                size="default"
                variant="default"
                className="size-8 w-8 shrink-0 justify-center rounded-lg p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/40"
                onClick={handleLogout}
                aria-label="Log out"
                title="Log out"
              >
                <LogOut />
              </SidebarMenuButton>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
