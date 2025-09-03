import { test, expect, type Page } from "@playwright/test";
import { TODO_ITEMS } from './todo-items';
import {
    checkNumberOfCompletedTodosInLocalStorage,
} from "../utils/utils";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test.describe("Item", () => {
  test("should allow me to mark items as complete", async ({ page }) => {
    const newTodo = page.getByPlaceholder("What needs to be done?");
    
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press("Enter");
    }
    
    const firstTodo = page.getByTestId("todo-item").nth(0);
    await firstTodo.getByRole("checkbox").check();
    await expect(firstTodo).toHaveClass("completed");

    const secondTodo = page.getByTestId("todo-item").nth(1);
    await secondTodo.getByRole("checkbox").check();
    
    await expect(firstTodo).toHaveClass("completed");
    await expect(secondTodo).toHaveClass("completed");
  });

  test("should allow me to un-mark items as complete", async ({ page }) => {
    const newTodo = page.getByPlaceholder("What needs to be done?");
    
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press("Enter");
    }
    
    const firstTodo = page.getByTestId("todo-item").nth(0);
    const secondTodo = page.getByTestId("todo-item").nth(1);
    const firstTodoCheckbox = firstTodo.getByRole("checkbox");

    await firstTodoCheckbox.check();
    await expect(firstTodo).toHaveClass("completed");
    
    await firstTodoCheckbox.uncheck();
    await expect(firstTodo).not.toHaveClass("completed");
    await checkNumberOfCompletedTodosInLocalStorage(page, 0);
  });
});