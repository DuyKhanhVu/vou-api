var model = require('../model/model');
var puzzleModel = require('../model/puzzleModel');
var voucherModel = require('../model/voucherModel');

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
        var turn = parseInt((now - last_time) / (4000 * 60 * 60));
        result[0].number_of_turn += turn;
        if (result[0].number_of_turn > 6) {
            result[0].number_of_turn = 6;
        } else {
            result[0].number_of_turn += turn;
        }

        try {
            await model.Update("puzzle", result[0], result[0].id);
        } catch (err) {
            return res.status(400).json(err);
        }

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
        return res.status(200).json(result)
    } catch (err) {
        return res.status(400).json({ message: 'Cant get puzzle' });
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
                case 0:
                    puzzle[0].piece1++;
                    break;
                case 1:
                    puzzle[0].piece2++;
                    break;
                case 2:
                    puzzle[0].piece3++;
                    break;
                case 3:
                    puzzle[0].piece4++;
                    break;
                case 4:
                    puzzle[0].piece5++;
                    break;
                case 5:
                    puzzle[0].piece6++;
                    break;
                case 6:
                    puzzle[0].piece7++;
                    break;
                case 7:
                    puzzle[0].piece8++;
                    break;
                case 8:
                    puzzle[0].piece9++;
                    break;
                case 9:
                    puzzle[0].piece10++;
                    break;
                case 10:
                    puzzle[0].piece11++;
                    break;
                case 11:
                    puzzle[0].piece12++;
                    break;
            }
            puzzle[0].number_of_turn--;
            puzzle[0].last_time = new Date();

            await model.Update("puzzle", puzzle, id);

            var pieces = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            pieces[random] = 1;
            var transation = {
                id_source: 1,
                id_target: req.user.id,
                pieces: JSON.stringify(pieces),
                created_at: new Date()
        
            }
            await model.Create('piece_transfer_history', transation)

            res.status(200).json({ index: random });
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

async function transferPiece(req, res, next) {
    var idSource = req.user.id;
    var idTarget = req.body.id_target;
    var pieces = req.body.pieces;
    try {
        var puzzleSource = await model.GetAllByField('puzzle', 'user_id', idSource);
        var puzzleTarget = await model.GetAllByField('puzzle', 'user_id', idTarget);
    } catch (err) {
        return res.status(400).json(err)
    }

    if (pieces[0] != 0) {
        puzzleSource[0].piece1 -= pieces[0];
        puzzleTarget[0].piece1 += pieces[0];
    }

    if (pieces[1] != 0) {
        puzzleSource[0].piece2 -= pieces[1];
        puzzleTarget[0].piece2 += pieces[1];
    }

    if (pieces[2] != 0) {
        puzzleSource[0].piece3 -= pieces[2];
        puzzleTarget[0].piece3 += pieces[2];
    }

    if (pieces[3] != 0) {
        puzzleSource[0].piece4 -= pieces[3];
        puzzleTarget[0].piece4 += pieces[3];
    }

    if (pieces[4] != 0) {
        puzzleSource[0].piece5 -= pieces[4];
        puzzleTarget[0].piece5 += pieces[4];
    }

    if (pieces[5] != 0) {
        puzzleSource[0].piece6 -= pieces[5];
        puzzleTarget[0].piece6 += pieces[5];
    }

    if (pieces[6] != 0) {
        puzzleSource[0].piece7 -= pieces[6];
        puzzleTarget[0].piece7 += pieces[6];
    }

    if (pieces[7] != 0) {
        puzzleSource[0].piece8 -= pieces[7];
        puzzleTarget[0].piece8 += pieces[7];
    }

    if (pieces[8] != 0) {
        puzzleSource[0].piece9 -= pieces[8];
        puzzleTarget[0].piece9 += pieces[8];
    }

    if (pieces[9] != 0) {
        puzzleSource[0].piece10 -= pieces[9];
        puzzleTarget[0].piece10 += pieces[9];
    }

    if (pieces[10] != 0) {
        puzzleSource[0].piece11 -= pieces[10];
        puzzleTarget[0].piece11 += pieces[10];
    }

    if (pieces[11] != 0) {
        puzzleSource[0].piece12 -= pieces[11];
        puzzleTarget[0].piece12 += pieces[11];
    }

    var transation = {
        id_source: idSource,
        id_target: idTarget,
        pieces: JSON.stringify(pieces),
        created_at: new Date()

    }


    try {
        await model.Update('puzzle', puzzleSource[0], puzzleSource[0].id);
        await model.Update('puzzle', puzzleTarget[0], puzzleTarget[0].id);
        await model.Create('piece_transfer_history', transation)
        return res.status(200).json({ message: 'Tranfer sucessfully!!!' })
    } catch (err) {
        return res.status(400).json(err)
    }
}

async function getTransferPieceHistory(req, res, next) {
    var id = req.user.id;
    try {
        var result = await puzzleModel.GetTransferPieceHistoryByUserId(id);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(400).json(err);
    }
}

async function getVoucher(req, res, next) {
    var campaign = await model.GetAllByField('campaign', 'partner_id', 1);
    
    var result = {}
    try {
        result = await voucherModel.GetOneByCampaignId(campaign[0].id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }

    await model.Update("voucher", { available: false }, result.id);
    user_voucher = {
        user_id: req.user.id,
        voucher_id: result.id,
        available: true,
        created_at: new Date(),
    }
    await model.Create("user_voucher", user_voucher);

    await puzzleModel.UpdatePiecesAfterGetVoucher(req.user.id)
}

module.exports = {
    createPuzzle: createPuzzle,
    getPuzzle: getPuzzle,
    getNewPiece: getNewPiece,
    transferPiece: transferPiece,
    getTransferPieceHistory: getTransferPieceHistory,
    getVoucher: getVoucher,
}