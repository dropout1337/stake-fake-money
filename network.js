async function handleRequest(details) {
    if (
      details.url === "https://stake.com/_api/graphql" &&
      details.requestBody &&
      details.requestBody.raw &&
      details.requestBody.raw[0] &&
      details.requestBody.raw[0].bytes
    ) {
      const payload = JSON.parse(
        String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes))
      );
  
      if (payload && payload.query && payload.query.includes("ActiveRaces")) {
        return { cancel: true };
      }
    }
    return { cancel: false };
}
  
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        if (details.url === "https://stake.com/_api/graphql") {
            headers = details.requestHeaders;
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"]
);
