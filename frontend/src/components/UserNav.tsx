import { Link, useNavigate, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const fetchCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export function UserNavSkeleton() {
  return (
    <div className="flex items-center">
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
}

export function UserNav() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const token = localStorage.getItem("access_token");

  const { data: user, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: fetchCurrentUser,
    enabled: !!token,
    retry: false,
  });

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    queryClient.removeQueries({ queryKey: ["current-user"] });
    navigate("/");
  };

  if (isLoading) {
    return <UserNavSkeleton />;
  }

  if (!user) {
    return (
      <Button asChild variant="default" size="sm">
        <Link to="/login">Log In</Link>
      </Button>
    );
  }

  const initial = user.email.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full focus-visible:ring-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              {initial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">My Account</p>
            <p className="text-muted-foreground truncate text-xs leading-none">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="w-full cursor-pointer">
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
