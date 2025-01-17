import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '~/tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

export const useUtilStore = defineStore('useUtilStore', () => {
    const activeBreakpoint = ref<string>('');
    const colors = fullConfig.theme.colors;

    const setActiveBreakpoint = (): void => {
        if (window.matchMedia(`(min-width: ${fullConfig.theme.screens.xl})`).matches) {
            activeBreakpoint.value = 'xl';
        } else if (window.matchMedia(`(min-width: ${fullConfig.theme.screens.lg})`).matches) {
            activeBreakpoint.value = 'lg';
        } else if (window.matchMedia(`(min-width: ${fullConfig.theme.screens.md})`).matches) {
            activeBreakpoint.value = 'md';
        } else if (window.matchMedia(`(min-width: ${fullConfig.theme.screens.sm})`).matches) {
            activeBreakpoint.value = 'sm';
        } else {
            activeBreakpoint.value = 'xs';
        }
    };

    return { activeBreakpoint, colors, setActiveBreakpoint };
});