const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

//ZOOS

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

server.get("/api/zoos/:id", (req, res) => {
  const id = req.params.id;
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

server.delete("/api/zoos/:id", (req, res) => {
  const id = req.params.id;

  db("zoos")
    .where({ id })
    .del()
    .then(zoo => {
      if (zoo) {
        res
          .status(200)
          .json({ message: "This zoo has been successfully deleted." });
      } else {
        res.status(404).json({ message: "Zoo not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "This zoo could not be deleted." });
    });
});

server.put("/api/zoos/:id", (req, res) => {
  const id = req.params.id;
  const changedZoo = req.body;

  db("zoos")
    .where({ id })
    .first()
    .update(changedZoo)
    .then(count => {
      if (count) {
        res.status(200).json(changedZoo);
      } else {
        res.status(404).json({ message: "Zoo not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "This zoo could not be edited." });
    });
});

// BEARS

server.post(`/api/bears`, (req, res) => {
  const bear = req.body;

  if (bear.name) {
    db.insert(bear)
      .into("bears")
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

server.get("/api/bears/:id", (req, res) => {
  const id = req.params.id;
  db("bears")
    .where({ id })
    .first()
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ message: "Bear not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.delete("/api/bears/:id", (req, res) => {
  const id = req.params.id;

  db("bears")
    .where({ id })
    .del()
    .then(bear => {
      if (bear) {
        res
          .status(200)
          .json({ message: "This bear has been successfully deleted." });
      } else {
        res.status(404).json({ message: "Bear not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "This bear could not be deleted." });
    });
});

server.put("/api/bears/:id", (req, res) => {
  const id = req.params.id;
  const changedBear = req.body;

  db("bears")
    .where({ id })
    .first()
    .update(changedBear)
    .then(count => {
      if (count) {
        res.status(200).json(changedBear);
      } else {
        res.status(404).json({ message: "Bear not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "This bear could not be edited." });
    });
});

//

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
