import * as fs from "node:fs";
import path from "node:path";
import { execSync } from "child_process";
import { PACK_ID } from "./constants";

const colors = [
  "white",
  "orange",
  "magenta",
  "light_blue",
  "yellow",
  "lime",
  "pink",
  "gray",
  "light_gray",
  "cyan",
  "purple",
  "blue",
  "brown",
  "green",
  "red",
  "black",
];

type ShaplessRecipe = {
  format_version: string;
  "minecraft:recipe_shapeless": {
    description: {
      identifier: string;
    };
    group?: string;
    tags: string[];
    priority?: number;
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
    priority?: number;
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
  if (fs.existsSync(recipesDir)) {
    fs.rmSync(recipesDir, {
      recursive: true,
      force: true,
    });
  }

  // Move recipes out
  fs.renameSync(sourceRecipes, recipesDir);

  // Cleanup repo
  fs.rmSync(repoDir, {
    recursive: true,
    force: true,
  });

  console.log("Downloaded vanilla recipes.");
}

function getBedRecipes(): { filePath: string; recipe: Recipe }[] {
  const recipes: { filePath: string; recipe: Recipe }[] = [];
  let dataValue = 0;

  for (const color of colors) {
    const filePath = `generated\\recipes\\${color}_bed.json`;
    const recipe = {
      format_version: "1.20.10",
      "minecraft:recipe_shaped": {
        description: {
          identifier: `${PACK_ID}:${color}_bed`,
        },
        tags: ["crafting_table"],
        pattern: ["www", "###"],
        key: {
          "#": {
            item: "minecraft:planks",
          },
          w: {
            item: `minecraft:${color}_wool`,
          },
        },
        unlock: [
          {
            item: "minecraft:planks",
          },
        ],
        result: {
          item: `minecraft:bed`,
          data: dataValue++,
        },
      },
    };
    recipes.push({ filePath, recipe });
  }
  return recipes;
}

function getApplyDyeOnBedRecipes(): { filePath: string; recipe: Recipe }[] {
  const recipes: { filePath: string; recipe: Recipe }[] = [];
  let dataValue = 0;

  for (const color of colors) {
    const filePath = `generated\\recipes\\dye_${color}_on_bed.json`;
    const recipe = {
      format_version: "1.20.10",
      "minecraft:recipe_shapeless": {
        description: {
          identifier: `${PACK_ID}:dye_${color}_on_bed`,
        },
        tags: ["crafting_table"],
        ingredients: [
          {
            item: `minecraft:bed`,
          },
          {
            item: `minecraft:${color}_dye`,
          },
        ],
        unlock: [
          {
            item: `minecraft:bed`,
          },
        ],
        result: {
          item: `minecraft:bed`,
          data: dataValue++,
        },
      },
    };
    recipes.push({ filePath, recipe });
  }
  return recipes;
}

function getWoolRecipes(): { filePath: string; recipe: Recipe }[] {
  const recipes: { filePath: string; recipe: Recipe }[] = [];

  for (const color of colors) {
    const filePath = `generated\\recipes\\${color}_wool.json`;
    const recipe = {
      format_version: "1.20.10",
      "minecraft:recipe_shapeless": {
        description: {
          identifier: `${PACK_ID}:${color}_wool`,
        },
        tags: ["crafting_table"],
        ingredients: [
          {
            item: `minecraft:${color}_dye`,
          },
        ],
        unlock: [
          {
            item: `minecraft:wool`,
          },
        ],
        result: {
          item: `minecraft:${color}_wool`,
        },
      },
    };
    recipes.push({ filePath, recipe });
  }
  return recipes;
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

  return [
    ...files,
    ...getBedRecipes(),
    ...getWoolRecipes(),
    // ...getApplyDyeOnBedRecipes()
  ];
}
