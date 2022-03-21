import { Image } from "../src";

export default {
  title: "Design System/komponenter/WIP/Bild",
  component: Image,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Bild = () => (
  <Image
    alt="Dan Abramov"
    htmlWidth={100}
    htmlHeight={100}
    className="object-cover"
    src="https://bit.ly/dan-abramov"
  />
);
