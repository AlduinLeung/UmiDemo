import dva, { connect } from "dva";
import styles from "./index.less";
import { Router, Route } from "dva/router";
import React from 'react'
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model({
  namespace: "count",
  state: {
    record: 0,
    current: 0,
  },
  reducers: {
    add(state) {
      const newCurrent = state.current + 1;
      return {
        ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent,
      };
    },
    minus(state) {
      return { ...state, current: state.current - 1 };
    },
  },
});
// components

const CountApp = ({count,dispatch}) => {
  return (
    <div className={styles.normal}>
      <div className={styles.record}>Highest Record: {count.record}</div>
      <div className={styles.current}>{count.current}</div>
      <div className={styles.button}>
        <button
          onClick={() => {
            dispatch({ type: "count/add" });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { count: state.count };
}
const HomePage = connect(mapStateToProps)(CountApp);
// 4. Router
app.router(({history}) =>
  <Router history={history}>
    <Route path="/" component={HomePage} />
  </Router>
);

// 5. Start
app.start("#root");


// import dva, { connect } from 'dva';
// import { Router, Route } from 'dva/router';
// import React from 'react';
// import styles from './index.less';

// const app = dva();

// app.model({
//   namespace: 'count',
//   state: {
//     record: 0,
//     current: 0,
//   },
//   reducers: {
//     add(state) {
//       const newCurrent = state.current + 1;
//       return { ...state,
//         record: newCurrent > state.record ? newCurrent : state.record,
//         current: newCurrent,
//       };
//     },
//     minus(state) {
//       return { ...state, current: state.current - 1};
//     },
//   },
// });

// const CountApp = ({count, dispatch}) => {
//   return (
//     <div className={styles.normal}>
//       <div className={styles.record}>Highest Record: {count.record}</div>
//       <div className={styles.current}>{count.current}</div>
//       <div className={styles.button}>
//         <button onClick={() => { dispatch({type: 'count/add'}); }}>+</button>
//       </div>
//     </div>
//   );
// };

// function mapStateToProps(state) {
//   return { count: state.count };
// }
// const HomePage = connect(mapStateToProps)(CountApp);

// app.router(({history}) =>
//   <Router history={history}>
//     <Route path="/" component={HomePage} />
//   </Router>
// );

// app.start('#root');

