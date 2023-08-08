// this should probably come from environment variable.
const appId = "1234"

window.onmessage = async (event) => {
    // ensure we only let legit functions run...
    if (event.data.id !== appId) return;

    const testFunction = new Function('return ' + event.data.fn)();
    if (testFunction) {
      await testFunction();
      window.top.postMessage({ type: "test-completed", status: "success" }, "*");
    }
}

window.top.postMessage({ type: "app-ready", status: "success", appId }, "*");
