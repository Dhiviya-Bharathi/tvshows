import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ShowCard from '../ShowCard.vue';

describe('ShowCard', () => {
    let wrapper = mount(ShowCard, {
        props: {
            show: {
                name: 'Test Show',
                image: { medium: 'test-image-url' },
                summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
            },
        },
    });

    it('renders the show name', () => {
        expect(wrapper.text()).toContain('Test Show');
    });

    it('renders the show image', () => {
        const image = wrapper.find('img');
        expect(image.exists()).toBe(true);
        expect(image.attributes('src')).toBe('test-image-url');
    });

    it('limits the text in the show summary', () => {
        const limitedText = wrapper.find('.card-description');
        expect(limitedText.text()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis is ...');
    });
});
