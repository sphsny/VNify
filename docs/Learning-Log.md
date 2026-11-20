Sprint 2

## React

### [Folder Structure](https://dev.to/pramod_boda/recommended-folder-structure-for-react-2025-48mc)
    - assets: static media assets
    - components: reusable components e.g. Layout, UI
    - features: feature specific logic and components
    - hooks: custom hooks e.g. useAuth
    - layout: layout components
    - pages: page components (use components from /features, /components)
    - services: external services logic e.g. api, auth
    - store: state management
    - styles: globals, variables, themes, styled components
    - types: typescript types
    - utils: helper/utility/constant functions e.g. formatDate
    - App.tsx: app entry point
    - main.tsx: react router setup
    - index.css: custom CSS properties
    - config: app configuration, env variables

### [React Documentation](https://react.dev/learn)
- [Components](https://react.dev/learn/describing-the-ui)
    - must start with capital letter
- [Component States](https://react.dev/learn/reacting-to-input-with-state)
1. Identify component states
2. Figure out its triggers (user input/coding trigger)
3. Model the default state
4. Keep only essential state variables
5. Create event handlers to update state
- [UI Render Tree](https://react.dev/learn/understanding-your-ui-as-a-tree)
    - Components -> UI tree -> React DOM rendering
    - nesting components (render tree)
    - importing components/logic from separate files (dependency tree)
    - states are held inside React, with their components position in the render tree
- [Event handling](https://react.dev/learn/adding-interactivity)
    - onClick: response to user interactions
    - useState: component specific memory
    - setting state variable triggers re-render instead of changing the variable
    - create new or copy objects/arrays to update their state
- [Sharing state between components](https://react.dev/learn/sharing-state-between-components)
    - move state to the closest common parent and pass it down (lifting state up)
    - e.g. isActive to determine whether content is visible or not
- [useReducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
    - helper function outside of component for state update logic
    - for common eventhandlers e.g. edit, delete
    - to let other components read/change the component, pass down the state and event handlers as props, by creating a [context](https://react.dev/learn/scaling-up-with-reducer-and-context) for it
- [createContext, useContext](https://react.dev/learn/passing-data-deeply-with-context)
    - pass data deeply without passing props (prop drilling)
1. Create context
2. Use the context from the component that needs the data
3. Provide the context from the component that specifies the data
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
    - in-built hooks: useState, useContext, useEffect
    - custom hooks e.g. for fetching data or keeping track of a state
    - must start with 'use' followed by a capital letter
    - code inside the hook re-runs for every component re-render and they will receive the latest props and state
    - share stateful logic but not state itself

### Navigation/Routing
- [Routes, Outlet](https://reactrouter.com/start/declarative/routing)
- [BrowserRouter](https://www.geeksforgeeks.org/reactjs/browserrouter-in-react/)
- [Link, NavLink and useNavigate](https://www.geeksforgeeks.org/reactjs/link-and-navlink-components-in-react-router-dom/)

### UI

- [AppShell](https://v1.skeleton.dev/components/app-shell) -> app layout inspiration
- [shadcn/ui cheatsheet](https://shadcnstore.com/docs/cheatsheet)
- [shadcn/ui components](https://ui.shadcn.com/docs/components)
- [Tailwind YT course](https://youtu.be/6biMWgD6_JY)
- [Tailwind classes](https://tailwind.build/classes)
- [More Tailwind classes](https://www.tutorialspoint.com/tailwind_css/index.htm)
- [TailwindPlay](https://play.tailwindcss.com/) -> Official Tailwind Sandbox