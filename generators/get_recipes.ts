import * as fs from "node:fs";
import path from "node:path";
import { execSync } from "child_process";

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
    result:
      | {
          item: string;
          data?: number;
          count?: number;
        }
      | {
          item: string;
          data?: number;
          count?: number;
        }[];
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
    result:
      | {
          item: string;
          data?: number;
          count?: number;
        }
      | {
          item: string;
          data?: number;
          count?: number;
        }[];
  };
};

export type Recipe = ShapedRecipe | ShaplessRecipe;

const config = {
  recipes_path: "./generated/recipes/",
};

function cacheBedrockRecipes(): void {
  const repoDir = path.resolve(__dirname, "../generated/bedrock-samples");
  const recipesDir = path.resolve(__dirname, "../generated/recipes");

  // Clone sparse repository
  execSync(
    [
      "git clone",
      "--depth 1",
      "--filter=blob:none",
      "--sparse",
      "https://github.com/Mojang/bedrock-samples.git",
      repoDir,
    ].join(" "),
    { stdio: "inherit" }
  );

  // Sparse checkout only recipes
  execSync("git sparse-checkout set behavior_pack/recipes", {
    cwd: repoDir,
    stdio: "inherit",
  });

  const sourceRecipes = path.join(repoDir, "behavior_pack", "recipes");

  // Remove existing recipes dir if present
  // if (fs.existsSync(recipesDir)) {
  //   fs.rmSync(recipesDir, {
  //     recursive: true,
  //     force: true,
  //   });
  // }
  //
  // // Move recipes out
  fs.renameSync(sourceRecipes, recipesDir);
  //
  // // Cleanup repo
  // fs.rmSync(repoDir, {
  //   recursive: true,
  //   force: true,
  // });
  //
  // console.log("Downloaded vanilla recipes.");
}

export async function getRecipes(): Promise<{ filePath: string; recipe: Recipe }[]> {
  if (!fs.existsSync(config.recipes_path)) {
    cacheBedrockRecipes();
  }

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
