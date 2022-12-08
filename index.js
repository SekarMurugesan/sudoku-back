import express from "express";
import cors from "cors";
import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';



import { Sudoku } from "./Sudoku.js";
import { Util } from "./Util.js";

const app = express();

let board = [
  [0, 0, 1, 3, 0, 5],
  [2, 0, 0, 0, 4, 0],
  [0, 2, 4, 0, 0, 0],
  [0, 0, 0, 4, 0, 0],
  [1, 0, 2, 6, 5, 0],
  [0, 3, 0, 0, 1, 0],];
// let board = [
//   [3, 0, 6, 5, 0, 8],
//   [5, 2, 0, 0, 0, 0],
//   [0, 8, 7, 0, 0, 0],
//   [0, 0, 3, 0, 1, 0],
//   [9, 0, 0, 8, 6, 3],
//   [0, 5, 0, 0, 9, 0],

// ];

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname+"/public")))



app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/puzzle", (req, res) => {
  let sudoku = new Sudoku();
  let puzzle = sudoku.puzzle;
  res.status(200).send({ game: puzzle });
});

app.post("/solve", (req, res) => {
  let puzzle = [];
  Util.copyGrid(req.body.board, puzzle);
  let sudoku = new Sudoku(puzzle);
  let solution = sudoku.isSolvable();
  let solvedSudoku;
  let status;
  if (solution) {
    solvedSudoku = sudoku.solvedPuzzle;
    status = true;
  } else {
    solvedSudoku = req.body.board;
    status = false;
  }
  res.status(200).send({ solution: solvedSudoku, status: status });
});

app.post("/validate", (req, res) => {
  let puzzle = [];
  Util.copyGrid(req.body.board, puzzle);
  let sudoku = new Sudoku(puzzle);
  let status = sudoku.validate();
  res.status(200).send({ status: status });
});
