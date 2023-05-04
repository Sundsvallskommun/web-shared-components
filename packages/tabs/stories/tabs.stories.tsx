import { Meta } from '@storybook/react';
import { TabItem, Tabs, TabsProps } from '../src';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const tabs: TabItem[] = [
  {
    id: 'mariaAhelfeldt',
    label: 'Maria Ahlefeldt',
    children: (
      <p>
        Maria Theresia Ahlefeldt (16 January 1755 – 20 December 1810) was a Danish, (originally German), composer. She
        is known as the first female composer in Denmark. Maria Theresia composed music for several ballets, operas, and
        plays of the royal theatre. She was given good critic as a composer and described as a “virkelig
        Tonekunstnerinde” ('a True Artist of Music').
      </p>
    ),
  },
  {
    id: 'carlAndersen',
    label: 'Carl Andersen',
    children: (
      <p>
        Carl Joachim Andersen (29 April 1847 – 7 May 1909) was a Danish flutist, conductor and composer born in
        Copenhagen, son of the flutist Christian Joachim Andersen. Both as a virtuoso and as composer of flute music, he
        is considered one of the best of his time. He was considered to be a tough leader and teacher and demanded as
        such a lot from his orchestras but through that style he reached a high level.
      </p>
    ),
    disabled: true,
  },
  {
    id: 'idaDaFonseca',
    label: 'Ida da Fonseca',
    children: (
      <p>
        Ida Henriette da Fonseca (July 27, 1802 – July 6, 1858) was a Danish opera singer and composer. Ida Henriette da
        Fonseca was the daughter of Abraham da Fonseca (1776–1849) and Marie Sofie Kiærskou (1784–1863). She and her
        sister Emilie da Fonseca were students of Giuseppe Siboni, choir master of the Opera in Copenhagen. She was
        given a place at the royal Opera alongside her sister the same year she debuted in 1827.
      </p>
    ),
    alert: 25,
  },
  {
    id: 'peterMuller',
    label: 'Peter Müller',
    icon: <MusicNoteIcon />,
    children: (
      <p>
        Peter Erasmus Lange-Müller (1 December 1850 – 26 February 1926) was a Danish composer and pianist. His
        compositional style was influenced by Danish folk music and by the work of Robert Schumann; Johannes Brahms; and
        his Danish countrymen, including J.P.E. Hartmann.
      </p>
    ),
  },
];

export default {
  title: 'Komponenter/Tabs/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { controls: { hideNoControlsWarning: true } },
  args: {
    tabs: tabs,
  },
} as Meta;

export const Template = (args: TabsProps) => {
  const onTabChangeHandler = (item: TabItem) => {
    console.log('TabItem: ', item);
  };

  return <Tabs {...args} onTabChange={onTabChangeHandler} onTabClick={(e) => console.log(e)} />;
};

Template.storyName = 'Tabs';
