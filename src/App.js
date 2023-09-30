import './scss/App.scss';
import Users from './components/Users/Users';
// import TypeScriptExample from './components/TypeScriptExample';

const App = () => {
  return (
    <div className='wrapper'>
      <div className='users'>
        <Users />
      </div>
      {/* <TypeScriptExample /> */}
    </div>
  );
};

export default App;
