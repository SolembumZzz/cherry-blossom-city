import styles from './App.module.css';

import Header from './components/header/Header';
import Drawer from './components/drawer/Drawer';
import BottomNavigation from './components/bottomNavigation/BottomNavigation';

const App = () => {

  return (
    <div
      className={styles.appContainer}
    >
      <Header />

      <BottomNavigation />
      <Drawer />
    </div>
  );
}

export default App;