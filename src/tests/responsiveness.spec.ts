import { createDefaultTodos } from "../utils/utils";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test.describe("Responsiveness", () => {
  test("should display correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await createDefaultTodos(page);
    const todoItems = page.getByTestId("todo-item");
    await expect(todoItems).toHaveCount(3);
  });

  test("should display correctly on tablet", {tag: ['@T47587']}, async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await createDefaultTodos(page);
    const todoItems = page.getByTestId("todo-item");
    await expect(todoItems).toHaveCount(3);
  });
});
