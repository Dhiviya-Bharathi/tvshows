import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DashboardView from '../DashboardView.vue';
import ShowList from '../ShowList.vue';

describe('DashboardView', () => {
  it('renders loading message when loading is true', () => {
    const wrapper = mount(DashboardView, {
      global: {
        mocks: {
          $store: {
            getters: {
              loading: true,
            },
          },
        },
      },
    });

    const loadingMessage = wrapper.find('div:contains("Loading...")');
    expect(loadingMessage.exists()).toBe(true);
  });

  it('renders "No data available" message when genres are not available', () => {
    const wrapper = mount(DashboardView, {
      global: {
        mocks: {
          $store: {
            getters: {
              loading: false,
              genres: null,
              showsByGenre: () => { return [{id: 1}]}
            },
          },
        },
      },
    });

    const noDataMessage = wrapper.find('div:contains("No data available")');
    expect(noDataMessage.exists()).toBe(true);
  });

  it('renders ShowList components for each genre when genres are available', () => {
    const wrapper = mount(DashboardView, {
      global: {
        mocks: {
          $store: {
            getters: {
              loading: false,
              genres: ['Genre1', 'Genre2', 'Genre3'],
            },
          },
        },
      },
    });

    const showListComponents = wrapper.findAllComponents(ShowList);
    expect(showListComponents).toHaveLength(3);
    expect(showListComponents[0].props('title')).toBe('Genre1');
    expect(showListComponents[1].props('title')).toBe('Genre2');
    expect(showListComponents[2].props('title')).toBe('Genre3');
  });

  it('calls fetchAllShows method on mounted lifecycle hook', () => {
    const fetchAllShowsMock = vi.fn();
    mount(DashboardView, {
      global: {
        mocks: {
          $store: {
            dispatch: fetchAllShowsMock,
            getters: {
              loading: false,
              genres: ['Genre1', 'Genre2'],
            },
          },
        },
      },
    });

    expect(fetchAllShowsMock).toHaveBeenCalled();
  });
});
