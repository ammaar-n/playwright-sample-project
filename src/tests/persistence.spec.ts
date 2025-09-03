import { checkNumberOfCompletedTodosInLocalStorage } from "../utils/utils";
import { test, expect } from "@playwright/test";
import { TODO_ITEMS } from "./todo-items";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test.describe("Persistence", () => {
  test("should persist its data", async ({ page }) => {
    const newTodo = page.getByPlaceholder("What needs to be done?");

    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press("Enter");
    }

    const todoItems = page.getByTestId("todo-item");
    const firstTodoCheck = todoItems.nth(0).getByRole("checkbox");
    await firstTodoCheck.check();

    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await expect(todoItems).toHaveClass(["completed", ""]);

    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await page.reload();
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await expect(todoItems).toHaveClass(["completed", ""]);
  });
});
