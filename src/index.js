import html from './components/pages/index.pug';
// Import styles
import style from './sass/index.sass';
// Import scripts
import $ from 'jquery';
import popper from 'popper.js';
import bootstrap, {Dropdown} from 'bootstrap';
import slick from 'slick-carousel';
import L from 'leaflet';
import PerfectScrollbar from 'perfect-scrollbar';

window.PerfectScrollbar = PerfectScrollbar;
window.bootstrap = bootstrap;
window.Dropdown = Dropdown;

import './js/common.js';
