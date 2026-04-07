import Link from "next/link";
import db from "@/db";
import { clubs, events } from "@/db/schema";
import { eq, gte } from "drizzle-orm";

type EventRow = {
	id: number;
	name: string;
	description: string | null;
	date: string;
	location: string | null;
	budget: number | null;
	clubName: string;
};

function EventList({ events }: { events: EventRow[] }) {
	const grouped = Object.groupBy(events, e => e.clubName);

	return (
		<div className="space-y-12">
			{Object.entries(grouped).map(([clubName, clubEvents]) => (
				<section key={clubName}>
					<h2 className="mb-4 border-b border-border pb-3 font-mono text-lg font-medium tracking-tight">
						{clubName}
					</h2>
					<div>
						{clubEvents!.map(event => (
							<details
								key={event.id}
								className="group border-b border-border-row transition-colors hover:bg-surface"
							>
								<summary className="flex cursor-pointer items-baseline justify-between gap-4 py-4 list-none">
									<span className="font-mono text-sm font-medium transition-colors group-hover:text-white">
										{event.name}
									</span>
									<span className="shrink-0 font-mono text-xs text-faint">
										{event.date}
									</span>
								</summary>
								<div className="space-y-2 pb-4 pl-1">
									{event.description && (
										<p className="font-mono text-sm text-muted leading-relaxed">
											{event.description}
										</p>
									)}
									{event.location && (
										<p className="font-mono text-xs text-faint">
											Location:{" "}
											<span className="text-muted">
												{event.location}
											</span>
										</p>
									)}
									{event.budget != null && (
										<p className="font-mono text-xs text-faint">
											Budget:{" "}
											<span className="text-muted">
												$
												{(event.budget / 100).toFixed(
													2,
												)}
											</span>
										</p>
									)}
								</div>
							</details>
						))}
					</div>
				</section>
			))}
		</div>
	);
}

export default async function EventsPage() {
	const today = new Date().toISOString().split("T")[0];

	const allFutureEvents = await db
		.select({
			id: events.id,
			name: events.name,
			description: events.description,
			date: events.date,
			location: events.location,
			budget: events.budget,
			clubName: clubs.name,
		})
		.from(events)
		.innerJoin(clubs, eq(events.clubId, clubs.id))
		.where(gte(events.date, today))
		.orderBy(events.date);

	return (
		<main className="min-h-screen selection:bg-accent selection:text-black">
			<div className="relative mx-auto max-w-6xl px-8 py-16 md:py-24">
				<header className="mb-16 flex items-center justify-between">
					<h1 className="font-mono text-6xl font-light tracking-tight md:text-8xl">
						Events
						<span className="ml-4 inline-block text-accent">.</span>
					</h1>
					<Link
						href="/events/new"
						className="flex h-10 w-10 items-center justify-center bg-accent font-mono text-3xl text-black transition-opacity hover:opacity-80"
						title="Create event"
					>
						+
					</Link>
				</header>

				{allFutureEvents.length === 0 ? (
					<div className="border border-border bg-surface p-12 text-center">
						<p className="font-mono text-sm text-dimmed">
							No upcoming events. Create one to get started.
						</p>
					</div>
				) : (
					<EventList events={allFutureEvents} />
				)}
			</div>
		</main>
	);
}
