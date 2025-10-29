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

window.addEventListener("DOMContentLoaded", () => {
  /**
   * 监听主题切换按钮点击并刷新页面
   * 以解决主题切换后页面样式不刷新的问题
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
   * 监听在Docs下切换故事背景色按钮点击
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
    document.body.classList.add("dark");
    setTimeout(() => {
      document.documentElement.classList.value = "dark";
    }, 1000);
  } else if (storyBgIsLight) {
    document.body.classList.remove("dark");
    setTimeout(() => {
      document.documentElement.classList.value = "light";
    }, 1000);
  }

  /**
   * 监听在Story下切换故事背景色按钮点击
   * 为故事切换 `dark` 类名
   */
  window.top?.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("#list-item-dark")) {
      document.body.classList.add("dark");
      document.documentElement.classList.value = "dark";
    } else if (target.closest("#list-item-light")) {
      document.body.classList.remove("dark");
      document.documentElement.classList.value = "light";
    }
  });
});
