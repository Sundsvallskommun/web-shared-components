import React from 'react';
import { Meta } from '@storybook/react';
import { Footer, FooterProps } from '../src';
import { Link } from '@sk-web-gui/link';
import { Icon } from '@sk-web-gui/icon';
import { Logo } from '@sk-web-gui/logo';

export default {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
} as Meta<typeof Footer>;

export const Template = ({ ...args }: FooterProps) => {
  return (
    <Footer {...args}>
      <Footer.Content>
        <Footer.LogoWrapper>
          <Logo aria-label="Sundsvalls kommun logotyp" />
        </Footer.LogoWrapper>
        <Footer.ListWrapper>
          <Footer.List className="flex flex-col gap-16">
            <Footer.ListItem>
              <label>Kategori</label>
            </Footer.ListItem>
            <Footer.ListItem>
              <Link variant="tertiary" href="#">
                Sub content
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Link variant="tertiary" href="#">
                Sub content
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Link variant="tertiary" href="#">
                Sub content
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Link variant="tertiary" href="#">
                Sub content
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Link variant="tertiary" href="#">
                Sub content
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Link variant="tertiary" href="#">
                Sub content
              </Link>
            </Footer.ListItem>
          </Footer.List>
          <Footer.List className="flex flex-col gap-16">
            <Footer.ListItem>
              <label>Kategori</label>
            </Footer.ListItem>
            <Footer.ListItem>
              <Link variant="tertiary" href="#">
                Sub content
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Link variant="tertiary" href="#">
                Sub content
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Link variant="tertiary" href="#">
                Sub content
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Link variant="tertiary" href="#">
                Sub content
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Link variant="tertiary" href="#">
                Sub content
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Link variant="tertiary" href="#">
                Sub content
              </Link>
            </Footer.ListItem>
          </Footer.List>
          <Footer.List className="flex flex-col gap-16">
            <Footer.ListItem>
              <label>Följ oss</label>
            </Footer.ListItem>
            <Footer.ListItem>
              <Icon name="facebook" />
              <Link variant="tertiary" href="#">
                Facebook
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Icon name="instagram" />
              <Link variant="tertiary" href="#">
                Instagram
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Icon name="linkedin" />
              <Link variant="tertiary" href="#">
                Linkedin
              </Link>
            </Footer.ListItem>
            <Footer.ListItem>
              <Icon name="youtube" />
              <Link variant="tertiary" href="#">
                Youtube
              </Link>
            </Footer.ListItem>
          </Footer.List>
        </Footer.ListWrapper>
      </Footer.Content>
    </Footer>
  );
};

Template.storyName = 'Footer';
