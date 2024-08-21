import { useState } from 'react';
import Card from './components/Card';

function App() {

  return (
    <>
        <Card img='images/shradha1.jpeg' text={`"Butterflies flutter every time you're near".`} state={{x: 20, y: 30}} degree={'-25'} />
        <Card img='images/shradha2.jpeg' text={`"Your smile makes my heart race."`} state={{x: 45, y: 55}} degree={'30'} />
        <Card img='images/shradha3.jpeg' text={`"Every glance makes me smile."`} state={{x: 40, y: 50}} degree={'20'} />
    </>
  )
}

export default App
