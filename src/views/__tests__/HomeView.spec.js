import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from '../HomeView.vue';

describe('HomeView', () => {
  it('renders SearchBar and Dashboard components', () => {
    const wrapper = mount(HomeView);

    // Check if SearchBar component is rendered
    const searchBar = wrapper.findComponent({ name: 'SearchBar' });
    expect(searchBar.exists()).toBe(true);

    // Check if Dashboard component is rendered
    const dashboard = wrapper.findComponent({ name: 'Dashboard' });
    expect(dashboard.exists()).toBe(true);
  });
});
