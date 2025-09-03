import { test, expect } from "@playwright/test";
import { TODO_ITEMS } from "./todo-items";
import {
    checkNumberOfTodosInLocalStorage,
    createDefaultTodos
} from "../utils/utils";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test.describe("New Todo", () => {
  test("should allow me to add todo items", { tag: ['@T47874'] }, async ({ page }) => {
    const newTodo = page.getByPlaceholder("What needs to be done?");

    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");
    await expect(page.getByTestId("todo-title")).toHaveText([TODO_ITEMS[0]]);

    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");
    await expect(page.getByTestId("todo-title")).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1],
    ]);

    await checkNumberOfTodosInLocalStorage(page, 2);
  });

  test("should clear text input field when an item is added", { tag: ['@T47877'] }, async ({
    page,
  }) => {
    const newTodo = page.getByPlaceholder("What needs to be done?");

    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");
    // Purposely fail: Expect input NOT to be empty
    await expect(newTodo).not.toBeEmpty();
    await checkNumberOfTodosInLocalStorage(page, 1);
  });

  test("should append new items to the bottom of the list", { tag: ['@T47880'] }, async ({
    page,
    browserName,
  }) => {
    test.skip(browserName === "firefox", "Not running on Firefox");

    await createDefaultTodos(page);
    const todoCount = page.getByTestId("todo-count");

    await expect(page.getByText("3 items left")).toBeVisible();
    await expect(todoCount).toHaveText("3 items left");
    await expect(todoCount).toContainText("2");
    await expect(todoCount).toHaveText(/3/);
    await expect(page.getByTestId("todo-title")).toHaveText(TODO_ITEMS);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });
});
