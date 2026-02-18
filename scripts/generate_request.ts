import "dotenv/config";
import db from "../db";
import { clubs, events } from "../db/schema";

const seedEvents = [
    { event_name: "fun party", desc: "I really really promise it's fun", loc: "IA 2070", time: "2023-10-11T14:48:00", cost: '0.0', max_att: '33', curr_att: '33'},
    { desc: "It can't get worse", loc: "Nowhere", time: "2096-10-10T22:00:00", cost: '10.99', max_att: 0, curr_att: 5},
    { event_name: "Welcome Party", desc: "You showed up", loc: "3325 Ellesmere Road", time: new Date("arg"), cost: 0.00, max_att: 20, curr_att: 15},
];

// async function seed() {
//   console.log("Seeding database...");
//
//   for (const club of seedClubs) {
//     await db
//       .insert(clubs)
//       .values(club)
//       .onConflictDoNothing({ target: clubs.email });
//   }
//
//   for (const event of seedEvents) {
//     await db
//       .insert(events)
//       .values(event); 
//     }
//
//   console.log("Seeding complete.");
//   process.exit(0);
// }

// seed().catch((err) => {
//   console.error("Seeding failed:", err);
//   process.exit(1);
// });
(async () => {
    const test = await fetch("http://127.0.0.1:3000/api/eventdetails/1", {
    method: "GET",
    });
    const test1 = await test.json();
    console.log(test1);
    // console.log(test.body);
})();

(async () => {
    const test = await fetch("http://127.0.0.1:3000/api/eventdetails/2", {
    method: "GET",
    });
    const test1 = await test.json();
    console.log(test1);
    // console.log(test.body);
})();
(async () => {
    const test = await fetch("http://127.0.0.1:3000/api/eventdetails/3", {
    method: "GET",
    });
    const test1 = await test.json();
    console.log(test1);
    // console.log(test.body);
})();


// (async () => {
//     const test = await fetch("http://127.0.0.1:3000/api/eventdetails/1", {
//     method: "GET",
//     });
//     const test1 = await test.json();
//     console.log(test1);
//     // console.log(test.body);
// })();


// const putrequest2 = new Request("localhost:3000/api/eventdetails/2", {
//   method: "GET",});
// console.log(await fetch(putrequest2));
// const putrequest3 = new Request("localhost:3000/api/eventdetails/3", {
//   method: "GET",
// });
// console.log(await fetch(putrequest3));
//
//
// const postrequest1 = new Request("localhost:3000/api/eventdetails/1", {
//   method: "POST",
//   body: JSON.stringify(seedEvents[0]),
// });
// console.log(await fetch(postrequest1));
//
// const postrequest2 = new Request("localhost:3000/api/eventdetails/2", {
//   method: "POST",
//   body: JSON.stringify(seedEvents[1]),
// });
// console.log(await fetch(postrequest2));
//
// const postrequest3 = new Request("localhost:3000/api/eventdetails/3", {
//   method: "POST",
//   body: JSON.stringify(seedEvents[2]),
// });
// console.log(await fetch(postrequest3));
//
//
// const putrequest4 = new Request("localhost:3000/api/eventdetails/1", {
//   method: "GET",
// });
// console.log(await fetch(putrequest4));
// const putrequest5 = new Request("localhost:3000/api/eventdetails/2", {
//   method: "GET",
// });
// console.log(await fetch(putrequest5));
// const putrequest6 = new Request("localhost:3000/api/eventdetails/3", {
//   method: "GET",
// });
// console.log(await fetch(putrequest6));
