import * as fs from "node:fs";
import path from "node:path";

import { getRecipes } from "./get_recipes.ts";
import { RecipeItem, getData } from "./format_recipe.ts";

const config = {
  outputDir: "./behavior_packs/Recipe_Chaos/recipes/generated/",
};

async function createRecipes() {
  const recipes = await getRecipes();
  const outputs: RecipeItem[] = [];

  function getRandomOutput(): RecipeItem {
    const index = Math.floor(Math.random() * outputs.length);
    const output = outputs[index];

    outputs.splice(index, 1);

    return output;
  }

  for (const { recipe } of recipes) {
    try {
      const data = getData(recipe);
      if (!data) throw new Error(`recipe without data: ${recipe}`);

      const output: RecipeItem = { ...data.result };

      outputs.push(output);
    } catch (error) {
      console.log(error);
      console.log(recipe);
    }
  }

  for (const { filePath, recipe } of recipes) {
    const data = getData(recipe);

    if (!data) throw new Error(`recipe without data: ${recipe}`);

    data.result = getRandomOutput();

    const outputPath = path.join(config.outputDir, path.basename(filePath));

    console.log(outputPath);

    fs.writeFile(outputPath, JSON.stringify(recipe, null, "\t"), (err) => {
      if (err) console.log(err);
    });
  }
}

createRecipes();
