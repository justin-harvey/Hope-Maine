import { Icon } from "@/components/ui/icon";
import { onlineServices } from "@/data/online-services";

export function OnlineServicesGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {onlineServices.map((service) => {
        const isExternal = service.href.startsWith("http");
        return (
          <a
            key={service.label}
            href={service.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="flex items-center justify-between gap-2 rounded-2xl border border-blue-900/10 bg-cream-50 px-4 py-3 body-sm font-medium text-blue-900 shadow-sm transition-colors hover:border-blue-700 hover:text-blue-700"
          >
            <span className="flex items-center gap-2">
              <Icon name="chevron-right" size="xs" className="shrink-0 text-blue-700" />
              {service.label}
            </span>
            {isExternal && <Icon name="external-link" size="xs" className="shrink-0 text-slate-400" />}
          </a>
        );
      })}
    </div>
  );
}
