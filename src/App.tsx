import styles from './App.module.css';

import Header from './components/header/Header';
import Drawer from './components/drawer/Drawer';
import BottomNavigation from './components/bottomNavigation/BottomNavigation';
import Home from './pages/home/Home';

const App: React.FC = () => {

  return (
    <div
      className={styles.appContainer}
    >
      <Header />
      <Home />
      <BottomNavigation />
      <Drawer />
    </div>
  );
}

export default App;