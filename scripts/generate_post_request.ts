import "dotenv/config";

// First should work
// Second should fail because we are missing one entry
// Third should fail because bad we are inputting a bad time.
const seedEvents = [
    { event_name: "fun party", desc: "I really really promise it's fun", loc: "IA 2070", event_time: "2023-10-11T14:48:00", cost: '0.0', max_att: '33', curr_att: '33'},
    { desc: "It can't get worse", loc: "Nowhere", event_time: "2096-10-10T22:00:00", cost: '10.99', max_att: '0', curr_att: '5'},
    { event_name: "Welcome Party", desc: "You showed up", loc: "3325 Ellesmere Road", event_time: "bad date", cost: '0.00', max_att: '20', curr_att: '15'},
];

(async () => {
    console.log(JSON.stringify(seedEvents[0]));
    const test = await fetch("http://127.0.0.1:3000/api/eventdetails/1", {
    method: "POST",
    body: JSON.stringify(seedEvents[0]),
    });
    const test1 = await test.json();
    console.log(test1);
})();

(async () => {
    console.log(JSON.stringify(seedEvents[1]));
    const test = await fetch("http://127.0.0.1:3000/api/eventdetails/2", {
    method: "POST",
    body: JSON.stringify(seedEvents[1]),
    });
    const test1 = await test.json();
    console.log(test1);
    // console.log(test.body);
})();

(async () => {
    console.log(JSON.stringify(seedEvents[2]));
    const test = await fetch("http://127.0.0.1:3000/api/eventdetails/3", {
    method: "POST",
    body: JSON.stringify(seedEvents[2]),
    });
    const test1 = await test.json();
    console.log(test1);
    // console.log(test.body);
})();
