/**
 * 菜单，页面国际化
 * @param {title} string
 * @param  routes 菜单中英文
 * @returns
 */
export function routeTitle(title) {
    const name = `routes.${title}`;
    if (this.$te(name)) {
        return this.$t(name);
    }
    return title;
}
