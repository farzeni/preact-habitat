import { h } from 'preact';
import {
  collectPropsFromElement,
  widgetDOMHostElements,
  getExecutedScript,
  camelcasize,
  getHabitatSelectorFromClient
} from '../lib';

import habitat from '../index';

describe('Helper utility: Camel Casing for props', () => {
  it('should not camcelCase names with no dashes', () => {
    const propOne = 'somepropname';
    // document must find current script tag
    expect(camelcasize(propOne)).toBe(propOne);
  });

  it('should camcelCase prop names with dashes `-`', () => {
    const propOne = 'some-prop-name';
    // document must find current script tag
    expect(camelcasize(propOne)).toBe('somePropName');
  });
})

describe('Helper utility: Client DOM querying with widgetDOMHostElements', () => {
  it('should find host using data attribute', () => {
    document.body.innerHTML = `
      <div data-widget="my-widget"></div>
      <div data-widget="my-widget"></div>
      <div data-widget="my-widget"></div>
    `
    const hostHabitats = widgetDOMHostElements("[data-widget='my-widget']", { clientSpecified: false, inline: false, clean: false });
    // document must find current script tag
    expect(hostHabitats.length).toBe(3);
  });

  it('should find host using class name', () => {
    document.body.innerHTML = `
      <div class="classy-widget"></div>
      <div class="classy-widget"></div>
      <div class="classy-widget"></div>
    `
    const hostHabitats = widgetDOMHostElements(".classy-widget", { clientSpecified: false, inline: false, clean: false });
    // document must find current script tag
    expect(hostHabitats.length).toBe(3);
  });

  it('should find host using ID', () => {
    document.body.innerHTML = `
      <div id="idee-widget"></div>
    `
    const hostHabitats = widgetDOMHostElements("#idee-widget", { clientSpecified: false, inline: false, clean: false });
    // document must find current script tag
    expect(hostHabitats.length).toBe(1);
  });

  it('should get the currently getting executed script tag', () => {
    document.body.innerHTML = `
      <script></script>
    `
    expect(getExecutedScript(document)).toBeDefined();
  });

  it('should get habitats selectors from client script itself', () => {
    document.body.innerHTML = `
      <script id="find-mount-here" data-mount-in=".my-widget"></script>
    `
    let currentScript = document.getElementById('find-mount-here')
    expect(getHabitatSelectorFromClient(currentScript)).toBe('.my-widget');
  });
});


describe('Helper utility: collecting Client DOM props with collectPropsFromElement', () => {
  it('should pass props down from the client\'s div', () => {
    document.body.innerHTML = `
      <div id="sucess-props-check" data-props-name="zouhir" data-props-key="11001100"></div>
    `
    const habitatDiv = document.getElementById('sucess-props-check');
    const expectedProps = {
      name: 'zouhir',
      key: '11001100'
    };
    const propsObj = collectPropsFromElement(habitatDiv);
    // document must find current script tag
    expect(propsObj).toEqual(expectedProps);
  });

  it('should accept data-props- as well as data-prop attributes on the div', () => {
    document.body.innerHTML = `
      <div id="sucess-props-check" data-prop-name="zouhir" data-prop-key="11001100"></div>
    `
    const habitatDiv = document.getElementById('sucess-props-check');
    const expectedProps = {
      name: 'zouhir',
      key: '11001100'
    };
    const propsObj = collectPropsFromElement(habitatDiv);
    // document must find current script tag
    expect(propsObj).toEqual(expectedProps);
  });
})