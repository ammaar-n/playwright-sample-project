import { createDefaultTodos } from "../utils/utils";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test.describe("Accessibility", () => {
  test("should have no accessibility violations", {tag: ['@T47875']}, async ({ page }) => {
    await createDefaultTodos(page);
    const accessibilityScanResults = await page.accessibility.snapshot();
    expect(accessibilityScanResults).toBeDefined();
  });
});
