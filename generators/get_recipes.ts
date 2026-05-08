import * as fs from "node:fs";
import path from "node:path";

type ShaplessRecipe = {
  format_version: string;
  "minecraft:recipe_shapeless": {
    description: {
      identifier: string;
    };
    group?: string;
    tags: string[];
    ingredients: {
      item: string;
      data?: number;
    }[];
    result: {
      item: string;
      data?: number;
      count?: number;
    };
  };
};

type ShapedRecipe = {
  format_version: string;
  "minecraft:recipe_shaped": {
    description: {
      identifier: string;
    };
    group?: string;
    tags: string[];
    pattern: string[];
    key: Record<
      string,
      {
        item: string;
        data?: number;
      }
    >;
    result: {
      item: string;
      count?: number;
      data?: number;
    };
  };
};

export type Recipe = ShapedRecipe | ShaplessRecipe;

const config = {
  recipes_path: "./generated/recipes/",
};

async function cacheBedrockRecipes(): Promise<void> {
  // https://github.com/Mojang/bedrock-samples/tree/main/behavior_pack/recipes
  //
  // git clone --depth 1 --filter=blob:none --sparse https://github.com/Mojang/bedrock-samples.git
  // cd bedrock-samples
  // git sparse-checkout set behavior_pack/recipes
  //
  // mkdir recipes
  // mv "./bedrock-samples/behavior_pack/recipes" "./"
  //
  // rm "bedrock-samples" -r -f
}

export async function getRecipes(): Promise<{ filePath: string; recipe: Recipe }[]> {
  const files = fs
    .readdirSync(config.recipes_path)
    .filter((file) => path.extname(file) === ".json")
    .map((file) => {
      const filePath = path.join(config.recipes_path, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      return { filePath, recipe: JSON.parse(fileContent) };
    });

  return files;
}
