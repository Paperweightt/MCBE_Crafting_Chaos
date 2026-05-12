import { Recipe } from "./get_recipes";

const potionIdtoName = [
  "water",
  "mundane",
  "long mundane",
  "Thick",
  "Awkward",
  "nightvision",
  "long_nightvision",
  "invisibility",
  "long_invisibility",
  "leaping",
  "long_leaping",
  "strong_leaping",
  "fire_resistance",
  "long_fire_resistance",
  "swiftness",
  "long_swiftness",
  "strong_swiftness",
  "slowness",
  "long_slowness",
  "strong_slowness",
  "water_breathing",
  "long_water_breathing",
  "healing",
  "strong_healing",
  "harming",
  "strong_harming",
  "poison",
  "long_poison",
  "strong_poison",
  "regeneration",
  "long_regeneration",
  "strong_regeneration",
  "strength",
  "long_strength",
  "strong_strength",
  "weakness",
  "long_weakness",
  "decay",
  "turtle_master",
  "long_turtle_master",
  "strong_turtle_master",
  "slow_falling",
  "long_slow_falling",
  "slowness",
  "wind_charged",
  "weaving",
  "oozing",
  "infested",
];

const potionNameToId = Object.fromEntries(Object.entries(potionIdtoName).map((arr) => arr.reverse()));

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
  priority?: number;
  tags: string[];
  output?: string;
  result: {
    item: string;
    data?: number;
    count?: number;
  };
};

type RecipeTypes =
  | "minecraft:recipe_shaped"
  | "minecraft:recipe_shapeless"
  | "minecraft:recipe_smithing_transform"
  | "minecraft:recipe_smithing_trim"
  | "minecraft:recipe_brewing_container"
  | "minecraft:recipe_brewing_mix"
  | "minecraft:recipe_furnace";

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

export function getOutput(recipe: Recipe): RecipeItem[] | RecipeItem | undefined {
  const type = getType(recipe);
  const data = getData(recipe);

  if (!data) return;

  if (type === "minecraft:recipe_smithing_trim") return;
  if (type === "minecraft:recipe_brewing_container") {
    if (!data.output) return;
    return { item: data.output };
  }
  if (type === "minecraft:recipe_brewing_mix") {
    if (!data.output) return;
    const [prefix, type, name] = data.output.split(":");
    const dataValue = potionNameToId[name];

    if (!name) throw new Error(data.output.split(":")[2] + " " + JSON.stringify(data));

    return {
      item: prefix + ":" + type.split("_")[0],
      data: dataValue,
    };
  }
  if (type === "minecraft:recipe_furnace") {
    if (!data.output) return;
    return { item: data.output };
  }

  if (Array.isArray(data.result)) {
    const newArr: { item: string; data?: number; amount?: number }[] = [];
    for (const value of data.result) {
      const data = { ...value };
      newArr.push(data);
    }
    return newArr;
  }

  return { ...data.result };
}

export function setOutput(recipe: Recipe, output: RecipeItem): boolean {
  const type = getType(recipe);
  const data = getData(recipe);

  if (!data) return false;

  if (type === "minecraft:recipe_smithing_trim") return false;
  if (
    type === "minecraft:recipe_furnace" ||
    type === "minecraft:recipe_brewing_container" ||
    type === "minecraft:recipe_brewing_mix"
  ) {
    if (Array.isArray(output)) output = output[0];

    let value = output.item;

    if (output.data) value += ":" + output.data;

    data.output = value;

    return true;
  }

  if (type === "minecraft:recipe_shapeless" && Array.isArray(output)) {
    data.result = output[0];
    return true;
  }

  data.result = output;

  return true;
}

export function getType(recipe: Recipe): RecipeTypes | undefined {
  for (const key of Object.keys(recipe)) {
    if (key !== "format_version") return key as RecipeTypes;
  }
}

export function getData(recipe: Recipe): RecipeInside | undefined {
  const key = getType(recipe);
  if (key) return recipe[key];
}
