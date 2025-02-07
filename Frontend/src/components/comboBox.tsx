"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

interface Employee {
  id: number;
  name: string;
  role: string;
}

export function ComboboxDemo({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [selectedEmployeeName, setSelectedEmployeeName] = React.useState<string>("Select Employee");

  React.useEffect(() => {
    axios.get("http://localhost:8080/Employee") 
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  React.useEffect(() => {
    const selectedEmployee = employees.find((employee) => employee.id.toString() === value);
    setSelectedEmployeeName(selectedEmployee ? selectedEmployee.name : "Select Employee");
  }, [value, employees]);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedEmployeeName}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-20" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width]">
          <Command className="w-full">
            <CommandInput placeholder="Search employee..." className="w-full p-0" />
            <CommandList className="w-full">
              <CommandEmpty className="w-full p-0">No employee found.</CommandEmpty>
              <CommandGroup className="w-full">
                {employees.map((employee) => (
                  <CommandItem
                    className="w-full flex items-center justify-between"
                    key={employee.id}
                    value={employee.name} 
                    onSelect={() => {
                      onChange(employee.id.toString()); // Send employee.id
                      setSelectedEmployeeName(employee.name); // Show employee.name
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === employee.id.toString() ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className="w-full p-0">{employee.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{employee.role}</span>
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
