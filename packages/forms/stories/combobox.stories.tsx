import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Combobox, ComboboxProps, FormControl, FormErrorMessage, FormHelperText, FormLabel } from '../src';
export default {
  title: 'Komponenter/Combobox',
  component: Combobox.Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Välj en frukt',
    searchPlaceholder: 'Skriv för att filtrera',
  },
};

const applesAndPears = [
  {
    type: 'apple',
    name: 'Granny smith',
    id: 1,
  },
  {
    type: 'apple',
    name: 'Empire',
    id: 2,
  },
  {
    type: 'apple',
    name: 'Golden Delicious',
    id: 3,
  },
  {
    type: 'apple',
    name: 'Honeycrisp',
    id: 4,
  },
  {
    type: 'pear',
    name: 'Cascade',
    id: 5,
  },
  {
    type: 'pear',
    name: 'Conference',
    id: 6,
  },
  {
    type: 'pear',
    name: 'Moonglow',
    id: 7,
  },
  {
    type: 'pear',
    name: 'Florana',
    id: 8,
  },
];

const fruits = [
  'apple',
  'apricot',
  'avocado',
  'banana',
  'bell pepper',
  'bilberry',
  'blackberry',
  'blackcurrant',
  'blood orange',
  'blueberry',
  'boysenberry',
  'breadfruit',
  'canary melon',
  'cantaloupe',
  'cherimoya',
  'cherry',
  'chili pepper',
  'clementine',
  'cloudberry',
  'coconut',
  'cranberry',
  'cucumber',
  'currant',
  'damson',
  'date',
  'dragonfruit',
  'durian',
  'eggplant',
  'elderberry',
  'feijoa',
  'fig',
  'goji berry',
  'gooseberry',
  'grape',
  'grapefruit',
  'guava',
  'honeydew',
  'huckleberry',
  'jackfruit',
  'jambul',
  'jujube',
  'kiwi fruit',
  'kumquat',
  'lemon',
  'lime',
  'loquat',
  'lychee',
  'mandarine',
  'mango',
  'mulberry',
  'nectarine',
  'nut',
  'olive',
  'orange',
  'papaya',
  'passionfruit',
  'peach',
  'pear',
  'persimmon',
  'physalis',
  'pineapple',
  'plum',
  'pomegranate',
  'pomelo',
  'purple mangosteen',
  'quince',
  'raisin',
  'rambutan',
  'raspberry',
  'redcurrant',
  'rock melon',
  'salal berry',
  'satsuma',
  'star fruit',
  'strawberry',
  'tamarillo',
  'tangerine',
  'tomato',
  'ugli fruit',
  'watermelon',
];

export const Template = (args: ComboboxProps) => {
  const [value, setValue] = React.useState<string | string[]>('');

  const handleOnChange: React.ComponentProps<typeof Combobox.Input>['onChange'] = (e) => {
    console.log('handleOnChange', e.target.value);
    setValue(e.target.value);
  };

  const handleOnSelect: React.ComponentProps<typeof Combobox.Input>['onSelect'] = (e) => {
    console.log('handleOnSelect', e.target.value);
  };

  return (
    <div className="h-[45rem]">
      <Combobox {...args} value={value} onChange={handleOnChange} onSelect={handleOnSelect}>
        <Combobox.Input />
        <Combobox.List>
          {fruits.map((fruit, index) => (
            <Combobox.Option key={`fruit-${index}`} value={fruit}>
              {fruit}
            </Combobox.Option>
          ))}
        </Combobox.List>
      </Combobox>
    </div>
  );
};

export const WithOptionGroups = (args: ComboboxProps) => {
  const [value, setValue] = React.useState<string | string[]>('');

  const handleOnChange: React.ComponentProps<typeof Combobox.Input>['onChange'] = (e) => {
    console.log('handleOnChange', e.target.value);
    setValue(e.target.value);
  };

  const handleOnSelect: React.ComponentProps<typeof Combobox.Input>['onSelect'] = (e) => {
    console.log('handleOnSelect', e.target.value);
  };

  return (
    <div className="h-[45rem]">
      <Combobox {...args} value={value} onChange={handleOnChange} onSelect={handleOnSelect}>
        <Combobox.Input />
        <Combobox.List>
          <Combobox.Optgroup label={'Päron'}>
            {applesAndPears
              .filter((fruit) => fruit.type === 'pear')
              .map((fruit, index) => (
                <Combobox.Option key={`pear-${index}`} value={fruit.name}>
                  {fruit.name}
                </Combobox.Option>
              ))}
          </Combobox.Optgroup>
          <Combobox.Optgroup label={'Äpplen'}>
            {applesAndPears
              .filter((fruit) => fruit.type === 'apple')
              .map((fruit, index) => (
                <Combobox.Option key={`apple-${index}`} value={fruit.name}>
                  {fruit.name}
                </Combobox.Option>
              ))}
          </Combobox.Optgroup>
        </Combobox.List>
      </Combobox>
    </div>
  );
};

