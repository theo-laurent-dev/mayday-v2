import { icons } from "lucide-react";
import Icon from "@/components/ui/icon";
import { ChangeEventHandler, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LucideIconsListProps {
  selectedIcon: string | null;
  setSelectedIcon: (icon: string) => void;
  // onChange: () => ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function LucideIconsList({
  selectedIcon,
  setSelectedIcon,
}: // onChange,
LucideIconsListProps) {
  const [open, setOpen] = useState(false);
  const allIcons = Object.keys(icons);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="lg">
            {selectedIcon ? (
              <>
                <Icon name={selectedIcon} className="mr-2" />
                {selectedIcon}
              </>
            ) : (
              <>Choose Icon</>
            )}
            <Input value={selectedIcon || ""} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Change icon..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {allIcons.map((i, index) => (
                  <CommandItem
                    key={index}
                    value={i}
                    onSelect={(value) => {
                      setSelectedIcon(allIcons.find((ai) => ai === i) || "");
                      setOpen(false);
                    }}
                  >
                    <Icon name={i} className="mr-2" />
                    <span>{i}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
