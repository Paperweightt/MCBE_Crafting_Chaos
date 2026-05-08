import * as fs from "node:fs";
import seedrandom from "seedrandom";
import path from "node:path";

import { getRecipes, Recipe } from "./get_recipes.ts";
import { RecipeItem, getData, getOutput, getType, setOutput } from "./format_recipe.ts";

const rng = seedrandom("123");
const config = {
  outputDir: "./behavior_packs/Recipe_Chaos/recipes/generated/",
};

// Source - https://stackoverflow.com/a/9229821
// Posted by georg, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-08, License - CC BY-SA 4.0

function uniqBy<T>(a: T[], key: (param0: T) => string | number): T[] {
  var seen = {};
  return a.filter(function (item) {
    var k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
}

async function createRecipes() {
  let recipes = (await getRecipes()).filter(({ filePath, recipe }) => {
    if (getType(recipe) === "minecraft:recipe_smithing_trim") return false;
    if (getType(recipe) === "minecraft:recipe_smithing_transform") return false;
    if (filePath.match(/[0-9]+\.json$/)) return false;
    // if (path.basename(filePath).startsWith("reducer_")) return false;
    return true;
  });
  const outputs: (RecipeItem | RecipeItem[])[] = [];

  recipes = uniqBy<{ filePath: string; recipe: Recipe }>(recipes, ({ recipe }) => {
    return getData(recipe)!.description.identifier;
  });

  function getRandomOutput(): RecipeItem | RecipeItem[] {
    const index = Math.floor(rng() * outputs.length);
    const output = outputs[index];

    outputs.splice(index, 1);

    return output;
  }

  for (const { filePath, recipe } of recipes) {
    const output = getOutput(recipe);

    console.log(filePath);

    if (output) {
      outputs.push(output);
    }
  }

  fs.rm(config.outputDir, { recursive: true, force: true }, (err) => {
    if (err) throw err;
    fs.mkdir(config.outputDir, { recursive: true }, (err) => {
      if (err) throw err;
      console.log("Folder emptied successfully");
    });
  });

  for (const { filePath, recipe } of recipes) {
    const outputPath = path.join(config.outputDir, path.basename(filePath));
    const type = getType(recipe);
    const data = getData(recipe);
    const output = getRandomOutput();

    if (!data) continue;

    console.log(filePath);

    setOutput(recipe, output as RecipeItem);

    if (type === "minecraft:recipe_shaped" || type === "minecraft:recipe_shapeless") {
      // if (Object.keys(data.result).length > 20) {
      //   console.log(filePath, data.result, output);
      // }
    }

    fs.writeFile(outputPath, JSON.stringify(recipe, null, "\t"), (err) => {
      if (err) console.log(err);
    });
  }
}

createRecipes();
