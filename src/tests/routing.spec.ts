import {
  checkNumberOfCompletedTodosInLocalStorage,
  createDefaultTodos,
  checkTodosInLocalStorage,
} from "../utils/utils";
import { test, expect, type Page } from "@playwright/test";
import { TODO_ITEMS } from "./todo-items";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test.describe("Routing", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
    await checkTodosInLocalStorage(page, TODO_ITEMS[0]);
  });

  test("should allow me to display active items", async ({ page }) => {
    const todoItem = page.getByTestId("todo-item");
    await page.getByTestId("todo-item").nth(1).getByRole("checkbox").check();

    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.getByRole("link", { name: "Active" }).click();
    await expect(todoItem).toHaveCount(2);
    await expect(todoItem).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });
});
