import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ShowList from '../ShowList.vue';
import ShowCard from '../ShowCard.vue';
import { RouterLinkStub } from '@vue/test-utils';

describe('ShowList', () => {
    let wrapper = mount(ShowList, {
        global: {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        },
        props: {
            title: 'Test Title',
            list: [
                { id: 1, title: 'Show 1' },
                { id: 2, title: 'Show 2' },
            ],
        },
    });

    it('renders the title when list is provided', () => {
        expect(wrapper.text()).toContain('Test Title');
    });

    it('renders cards when list is provided', () => {
        const cardComponents = wrapper.findAllComponents(ShowCard);
        expect(cardComponents).to.have.lengthOf(2);
        expect(cardComponents[0].props('show')).toEqual({ id: 1, title: 'Show 1' });
        expect(cardComponents[1].props('show')).toEqual({ id: 2, title: 'Show 2' });
    });

    it('renders router links for each item in the list', () => {
        const routerLinks = wrapper.findAllComponents(RouterLinkStub);
        expect(routerLinks).to.have.lengthOf(2);
        expect(routerLinks[0].props('to')).toBe('/show/1');
        expect(routerLinks[1].props('to')).toBe('/show/2');
    });

    it('does not render the title when list is not provided', async () => {
        await wrapper.setProps({ list: null });
        expect(wrapper.text()).not.toContain('Test Title');
    });

    it('does not render cards when list is not provided', async () => {
        await wrapper.setProps({ list: null });
        const cardComponents = wrapper.findAllComponents(ShowCard);
        expect(cardComponents).to.have.lengthOf(0);
    });

    it('does not render router links when list is not provided', async () => {
        await wrapper.setProps({ list: null });
        const routerLinks = wrapper.findAllComponents(RouterLinkStub);
        expect(routerLinks).to.have.lengthOf(0);
    });
});
