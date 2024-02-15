"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { UpdateAssignmentGroup } from "@/app/admin/sheets/servicenow/assignmentgroups/_components/update-assignmentgroup";

export default function AssignmentGroupsList() {
  const utils = trpc.useContext();
  const { data: assignmentgroups, isLoading } =
    trpc.getServicenowAssignmentGroups.useQuery();
  const { mutate: deleteServicenowAssignmentGroup, isLoading: isDeleting } =
    trpc.deleteServicenowAssignmentGroup.useMutation({
      onSuccess: () => {
        utils.getServicenowAssignmentGroups.reset();
        toast({
          title: "Groupe d'assignation supprimé !",
        });
      },
    });

  const handleDelete = (id: string) => {
    deleteServicenowAssignmentGroup({ id });
  };

  if (isLoading) {
    return "Chargement ...";
  }
  return (
    <div className="space-y-2">
      {assignmentgroups &&
        assignmentgroups.map((assignmentgroup, index) => (
          <div key={index}>
            <div>
              <h4 className="text-muted-foreground">
                {assignmentgroup.name} ({assignmentgroup.items.length})
              </h4>
            </div>
            <div className="space-y-2">
              {assignmentgroup.items.length > 0 &&
                assignmentgroup.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-50 w-full rounded-lg p-2"
                  >
                    <div className="flex items-center space-x-2 ml-4">
                      <div className="space-x-2">
                        <span>{item.label}</span>
                        <span className="text-muted-foreground italic">
                          ({item.name})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <UpdateAssignmentGroup assignmentgroupId={item.id} />
                      <Button
                        variant="ghost"
                        className="hover:text-red-500 transition-all ease-in-out"
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
