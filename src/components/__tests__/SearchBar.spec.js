import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '../SearchBar.vue';
import ShowList from '../ShowList.vue';

describe('SearchBar', () => {
    let wrapper = mount(SearchBar, {
        global: {
            mocks: {
                $store: {
                    dispatch: vi.fn(),
                    getters: {
                        filteredShows: [
                            { id: 1, name: 'Show 1' },
                            { id: 2, name: 'Show 2' },
                            { id: 3, name: 'Show 3' },
                            { id: 4, name: 'Show 4' },
                            { id: 5, name: 'Show 5' },
                        ],
                    },
                },
            },
        },
    });

    it('renders the search input', () => {
        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
    });

    it('renders the search button', () => {
        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
    });

    it('renders ShowList with title when search results are available', () => {
        const showList = wrapper.findComponent(ShowList);
        expect(showList.props('title')).toBe('Top 5 results');
    });

    it('calls onSearch method when enter key is pressed on the input', async () => {
        const input = wrapper.find('input');
        await input.setValue('test');
        await input.trigger('keypress.enter');
        expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('getShowsByQuery', { searchQuery: 'test' });
    });

    it('calls onSearch method when button is clicked', async () => {
        const button = wrapper.find('button');
        await button.trigger('click');
        expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('getShowsByQuery', { searchQuery: 'test' });
    });

    it('limits the number of shows in ShowList to 5', () => {
        const showList = wrapper.findComponent(ShowList);
        expect(showList.props('list')).toHaveLength(5);
    });
});
