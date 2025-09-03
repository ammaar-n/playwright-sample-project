import {
    createDefaultTodos,
} from "../utils/utils";
import { test, expect } from "@playwright/test";
import { TODO_ITEMS } from './todo-items';

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test.describe("Clear completed button", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });

  test("should remove completed items when clicked", {tag: ['@T47589']}, async ({ page }) => {
    const todoItems = page.getByTestId("todo-item");
    await todoItems.nth(1).getByRole("checkbox").check();
    await page.getByRole("button", { name: "Clear completed" }).click();
    await expect(todoItems).toHaveCount(2);
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });
});
