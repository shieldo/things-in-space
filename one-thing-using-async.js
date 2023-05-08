async function fetchTheThingInSpace() {
  let response; // we have to declare `response` as a variable with `let` because the assignment happens within a try/catch block
  try {
    response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-04-29&end_date=2023-05-06&api_key=kaWp2AWC0g0PqDuulsZqbKa2BqZZBZ02kGGUyaIJ`
    );
  } catch (e) {
    console.error(
      "Couldn't connect to NASA 🚀. Are you connected to the internet?"
    );
    return;
  }

  const data = await response.json(); // Response.prototype.json() returns a promise
  const thingId = data.near_earth_objects["2023-05-05"][0]["neo_reference_id"];
  const thingResponse = await fetch(
    `https://api.nasa.gov/neo/rest/v1/neo/${thingId}?api_key=kaWp2AWC0g0PqDuulsZqbKa2BqZZBZ02kGGUyaIJ`
  );
  const thingData = await thingResponse.json();
  console.log(thingData.name); // just output the name of the first asteroid
}

fetchTheThingInSpace();
