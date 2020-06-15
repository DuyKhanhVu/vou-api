var model = require('../model/model');

async function createPuzzle(req, res, next) {
    var id = req.user.id;
    var puzzle = {
        user_id: id
    }
    try {
        var result = await model.Create("puzzle", puzzle);
        res.status(201).json({ message: "Create successfully" })
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getPuzzle(req, res, next) {
    var id = req.user.id;
    try {
        var result = await model.GetAllByField("puzzle", "user_id", id);
        var last_time = result[0].last_time;
        var now = new Date()
        var turn = parseInt((now - last_time) / (4 * 60 * 60));
        result[0].number_of_turn += turn;
        if (result[0].number_of_turn > 6) {
            result[0].number_of_turn = 6;
        } else {
            result[0].number_of_turn = number_of_turn;
        }

        await model.Update("puzzle", result[0], result[0].id);
        result[0].pieces = [result[0].piece1, result[0].piece2, result[0].piece3, result[0].piece4, result[0].piece5, result[0].piece6, result[0].piece7, result[0].piece8, result[0].piece9, result[0].piece10, result[0].piece11, result[0].piece12]
        delete result[0].piece1
        delete result[0].piece2
        delete result[0].piece3
        delete result[0].piece4
        delete result[0].piece5
        delete result[0].piece6
        delete result[0].piece7
        delete result[0].piece8
        delete result[0].piece9
        delete result[0].piece10
        delete result[0].piece11
        delete result[0].piece12
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getNewPiece(req, res, next) {
    var id = req.params.id;
    try {
        var puzzle = await model.GetById("puzzle", id);
    } catch (err) {
        res.status(400).json(err)
    }

    if (puzzle[0].number_of_turn <= 0) {
        return res.status(400).json({ message: "Oops!!" })
    } else {
        try {
            var random = Math.floor(Math.random() * Math.floor(12));
            switch (random) {
                case 1:
                    puzzle[0].piece1++;
                    break;
                case 2:
                    puzzle[0].piece2++;
                    break;
                case 3:
                    puzzle[0].piece3++;
                    break;
                case 4:
                    puzzle[0].piece4++;
                    break;
                case 5:
                    puzzle[0].piece5++;
                    break;
                case 6:
                    puzzle[0].piece6++;
                    break;
                case 7:
                    puzzle[0].piece7++;
                    break;
                case 8:
                    puzzle[0].piece8++;
                    break;
                case 9:
                    puzzle[0].piece9++;
                    break;
                case 10:
                    puzzle[0].piece10++;
                    break;
                case 11:
                    puzzle[0].piece11++;
                    break;
                case 12:
                    puzzle[0].piece12++;
                    break;
            }
            puzzle[0].number_of_turn--;
            puzzle[0].last_time = new Date();

            var result = await model.Update("puzzle", puzzle, id);
            res.status(200).json({index: random});
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

module.exports = {
    createPuzzle: createPuzzle,
    getPuzzle: getPuzzle,
    getNewPiece: getNewPiece
}