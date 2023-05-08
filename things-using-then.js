let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

const apiKey = "kaWp2AWC0g0PqDuulsZqbKa2BqZZBZ02kGGUyaIJ";

fetch(
  `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formatDate(
    yesterday
  )}&end_date=${formatDate(yesterday)}&api_key=${apiKey}`
)
  .then((response) => response.json())
  .then((data) =>
    data.near_earth_objects[formatDate(yesterday)].map(
      (thing) => thing.neo_reference_id
    )
  )
  .then((thingIds) =>
    Promise.all(
      thingIds.map((thingId) =>
        fetch(
          `https://api.nasa.gov/neo/rest/v1/neo/${thingId}?api_key=${apiKey}`
        )
      )
    )
  )
  .then((responses) =>
    Promise.all(responses.map((response) => response.json()))
  )
  .then((things) => {
    const now = Date.now();
    const asteroids = things.map((thing) => {
      const nextNearEarthEvent = thing.close_approach_data.find(
        (event) =>
          event.epoch_date_close_approach > now &&
          event.orbiting_body === "Earth"
      ); // there are many events in the data for being close to planets (Earth or Venus) - pick the first one in the future that relates to Earth
      return {
        name: thing.designation,
        nextNearEarthEventTime: nextNearEarthEvent.close_approach_date_full,
        distanceFromEarthInKm: Math.round(
          nextNearEarthEvent.miss_distance.kilometers
        ),
      };
    });
    asteroids.sort((a, b) =>
      a.nextNearEarthEventTime < b.nextNearEarthEventTime ? -1 : 1
    ); // sort the asteroids by time they next come closest to Earth
    console.log("");
    console.log(
      `There were ${
        asteroids.length
      } things in space near the Earth yesterday (${yesterday.toLocaleDateString(
        "en-GB",
        { weekday: "long", day: "numeric", month: "long", year: "numeric" }
      )}):`
    );
    console.log("");
    asteroids.map((asteroid) => {
      console.log(
        `${asteroid.name} - on ${
          asteroid.nextNearEarthEventTime
        } this will be ${asteroid.distanceFromEarthInKm.toLocaleString()}km from Earth`
      );
    });
  })
  .catch(() => {
    console.error(
      "Couldn't connect to NASA 🚀. Are you connected to the internet?"
    );
  });
