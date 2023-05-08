fetch(
  `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-04-29&end_date=2023-05-06&api_key=kaWp2AWC0g0PqDuulsZqbKa2BqZZBZ02kGGUyaIJ`
) // resolves to a promise, so it has a .then() method
  .then((response) => response.json())
  .then((data) => data.near_earth_objects["2023-05-05"][0]["neo_reference_id"])
  .then(
    (thingId) =>
      fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${thingId}?api_key=kaWp2AWC0g0PqDuulsZqbKa2BqZZBZ02kGGUyaIJ`
      ) // we can also return a promise from a function we're passing to .then()
  )
  .then((response) => response.json())
  .then((thingData) => console.log(thingData.name)) // just output the first asteroid's name
  .catch(() => {
    console.error(
      "Couldn't connect to NASA 🚀. Are you connected to the internet?"
    );
  });
