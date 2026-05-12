import { EntityComponentTypes, ItemStack, world } from "@minecraft/server";
import { MinecraftItemTypes } from "@minecraft/vanilla-data";

world.afterEvents.playerSpawn.subscribe((data) => {
  const { initialSpawn, player } = data;
  if (!initialSpawn || player.getDynamicProperty("has_book")) return;
  const container = player.getComponent(EntityComponentTypes.Inventory)?.container;

  if (!container) return;
  const item = new ItemStack(MinecraftItemTypes.WritableBook);

  container.addItem(item);
  player.setDynamicProperty("has_book", true);
});
