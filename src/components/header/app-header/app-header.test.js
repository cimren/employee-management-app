import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import './app-header';

describe('AppHeader', () => {
  it('renders a header element', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    expect(el.shadowRoot.querySelector('header')).to.exist;
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    await expect(el).shadowDom.to.be.accessible();
  });

  it('renders a nav element', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    expect(el.shadowRoot.querySelector('nav')).to.exist;
  });

  it('renders a router-link for "Home"', async () => {
    const el = await fixture(html`<app-header title="Home"></app-header>`);
    const homeLinkContainer = el.shadowRoot.querySelector('.logo-container');
    const homeLinkTitle = homeLinkContainer.querySelector('span');
    expect(homeLinkContainer).to.exist;
    expect(homeLinkTitle.textContent).to.equal('Home');
  });

  it('renders a router-link for "Add New" with the correct path', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    const addEmployeeLink = el.shadowRoot.querySelector(
      'a[href="/employee-form"]'
    );
    expect(addEmployeeLink).to.exist;
    expect(addEmployeeLink.textContent).to.equal('Add New');
  });

  it('renders a select-box for language selection', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    const selectBox = el.shadowRoot.querySelector('select-box');
    expect(selectBox).to.exist;
    expect(selectBox.options.length).to.equal(2);
    expect(selectBox.options[0].label).to.equal('EN');
    expect(selectBox.options[1].label).to.equal('TR');
  });
});
