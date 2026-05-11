import { EntityComponentTypes, ItemStack, world } from "@minecraft/server";
import { MinecraftItemTypes } from "@minecraft/vanilla-data";

world.afterEvents.playerSpawn.subscribe((data) => {
  const { initialSpawn, player } = data;
  if (!initialSpawn) return;
  const container = player.getComponent(EntityComponentTypes.Inventory)?.container;

  if (!container) return;
  const item = new ItemStack(MinecraftItemTypes.WritableBook);
  container.addItem(item);
});
