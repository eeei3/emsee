import db from "@/db";
import { eq } from "drizzle-orm";
import { events } from "@/db/schema";

async function check_event_id(event_id = 0) {
    let res = false;
    if (isNaN(event_id)) {
	return res;
    }
    const results = await db.select({
      id: events.id,
    }).from(events);
    for (let i = 0; i < results.length; i++) {
	const { id } = results[i];
	if (id == event_id) {
	    res = true;
	}
    }
    return res;
}

function check_input_details(event_details : Map<string,string>) {
    if ((event_details == null) || !(event_details instanceof Map)) {
	return false;
    }  

    if (!check_event_id(Number(event_details.get("id")))) {
	return false;
    }
    let match = 0;
    const event_entries = ["id", "event_name", "desc", "loc", "time", "cost", "max_att", "curr_att"]
    for (const entry of event_details.entries()) {
	if (event_entries.includes(entry[0])) {
	    match++;
	}
    }
    if (match == 8)
	return true;
    else {
	return false;
    }
}

export async function update_event_details(event_details: Map<string, string>) {
    if (!check_input_details(event_details)) {
	return -1;
    }
    const event_id = Number(event_details.get("id"));
    const cost = Number(event_details.get("cost"));
    const max_att = Number(event_details.get("max_att"));
    const curr_att = Number(event_details.get("curr_att"));
    const event_time = new Date(String(event_details.get("time")));
    if (!isNaN(event_id) && !isNaN(cost) && !isNaN(max_att) && !isNaN(curr_att) && !isNaN(event_time.valueOf())) {
	try {
	    const updatedId: { target_id: number }[] = await db.update(events).set({
		event_name:event_details.get("event_name"), 
		desc: event_details.get("desc"),
		loc: event_details.get("loc"),
		time: event_time,
		cost: cost,
		max_att: max_att,
		curr_att: curr_att,
	    })
	    .where(eq(events.id, event_id))
	    .returning({ target_id : events.id });
	    if (isNaN(updatedId[0].target_id)) {
		return -3;
	    }
	    return 0;
	}
	catch(error) {
	    console.log(error)
	    return -2;
	}
    }
}

export async function read_event_details(event_id=0) {
    let res = null;
    if (!isNaN(event_id)) {
	try {
	    const results = await db.select().from(events);
	    for (let i = 0; i < results.length; i++) {
		if (results[i].id == event_id) {
		    res = JSON.stringify(results[i]);
		}
	    }
	}
	catch(error) {
	    console.log(error)
	}
    }
    if (res == null)
	return "";
    return res;
}
