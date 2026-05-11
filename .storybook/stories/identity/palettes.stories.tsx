import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PaletteDemo } from '../../components/palette-demo.component';

/**
 * Demonstrerar org-tema-växlingen: rollerna `action` / `brand` / `accent` (+ `alert`) och
 * neutralerna byter färg när du växlar org-tema i toolbaren (Sundsvall / Aldeeran), medan
 * feedback-färgerna och legacy plats-namnen står still. Titta i Canvas-fliken och flippa
 * "Org-tema"-väljaren i headern.
 */
const meta: Meta<typeof PaletteDemo> = {
  title: 'Identitet/Org-teman',
  component: PaletteDemo,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof PaletteDemo>;

export const OrgTeman: Story = {
  name: 'Org-teman',
  render: () => <PaletteDemo />,
};
