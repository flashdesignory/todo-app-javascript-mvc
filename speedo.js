window.onmessage = async (event) => {
    const testFunction = new Function('return ' + event.data.fn)();
    if (testFunction) {
      await testFunction();
      window.top.postMessage({ type: "test-completed", status: "success" }, "*");
    }
}

window.top.postMessage({ type: "app-ready", status: "success" }, "*");
