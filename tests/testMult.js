const cc = require('.././src/lang.js');
const dag = require('.././src/dag.js');
const utils = require('.././src/utils.js');


function workflow() {

	let colsInOne = [
		utils.defCol("a", "INTEGER", 1),
		utils.defCol("b", "INTEGER", 1)
	];

	let colsInTwo = [
		utils.defCol("a", "INTEGER", 2),
		utils.defCol("b", "INTEGER", 2)
	];

	let inOne = cc.create("inOne", colsInOne, new Set([1]));
	let inTwo = cc.create("inTwo", colsInTwo, new Set([2]));

	let c = cc.concatenate([inOne, inTwo], "con", ["a", "b"]);
	let m = cc.multiply(c, "mult", "b", ["b", 10]);

	let o = cc.collect(m, "opened", 1);

	return new Set([inOne, inTwo]);
}

let d = new dag.Dag(workflow());

if (d.toStr() === "name: create\n" +
	"children: concat\n" +
	"parents: \n" +
	"\n" +
	"name: create\n" +
	"children: concat\n" +
	"parents: \n" +
	"\n" +
	"name: concat\n" +
	"children: multiply\n" +
	"parents: create, create\n" +
	"\n" +
	"name: multiply\n" +
	"children: open\n" +
	"parents: concat\n" +
	"\n" +
	"name: open\n" +
	"children: \n" +
	"parents: multiply") {
	console.log("testMult.js Passed.\n");
} else {
	console.log("testMult.js Failed.\n");
}