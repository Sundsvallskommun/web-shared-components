## Installation

```sh
yarn add @sk-web-gui/tabs
```

## Usage

Use the same stable string value for each trigger and its content. `Tabs` supports Radix-style controlled and
uncontrolled selection while SK Web GUI owns the visual variants.

```tsx
import { Tabs } from '@sk-web-gui/tabs';

<Tabs defaultValue="overview" color="vattjom" size="md" underline>
  <Tabs.List aria-label="Project sections">
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="history">History</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="overview">Overview content</Tabs.Content>
  <Tabs.Content value="history">History content</Tabs.Content>
</Tabs>;
```

For controlled selection, pass `value` and `onValueChange`. Keep the value stable when tabs are reordered or
generated from data.
