Hooks.once("init", () => {
 console.log("Hello world!");
  CrstlUtils.myTest();
});

Hooks.once("Ready", () => {
  
});

export class CrstlUtils {
  static myTest = (): void => {
    console.log("Howdy!");
  }
}
