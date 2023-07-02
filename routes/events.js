const { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent } = require("../controller/eventsController");
const { verifyUser } = require("../middlewares/authMiddleware");
const router = require("express").Router();

// GET route to retrieve all events
router.get("/", verifyUser, getAllEvents);

// POST route to create a new event
router.post("/", verifyUser, createEvent);

// GET route to retrieve a specific event by ID
router.get("/:id", verifyUser, getEventById);

// PUT route to update a specific event by ID
router.put("/:id", verifyUser, updateEvent);

// DELETE route to delete a specific event by ID
router.delete("/:id", verifyUser, deleteEvent);

module.exports = router;
