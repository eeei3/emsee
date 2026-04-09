import { NextResponse } from "next/server";
import { read_event_details, update_event_details } from "@/lib/event_details"

export async function POST(
    request: Request,
    { params }: { params: Promise<{ event_id: string }> }
) {
  try {
    const { event_id } = await params;

    let parsed_event_details = null;
    let raw_event_details = ""; 

    try {
	try {
	    raw_event_details = await request.text();
	    parsed_event_details = JSON.parse(raw_event_details);
	    parsed_event_details["id"] = event_id;
	}
	catch {
	    return NextResponse.json(
		{ status: "error", message: "Malformed data" },
		{ status: 500 }
	    );
	}
	const event_details : Map<string,string> = new Map(Object.entries(parsed_event_details));
	let ret_msg = "";
	let status = "";
	let status_code = 0;
	switch (await update_event_details(event_details))
	{
	    case 0:
		ret_msg = "Successfully modified database";
		status = "ok"
		status_code = 200;
		break;
	    case -1:
		ret_msg = "Bad data";
		status = "error"
		status_code = 500;
		break;
	    case -2:
		ret_msg = "Issue reading database";
		status = "error"
		status_code = 500;
		break;	        
	    case -3:
		ret_msg = "Invalid Event";
		status = "error"
		status_code = 404;
		break;	        
	}
	return NextResponse.json(
	    { status: status, message: ret_msg },
	    { status: status_code }
	);
    } catch(error) {
	console.log(error);
	return NextResponse.json(
	    { status: "error", message: "A serious error has occured!" },
	    { status: 500 }
	);
    }
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ event_id : string }> }
) {
    try {
	let ret_msg = "";
	let status = "";
	let status_code = 0;
	const { event_id } = await params
	const result = await read_event_details(Number(event_id));
	if (result != "") {
	    ret_msg = result;
	    status = "ok";
	    status_code = 200;
	}
	else {
	    ret_msg = "Invalid Event"
	    status = "error";
	    status_code = 500;
	}
	return NextResponse.json({ status: status, message: ret_msg},
				 { status: status_code });

    } catch (error) {
	return NextResponse.json(
	{ status: "error", message: (error as Error).message },
	{ status: 500 }
	);
    }
}
