var model = require('../model/model');

async function createPuzzle(req, res, next) {
    var id = req.user.id;
    var puzzle = {
        user_id: id,
        last_time: req.body.last_time
    }
    try {
        var result = await model.Create("puzzle", puzzle);
        res.status(200).json({message: "Create successfully"})
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getPuzzle(req, res, next) {
    var id = req.user.id;
    try {
        var result = await model.GetAllByField("puzzle", "user_id", id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function updatePuzzle(req, res, next) {
    var id = req.params.id;
    var puzzle = {
        ...req.body
    }
    try {
        var result = await model.Update("puzzle", puzzle, id);
        puzzle.id = id;
        res.status(200).json(puzzle)
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    createPuzzle: createPuzzle,
    getPuzzle: getPuzzle,
    updatePuzzle: updatePuzzle
}