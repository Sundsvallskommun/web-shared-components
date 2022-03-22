import { FormControl, FormLabel } from "@sk-web-gui/forms";
import { Switch } from "../src";

export default {
  title: "Design System/Komponenter/WIP/Toggel",
  component: Switch,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Toggel = () => ( 
  <div className="space-x-2">
    <Switch aria-label="example switch" />
    <Switch aria-label="example switch 2" defaultChecked />
  </div>
);

export const disabled = () => (
  <div className="space-x-2">
    <Switch aria-label="example switch" disabled />
    <Switch aria-label="example switch 2" defaultChecked disabled />
  </div>
);

export const colored = () => (
  <div className="space-x-2">
    <Switch aria-label="example switch" color="secondary" />
    <Switch aria-label="example switch 2" color="secondary" defaultChecked />
  </div>
);

export const Storlekar = () => (
  <div className="space-x-2">
    <Switch aria-label="example switch" size="sm" />
    <Switch aria-label="example switch 2" size="md" />
    <Switch aria-label="example switch 3" size="lg" />
  </div>
);

export const formControl = () => (
  <FormControl className="flex items-center">
    <FormLabel htmlFor="email-alerts" className="mb-0 mr-2">
      Enable email alerts?
    </FormLabel>
    <Switch aria-label="example switch" id="email-alerts" />
  </FormControl>
);
