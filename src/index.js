import React from 'react';
import {createRoot} from 'react-dom/client';
import { JournalApp } from './JournalApp';
import './styles/style.scss';


const root = createRoot(document.getElementById('root'));
root.render(<JournalApp />)