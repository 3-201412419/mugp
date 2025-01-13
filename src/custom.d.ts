declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.PNG" {
  const value: string;
  export default value;
}