Template.storyName = 'Combobox';

export const CustomFilterHandler = (args: ComboboxProps) => {
  const [query, setQuery] = React.useState<string>('');
  const [delayedList, setDelayedList] = React.useState<typeof applesAndPears>([]);

  useEffect(() => {
    setTimeout(() => {
      setDelayedList(applesAndPears);
    }, 1000);
  }, []);

  const handleOnChange: React.ComponentProps<typeof Combobox.Input>['onChange'] = (e) => {
    console.log('handleOnChange', e.target.value);
  };

  return (
    <div className="h-[40rem]">
      <FormControl>
        <FormLabel>Favoritfrukt</FormLabel>
        <Combobox
          autofilter={false}
          {...args}
          searchPlaceholder="Search apple or pear"
          searchValue={query}
          defaultValue={delayedList.length > 0 ? delayedList[0].id.toString() : ''}
          onChange={handleOnChange}
          onChangeSearch={(e) => setQuery(e.target.value.toLowerCase())}
        >
          <Combobox.Input />
          <Combobox.List>
            {delayedList
              .filter((fruit) => fruit.name.toLowerCase().includes(query) || fruit.type.includes(query))
              .map((fruit) => (
                <Combobox.Option key={`appleAndPears-${fruit.id}`} value={fruit.id.toString()}>
                  {fruit.name}
                </Combobox.Option>
              ))}
          </Combobox.List>
        </Combobox>
      </FormControl>
    </div>
  );
};

export const SingleChoiceWithForm = (args: ComboboxProps) => {
  const { register, formState, watch } = useForm<{ fruit: string }>({ defaultValues: { fruit: 'lime' } });
  const myfruit = watch().fruit;
  React.useEffect(() => {
    console.log('myfruit', myfruit);
  }, [myfruit]);

  return (
    <div className="h-[40rem]">
      <FormControl>
        <FormLabel>Favoritfrukt</FormLabel>
        <Combobox
          {...args}
          placeholder="Välj en frukt"
          {...register('fruit')}
          defaultValue={formState?.defaultValues?.fruit}
        >
          <Combobox.Input />
          <Combobox.List>
            {fruits.map((fruit) => (
              <Combobox.Option key={`singlefruit-${fruit}`} value={fruit}>
                {fruit}
              </Combobox.Option>
            ))}
          </Combobox.List>
        </Combobox>
        <FormHelperText>Välj en frukt</FormHelperText>
      </FormControl>
    </div>
  );
};

export const MultipleChoicesWithForm = (args: ComboboxProps) => {
  const {
    register,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<{ fruits: string[] }>();
  const myfruits = watch().fruits;
  React.useEffect(() => {
    console.log('myfruits', myfruits);
    if (myfruits && myfruits.length < 1) {
      setError('fruits', { message: 'Välj minst en frukt' });
    } else {
      clearErrors('fruits');
    }
  }, [myfruits]);

  return (
    <div className="h-[40rem]">
      <FormControl required invalid={!!errors.fruits}>
        <FormLabel>Favoritfrukt</FormLabel>
        <Combobox multiple {...args} {...register('fruits')} placeholder="Välj en frukt">
          <Combobox.Input />
          <Combobox.List>
            {fruits.map((fruit) => (
              <Combobox.Option key={`multifruit-${fruit}`} value={fruit}>
                {fruit}
              </Combobox.Option>
            ))}
          </Combobox.List>
        </Combobox>
        {errors.fruits && <FormErrorMessage>Välj minst en frukt</FormErrorMessage>}
      </FormControl>
    </div>
  );
};
