import AsciiTable from "ascii-table";
import Winner from "./Winner.js";

class HelpTable {
  static createTable(moves) {
    const ways = 'v PC | User >';
    const table = new AsciiTable('Help table');
    const firstTableRow = [ways, ...moves];
    table.setHeading(...firstTableRow);

    for (let i = 0; i < moves.length; i++) {
      const tableRow = [];
      for (let j = 0; j < firstTableRow.length; j++) {
        if (firstTableRow[j] === ways) {
          tableRow.push(moves[i]);
        } else {
          const result = Winner.checkResultForHelpTable(moves, moves[i], firstTableRow[j]);
          tableRow.push(result);
        }
      }
      table.addRow(...tableRow);
    }
    console.log(table.toString());
  }
}

export default HelpTable;
