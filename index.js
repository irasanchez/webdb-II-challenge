const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post(`/api/zoos`, (req, res) => {
  const zoo = req.body;

  if (zoo.name) {
    db.insert(zoo)
      .into("zoos")
      .then(ids => {
        res.status(201).json(ids[0]);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({
      error: `The zoo doesn\'t even have a name? That's sad. Let's give it one and try again`
    });
  }
});

// ### `GET /api/zoos/:id`

// When the client makes a `GET` request to `/api/zoos/:id`, find the _zoo_ associated with the given `id`. Remember to handle errors and send the correct status code.

server.get(`api/zoos/:id`, (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: "Zoo not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ### DELETE /api/zoos/:id

// When the client makes a `DELETE` request to this endpoint, the _zoo_ that has the provided `id` should be removed from the database.

// ### PUT /api/zoos/:id

// When the client makes a `PUT` request to this endpoint passing an object with the changes, the _zoo_ with the provided `id` should be updated with the new information.

//

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
