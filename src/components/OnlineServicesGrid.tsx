import { TaskGrid } from "@/components/TaskList";
import { onlineServices } from "@/data/online-services";

export function OnlineServicesGrid() {
  return (
    <TaskGrid
      tasks={onlineServices.map((service) => ({
        label: service.label,
        href: service.href,
        detail: service.href.startsWith("http") ? "State of Maine service" : undefined,
      }))}
    />
  );
}
