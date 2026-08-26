import { Carousel } from "@/components/Carousel";
import { TaskTile } from "@/components/TaskList";
import { onlineServices } from "@/data/online-services";

/**
 * The online services, as a carousel.
 *
 * Worth knowing what the trade is: a carousel is a worse directory than a
 * grid. GOV.UK dropped theirs because people rarely reach past the first
 * panel, and this is the list of things residents actually came to do.
 *
 * What keeps that from being a real loss here is that nothing is hidden.
 * The underlying element is a scroll container, so every one of the twelve
 * services stays in the page, in order, reachable by keyboard and screen
 * reader whether or not the script runs. The carousel is presentation over
 * a list that is still a list.
 */
export function OnlineServicesGrid() {
  return (
    <Carousel label="Online services" itemCount={onlineServices.length}>
      <ul className="carousel-track">
        {onlineServices.map((service) => (
          <li key={service.label} className="carousel-slide" data-carousel-slide>
            <TaskTile
              task={{
                label: service.label,
                href: service.href,
                detail: service.href.startsWith("http") ? "State of Maine service" : undefined,
              }}
            />
          </li>
        ))}
      </ul>
    </Carousel>
  );
}
