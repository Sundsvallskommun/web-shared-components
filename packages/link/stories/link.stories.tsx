import { Link } from "../src";

export default {
  title: "Design System/komponenter/WIP/Länkar",
  component: Link,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Standard = () => (
  <div className="flex flex-col space-y-2">
    <Link href="#">Lorem ipsum dolor sit amet.</Link>
    <p>
      <Link href="#">Lorem, ipsum dolor.</Link> Lorem ipsum dolor sit amet consectetur adipisicing.
    </p>
  </div>
);

Standard.storyName = 'Länkar';

export const Inaktiva = () => (
  <div className="flex flex-col space-y-2">
    <Link href="#" disabled>Lorem ipsum dolor sit amet.</Link>
    <p>
      <Link href="#" disabled>Lorem, ipsum dolor.</Link> Lorem ipsum dolor sit amet consectetur adipisicing.
    </p>
    <Link disabled>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Link>
  </div>
);
