import './scss/App.scss';
import Users from './components/Users/Users';


const App:React.FC = () => {
  return (
    <div className='wrapper'>
      <div className='users'>
        <Users />
      </div>

    </div>
  );
};

export default App;
