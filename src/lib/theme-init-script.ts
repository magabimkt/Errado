export const themeInitScript = `
(function() {
  try {
    var stored = window.localStorage.getItem('aca-ibge:theme');
    var theme = stored || 'system';
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var shouldBeDark = theme === 'dark' || (theme === 'system' && systemDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;
