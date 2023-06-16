import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import Menu from '../Menu/Menu';

test('Menu displays', async () => {
    const store = new StateStore();
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <Menu stateStore={store} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
