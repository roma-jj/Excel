import { $ } from '@core/dom';

export function resizeHandler($root, event) {
    const $resizer = $(event.target);
    // const $parent = $resizer.$el.parentNode;
    // const $parent = $resizer.$el.closest('.column');
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
    });

    // const cells = this.$root.findAll(`
    //     [data-col="${$parent.data.col}"]
    // `);

    document.onmousemove = e => {
        if (type === 'col') {
            // const delta = e.pageX - (coords.width + coords.left);
            const delta = e.pageX - coords.right;
            value = coords.width + delta;
            $resizer.css({right: -delta + 'px'});
            // $parent.$el.style.width = value + 'px';
            // $parent.css({width: value + 'px'});

            // document.querySelectorAll(`
            // [data-col="${$parent.data.col}"]
            // `)
            //     .forEach(el => el.style.width = value + 'px');
            // --- 589ms Scripting !!!
            // --- 2433ms Rendering !!!

            // this.$root.findAll(`[data-col="${$parent.data.col}"]`)
            //     .forEach(el => el.style.width = value + 'px');
            // --- 440ms Scripting !!!
            // --- 1771ms Rendering !!!

            // cells.forEach(el => el.style.width = value + 'px');
        } else {
            // const delta = e.pageY - (coords.height + coords.top);
            const delta = e.pageY - coords.bottom;
            value = coords.height + delta;
            $resizer.css({bottom: -delta + 'px'});
            // $parent.css({height: value + 'px'});
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;

        if (type === 'col') {
            $parent.css({width: value + 'px'});
            $root.findAll(`[data-col="${$parent.data.col}"]`)
                .forEach(el => el.style.width = value + 'px');
        } else {
            $parent.css({height: value + 'px'});
        }

        // --- 125ms Scripting !!!
        // --- 329ms Rendering !!!

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        });
    }
}
