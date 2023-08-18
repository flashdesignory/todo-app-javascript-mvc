// this should probably come from environment variable.
const appId = "1234"

window.onmessage = async (event) => {
    // ensure we only let legit functions run...
    if (event.data.id !== appId || event.data.type !== "speedo")
        return;

    const { name } = event.data;

    const testFunction = new Function(`return ${ event.data.fn}`)();
    if (testFunction) {
        requestAnimationFrame(() => {
            performance.mark(`${name}-start`);
        });
        requestAnimationFrame(async () => {
            await testFunction();
            setTimeout(() => {
                performance.mark(`${name}-end`);
                performance.measure(`${name}`, { start: `${name}-start`, end: `${name}-end` });
                const result = JSON.stringify(performance.getEntriesByName(`${name}`)[0]);
                window.top.postMessage({ type: "test-completed", status: "success", result }, "*");
            }, 0);
        });
    }
};

window.top.postMessage({ type: "app-ready", status: "success", appId }, "*");
