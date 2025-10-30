import { addons } from "storybook/manager-api";
import { themes } from "storybook/theming";

/**
 * 判断默认主题是否为暗色: urlQuery, system
 */
const search = window.location.search;
export const defaultThemeIsDark =
  search.includes("theme:dark") || search.includes("theme%3Adark");

addons.setConfig({
  theme: defaultThemeIsDark ? themes.dark : themes.light,
});

/**
 * 应用主题
 * 另外1000ms内，每100ms检查一次，强制修改类名来应用主题，以确保主题切换后页面样式刷新
 */
let interval: NodeJS.Timeout;
function applyTheme(theme: "dark" | "light") {
  clearInterval(interval);

  document.documentElement.classList.value = theme;
  interval = setInterval(() => {
    if (!document.documentElement.classList.contains(theme)) {
      document.documentElement.classList.value = theme;
    }
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
  }, 6000); // 约5s左右主题插件会重置主题，这里确保6s内保持手动修改的主题
}

window.addEventListener("DOMContentLoaded", () => {
  /**
   * 监听主题切换按钮点击并刷新页面
   * 以同步侧边栏、工具栏主题样式
   */
  setTimeout(() => {
    const document = window.top?.document;
    const btns = document?.getElementsByClassName("css-n2j2tx");
    const themeToggleBtn = Array.from(btns ?? []).find(
      (btn) => btn.getAttribute("title") === "Theme"
    );
    themeToggleBtn?.addEventListener("click", () => {
      setTimeout(() => {
        window.top?.location.reload();
      }, 10);
    });
  }, 300);

  /**
   * 监听在 `Docs` 下切换故事背景色按钮点击
   * 为故事切换 `dark` 类名
   */
  const search = window.location.search;
  const storyBgIsDark =
    search.includes("backgrounds.value:dark") ||
    search.includes("backgrounds.value%3Adark");
  const storyBgIsLight =
    search.includes("backgrounds.value:light") ||
    search.includes("backgrounds.value%3Alight");

  if (storyBgIsDark) {
    applyTheme("dark");
  } else if (storyBgIsLight) {
    applyTheme("light");
  }

  /**
   * 监听在 `Story` 下切换故事背景色按钮点击
   * 为故事切换 `dark` 类名
   */
  window.top?.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("#list-item-dark")) {
      applyTheme("dark");
    } else if (target.closest("#list-item-light")) {
      applyTheme("light");
    } else if (target.closest("#list-item-reset")) {
      applyTheme(defaultThemeIsDark ? "dark" : "light");
    }
  });
});
