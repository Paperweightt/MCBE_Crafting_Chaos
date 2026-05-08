import { JavaRecipe, Recipe } from "./get_recipes";

const dataValues = {
  "minecraft:bamboo_planks": { 4: "minecraft:bamboo_planks" },
  "minecraft:mangrove_planks": { 4: "minecraft:mangrove_planks" },
  "minecraft:dispenser": { 3: "minecraft:dispenser" },
  "minecraft:dropper": { 3: "minecraft:dropper" },
  "minecraft:carpet": {
    0: "minecraft:white_carpet",
    5: "minecraft:lime_carpet",
    8: "minecraft:light_gray_carpet",
  },

  "minecraft:glass_bottle": ["minecraft:prismarine"],
  "minecraft:prismarine": ["minecraft:prismarine"],
  "minecraft:sandstone": ["minecraft:sandstone"],
  "minecraft:red_sandstone": ["minecraft:red_sandstone"],
  "minecraft:leather": ["minecraft:leather"],
  "minecraft:dandelion": ["minecraft:dandelion"],
  "minecraft:golden_apple": ["minecraft:golden_apple"],
  "minecraft:paper": ["minecraft:paper"],
  "minecraft:netherite_ingot": ["minecraft:netherite_ingot"],
  "minecraft:anvil": ["minecraft:anvil"],
  "minecraft:stone": ["minecraft:stone"],
  "minecraft:sand": ["minecraft:sand"],
  "minecraft:dirt": ["minecraft:dirt"],
  "minecraft:sticky_piston": ["minecraft:sticky_piston", "minecraft:sticky_piston"],
  "minecraft:tnt": ["minecraft:tnt"],

  "minecraft:bucket": ["minecraft:bucket", "minecraft:milk_bucket"],
  "minecraft:coal": ["minecraft:coal", "minecraft:charcoal"],
  "minecraft:piston": ["minecraft:piston", "minecraft:piston"],

  "minecraft:quartz_block": ["minecraft:quartz_block", "minecraft:chiseled_quartz_block", "minecraft:quartz_piller"],
  "minecraft:emptymap": ["minecraft:empty_map", "minecraft:empty_map", "minecraft:locator_map"],

  "minecraft:banner_pattern": [
    "minecraft:creeper_banner_pattern",
    "minecraft:skull_banner_pattern",
    "minecraft:flower_banner_pattern",
    "minecraft:mojang_banner_pattern",
    "minecraft:field_masoned_banner_pattern",
    "minecraft:bordure_indented_banner_pattern",
  ],

  "minecraft:skull": [
    "minecraft:skeleton_skull",
    "minecraft:wither_skeleton_skull",
    "minecraft:zombie_head",
    "minecraft:player_head",
    "minecraft:creeper_head",
    "minecraft:dragon_head",
    "minecraft:piglin_head",
  ],

  "minecraft:boat": [
    "minecraft:oak_boat",
    "minecraft:spruce_boat",
    "minecraft:birch_boat",
    "minecraft:jungle_boat",
    "minecraft:acacia_boat",
    "minecraft:dark_oak_boat",
    "minecraft:mangrove_boat",
    "minecraft:bamboo_boat",
    "minecraft:cherry_boat",
    "minecraft:pale_oak_boat",
  ],

  "minecraft:chest_boat": [
    "minecraft:oak_chest_boat",
    "minecraft:spruce_chest_boat",
    "minecraft:birch_chest_boat",
    "minecraft:jungle_chest_boat",
    "minecraft:acacia_chest_boat",
    "minecraft:dark_oak_chest_boat",
    "minecraft:mangrove_chest_boat",
    "minecraft:bamboo_chest_boat",
    "minecraft:cherry_chest_boat",
    "minecraft:pale_oak_chest_boat",
  ],

  "minecraft:banner": [
    "minecraft:black_dye",
    "minecraft:red_dye",
    "minecraft:green_dye",
    "minecraft:brown_dye",
    "minecraft:blue_dye",
    "minecraft:purple_dye",
    "minecraft:cyan_dye",
    "minecraft:light_gray_dye",
    "minecraft:gray_dye",
    "minecraft:pink_dye",
    "minecraft:lime_dye",
    "minecraft:yellow_dye",
    "minecraft:light_blue_dye",
    "minecraft:magenta_dye",
    "minecraft:orange_dye",
    "minecraft:white_dye",
  ],

  "minecraft:dye": [
    "minecraft:inc_sac",
    "minecraft:red_dye",
    "minecraft:green_dye",
    "minecraft:cocoa_beans",
    "minecraft:lapiz_lazuli",
    "minecraft:purple_dye",
    "minecraft:cyan_dye",
    "minecraft:light_gray_dye",
    "minecraft:gray_dye",
    "minecraft:pink_dye",
    "minecraft:lime_dye",
    "minecraft:yellow_dye",
    "minecraft:light_blue_dye",
    "minecraft:magenta_dye",
    "minecraft:orange_dye",
    "minecraft:bone_meal",
    "minecraft:black_dye",
    "minecraft:brown_dye",
    "minecraft:blue_dye",
    "minecraft:white_dye",
  ],
};

export type RecipeItem = {
  item: string;
  count?: number;
  data?: number;
};

export type RecipeInside = {
  description: {
    identifier: string;
  };
  tags: string[];
  result: {
    item: string;
    data?: number;
    count?: number;
  };
};

export function formatItem(itemData: RecipeItem) {
  if (!itemData.item.startsWith("minecraft:")) {
    itemData.item = "minecraft:" + itemData.item;
  }
  if (typeof itemData.data === "number") {
    if (dataValues[itemData.item] && dataValues[itemData.item][itemData.data]) {
      itemData.item = dataValues[itemData.item][itemData.data];
      delete itemData.data;
    } else {
      console.log(itemData.item + " " + itemData.data);
    }
  }

  return itemData;
}

export function getData(recipe: Recipe): RecipeInside | undefined {
  for (const [key, value] of Object.entries(recipe)) {
    if (key !== "format_version") return value;
  }
}
