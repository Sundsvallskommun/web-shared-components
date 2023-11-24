import React from 'react';
import { Breadcrumb, BreadcrumbProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Breadcrumbs',
  component: Breadcrumb,
  tags: ['autodocs'],
} as Meta<typeof Breadcrumb>;

export const Template = (args: BreadcrumbProps) => (
  <Breadcrumb {...args}>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">En länk</Breadcrumb.Link>
    </Breadcrumb.Item>

    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">En länk</Breadcrumb.Link>
    </Breadcrumb.Item>

    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">En länk</Breadcrumb.Link>
    </Breadcrumb.Item>

    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">En länk</Breadcrumb.Link>
    </Breadcrumb.Item>

    <Breadcrumb.Item currentPage>
      <Breadcrumb.Link href="#">Sida</Breadcrumb.Link>
    </Breadcrumb.Item>
  </Breadcrumb>
);

Template.storyName = 'Breadcrumbs';
