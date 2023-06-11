import React from 'react';
import { createRoot } from 'react-dom';
import Cards from '../Cards';

it('renders without crashing', () => {
    const div = document.createElement('div');
    createRoot(div).render(<Cards />, div);
});
