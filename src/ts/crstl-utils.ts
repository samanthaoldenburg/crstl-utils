declare global {
  interface Window {
    CrstlUtils: any;
  }
}
Hooks.once("init", () => {
  console.log("Hello world!");
  CrstlUtils.myTest();
  initializeModule();
});

function initializeModule() {
  window.CrstlUtils = CrstlUtils;
}

export class CrstlUtils {
  static myTest = (): void => {
    console.log("Howdy!");
  }
}
