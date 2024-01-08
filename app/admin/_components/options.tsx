"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertOctagon,
  GanttChart,
  Group,
  PlusCircle,
  Settings,
  Tag,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Options() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>Administration</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Users className="mr-2 h-4 w-4" />
                <span>Utilisateurs</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Link
                      href={`/admin/users`}
                      className="flex items-center space-x-2 w-full"
                    >
                      <GanttChart className="h-4 w-4" />
                      <span>Liste</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      href={`/admin/users/new`}
                      className="flex items-center space-x-2"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>Créer</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Tag className="mr-2 h-4 w-4" />
                <span>Profils</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Link
                      href={`/admin/profiles`}
                      className="flex items-center space-x-2 w-full"
                    >
                      <GanttChart className="h-4 w-4" />
                      <span>Liste</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      href={`/admin/profiles/new`}
                      className="flex items-center space-x-2"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>Créer</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <GanttChart className="mr-2 h-4 w-4" />
                <span>Fiches</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <AlertOctagon className="mr-2 h-4 w-4" />
                      <span>Obsoletes</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Link
                            href={`/admin/sheets/obsoletes`}
                            className="flex items-center space-x-2 w-full"
                          >
                            <GanttChart className="h-4 w-4" />
                            <span>Liste</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <GanttChart className="mr-2 h-4 w-4" />
                      <span>ServiceNow</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Group className="mr-2 h-4 w-4" />
                            <span>Catégories</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>
                                <GanttChart className="mr-2 h-4 w-4" />
                                <span>Liste</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                <span>Créer</span>
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Group className="mr-2 h-4 w-4" />
                            <span>Sous-catégories</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>
                                <GanttChart className="mr-2 h-4 w-4" />
                                <span>Liste</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                <span>Créer</span>
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Group className="mr-2 h-4 w-4" />
                            <span>Types de catégories</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>
                                <GanttChart className="mr-2 h-4 w-4" />
                                <span>Liste</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                <span>Créer</span>
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Paramètrages</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
