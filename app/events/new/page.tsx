import { redirect } from "next/navigation";
import db from "@/db";
import { clubs, events } from "@/db/schema";

export default async function NewEventPage() {
	const allClubs = await db.select().from(clubs).orderBy(clubs.name);

	async function createEvent(formData: FormData) {
		"use server";
		const budgetStr = formData.get("budget") as string;
		const [_inserted] = await db
			.insert(events)
			.values({
				name: (formData.get("name") as string).trim(),
				description:
					(formData.get("description") as string).trim() || null,
				date: formData.get("date") as string,
				location: (formData.get("location") as string).trim() || null,
				budget: budgetStr
					? Math.round(parseFloat(budgetStr) * 100)
					: null,
				clubId: parseInt(formData.get("clubId") as string, 10),
			})
			.returning({ id: events.id });
		redirect(`/events`);
	}

	const inputClass =
		"w-full border border-border-strong bg-surface px-4 py-3 font-mono text-sm outline-none transition-colors focus:border-accent";

	return (
		<main className="min-h-screen selection:bg-accent selection:text-black">
			<div className="mx-auto max-w-xl px-8 py-16 md:py-24">
				<h1 className="mb-12 font-mono text-4xl font-light tracking-tight md:text-6xl">
					New Event<span className="ml-3 text-accent">.</span>
				</h1>

				<form action={createEvent} className="space-y-6">
					<select name="clubId" required className={inputClass}>
						<option value="">Club</option>
						{allClubs.map(c => (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						))}
					</select>

					<input
						name="name"
						required
						placeholder="Event name"
						className={inputClass}
					/>

					<textarea
						name="description"
						rows={3}
						placeholder="Description"
						className={`${inputClass} resize-none`}
					/>

					<input
						type="date"
						name="date"
						required
						className={`${inputClass} scheme-dark`}
					/>

					<input
						name="location"
						placeholder="Location"
						className={inputClass}
					/>

					<div className="relative">
						<span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-faint">
							$
						</span>
						<input
							type="number"
							name="budget"
							step="0.01"
							min="0"
							placeholder="0.00"
							className={`${inputClass} pl-8`}
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-accent py-3 font-mono text-sm font-medium tracking-wider text-black uppercase transition-opacity hover:opacity-80"
					>
						Create Event
					</button>
				</form>
			</div>
		</main>
	);
}
