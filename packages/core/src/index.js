const plugin = require('tailwindcss/plugin');

const base = require('./base');
const preset = require('./preset');

// const colors = require("/colors");
// const { colors } = require('@sk-web-gui/theme');
// const withOpacity = require('./with-opacity');
// components
const Alert = require('./components/alert');
const AlertBanner = require('./components/alert-banner');
const Badge = require('./components/badge');
const Breadcrumb = require('./components/breadcrumb');
const ButtonGroup = require('./components/button-group');

const Checkbox = require('./components/checkbox');
const ContextMenu = require('./components/context-menu');
const Dialog = require('./components/dialog');
const Dot = require('./components/dot');
const Forms = require('./components/forms');
const Calendar = require('./components/calendar');
const Icon = require('./components/icon');
const Link = require('./components/link');
const Message = require('./components/message');
const Notification = require('./components/notification');
const Radio = require('./components/radio');
const Switch = require('./components/switch');

const Button = require('./components/button');
const Accordion = require('./components/accordion');
const Card = require('./components/card');
const Table = require('./components/table');
const ZebraTable = require('./components/zebratable');

const Modal = require('./components/modal');
const CookieConsent = require('./components/cookie-consent');
const Divider = require('./components/divider');

const SideMenu = require('./components/side-menu');
const TabMenu = require('./components/tab-menu');
const Tabs = require('./components/tabs');
const UserMenu = require('./components/user-menu');

const DropdownFilter = require('./components/dropdown-filter');

const Tag = require('./components/tag');
const Pagination = require('./components/pagination');
const Footer = require('./components/footer');
const Header = require('./components/header');

const SearchBar = require('./components/search-bar');

const ProfilePicture = require('./components/profile-picture');
const Profile = require('./components/profile');

const components = [
  Alert,
  AlertBanner,
  Badge,
  Breadcrumb,
  ButtonGroup,
  Button,
  Checkbox,
  ContextMenu,
  Dialog,
  Dot,
  Forms,
  Calendar,
  Icon,
  Link,
  Message,
  Notification,
  Radio,
  Switch,

  Table,
  ZebraTable,
  CookieConsent,
  Modal,

  Accordion,
  Card,
  Divider,

  SideMenu,
  TabMenu,
  Tabs,
  UserMenu,

  DropdownFilter,

  SearchBar,

  Tag,
  Pagination,
  Footer,
  Header,

  ProfilePicture,
  Profile,
];

const defaultColors = ['primary', 'secondary'];

module.exports = plugin.withOptions(
  function (options = { colors: [], cssBase: true }) {
    return function ({ addComponents, addBase, theme }) {
      const optionColors = [...defaultColors, ...(options.colors || [])];

      if (options.cssBase) {
        addBase(base);
      }

      addComponents(components.map((component) => component(optionColors, theme)));
    };
  },
  function () {
    return preset;
  }
);
