// redux/store.js

import { createStore } from 'redux';
import rootReducer from './reducers'; // Buat berkas reducers.js nanti

const store = createStore(rootReducer);

export default store;
