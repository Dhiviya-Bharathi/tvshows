import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ShowView from '../ShowView.vue';
import { RouterLinkStub } from '@vue/test-utils';

describe('ShowView', () => {
  it('renders show details when showDetails is available', () => {
    const wrapper = mount(ShowView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        mocks: {
          $route: {
            params: {
              id: 1,
            },
          },
          $store: {
            getters: {
              showDetails: vi.fn(() => [
                {
                  id: 1,
                  name: 'Test Show',
                  image: { original: 'test-image-url' },
                  language: 'English',
                  rating: { average: 8.5 },
                  network: { name: 'Test Network', country: { name: 'Test Country' } },
                  status: 'Running',
                  genres: ['Drama', 'Comedy'],
                  summary: 'Lorem ipsum dolor sit amet.',
                },
              ]),
              filteredShowDetails: vi.fn(() => []),
            },
          },
        },
      },
    });

    // Check if show details are rendered
    const detailsContainer = wrapper.find('.details');
    expect(detailsContainer.exists()).toBe(true);

    // Check if show details are displayed correctly
    expect(detailsContainer.find('h1').text()).toContain('Test Show');
    expect(detailsContainer.find('img').attributes('src')).toBe('test-image-url');
    expect(detailsContainer.find('div:contains("Language:")').text()).toContain('English');
    expect(detailsContainer.find('div:contains("Rating:")').text()).toContain('8.5');
    expect(detailsContainer.find('div:contains("Channel:")').text()).toContain('Test Network');
    expect(detailsContainer.find('div:contains("Country:")').text()).toContain('Test Country');
    expect(detailsContainer.find('div:contains("Status:")').text()).toContain('Running');
    expect(detailsContainer.find('div:contains("Genre:")').text()).toContain('Drama, Comedy');
    expect(detailsContainer.find('div:contains("Lorem ipsum dolor sit amet.")').exists()).toBe(true);
  });

  it('renders "No details available" when showDetails is not available', () => {
    const wrapper = mount(ShowView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        mocks: {
          $route: {
            params: {
              id: 1,
            },
          },
          $store: {
            getters: {
              showDetails: vi.fn(() => []),
              filteredShowDetails: vi.fn(() => []),
            },
          },
        },
      },
    });

    // Check if "No details available" is rendered
    const noDetailsMessage = wrapper.find('div.message').toContain("No details available for this show.");
    expect(noDetailsMessage.exists()).toBe(true);
  });
});
