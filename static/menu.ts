
export function routerChange (to, from) {1
    links.forEach(function (item) {
        item.current = item.path == to.path;
        if (item.hasChildren) {
            item.children.forEach((item) => item.current = item.path == to.path);

            if (item.path == to.path || item.children.some((item) => item.path == to.path)) {
                item.childrenIsCurrent = true;
                item.showChildren = true;
            } else {
                item.childrenIsCurrent = false;
                item.showChildren = false;
            }
        }
    });
}
export function addMenuItem(name: string, path: string, parent: MenuItem[] = links) {
    parent.push({ name, path, hasChildren: false, showChildren: false, children: [] });
};

export function addMenuListItem(name: string, path: string, ) {
    const children: MenuItem[] = [];

    links.push({ name, path, hasChildren: true, showChildren: false, children });

    return {
        addChild(name: string, path: string) {
            addMenuItem(name, path, children);
        }
    };
}

interface MenuItem {
    current?: boolean;
    childrenIsCurrent?: boolean;
    name: string;
    path: string;
    hasChildren: boolean;
    showChildren: boolean;
    children: MenuItem[]
}

export const links: MenuItem[] = [];
